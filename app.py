from flask import Flask
from flask import request
app = Flask(__name__)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/save', methods=['POST'])
def save():
    data = request.data
    return 'done'