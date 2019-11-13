import os
from flask import Flask, abort, session
from flask import request
from flask import render_template
from flask import Response
from flask import send_from_directory
from flask import send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_wtf.csrf import CSRFProtect
from io import BytesIO
import zipfile
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

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/save', methods=['POST'])
def save():
    data = request.data
    length = len(data)
    if length < 100 or length > 1000000 or str(data)[0::-length] != 'b' or request.content_type != 'application/upload':
        abort(400)
    img = Images(data, False)
    db.session.add(img)
    db.session.commit()
    return Response(mCount(), mimetype='text/plain')

@app.route('/read/<id>', methods=['GET'])
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
    return Response(img[0], mimetype='text/plain')

@app.route('/count', methods=['GET'])
def count():
    return Response(mCount(), mimetype='text/plain')

def mCount():
    sqlCount = text("select count(*) from images")
    result = db.engine.execute(sqlCount)
    count = [row[0] for row in result]
    return str(count[0])

@app.route('/all/<password>', methods=['GET'])
def all(password):
    if password != 'kutas':
        return Response('Get lost!', mimetype='text/plain')
    sql = text("select encode(img::bytea, 'escape') from images")
    result = db.engine.execute(sql)
    memory_file = BytesIO()
    with zipfile.ZipFile(memory_file, 'w') as zf:
        for counter,row in enumerate(result):
            name = "dick_"+str(counter)+".jpg"
            data = zipfile.ZipInfo(name)
            data.compress_type = zipfile.ZIP_DEFLATED
            zf.writestr(data, base64.b64decode(row[0].split(',')[1]))
    memory_file.seek(0)
    return send_file(memory_file, mimetype='application/zip',
        as_attachment=True,
        attachment_filename='dicks.zip')
