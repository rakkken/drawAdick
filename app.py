import os
from flask import Flask
from flask import request
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_wtf.csrf import CSRFProtect
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisisAroxySecretKEY#'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
csrf = CSRFProtect(app)
csrf.init_app(app)

from models import Images

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
    data = request.data
    img = Images(data, False)
    db.session.add(img)
    db.session.commit()
    return 'success'

@app.route('/readLast/<id>', methods=['POST'])
def readLast(id):
    sql = text("select encode(img::bytea, 'escape') from images order by id desc limit 6")
    result = db.engine.execute(sql)
    img = [row[0] for row in result]
    _id = int(id)
    if _id > 5:
        _id = 5
    return img[_id]