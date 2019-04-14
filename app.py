import os
from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
db = SQLAlchemy(app)

from models import Images

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/save', methods=['POST'])
def save():
    data = request.data
    img = Images(data, False)
    db.session.add(img)
    db.session.commit()
    return 'done'