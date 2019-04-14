from app import db
from sqlalchemy.dialects.postgresql import BYTEA


class Images(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(BYTEA)
    sended = db.Column(db.Boolean())

    def __init__(self, img, sended):
        self.img = img
        self.sended = sended

    def __repr__(self):
        return '<id {}>'.format(self.id)