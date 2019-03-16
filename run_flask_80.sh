service lighttpd stop
sudo env FLASK_APP=app.py FLASK_RUN_PORT=80 PYTHONIOENCODING=UTF-8 PYTHONUNBUFFERED=1 flask run --host=0.0.0.0