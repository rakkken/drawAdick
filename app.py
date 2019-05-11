import os
from flask import Flask, abort
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

@app.route('/read/<id>', methods=['POST'])
def read(id):
    sqlLastIds = text("select id from images order by id desc limit 6")
    result = db.engine.execute(sqlLastIds)
    ids = [row[0] for row in result]
    _id = int(id)
    if _id > 5:
        _id = 5
    if len(ids) < _id:
        return abort(404)
    imgId = ids[_id]
    sql = text("select encode(img::bytea, 'escape') from images where id = " + str(imgId))
    result = db.engine.execute(sql)
    img = [row[0] for row in result]
    return img[0]