from flask import Flask, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'some secret string here'

userpass = 'mysql://root:@'
basedir  = '127.0.0.1'
dbname   = '/flask'
socket   = '?unix_socket=/opt/lampp/var/mysql/mysql.sock'
dbname   = dbname + socket
app.config['SQLALCHEMY_DATABASE_URI'] = userpass + basedir + dbname

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Member(db.Model):
  __tablename__ = 'member'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True)
  email = db.Column(db.String(120), unique=True)
  
  def __init__(self, username, email):
    self.username = username
    self.email = email
  
  def __repr__(self):
    return '{}-{}'.format(self.username, self.email)
  