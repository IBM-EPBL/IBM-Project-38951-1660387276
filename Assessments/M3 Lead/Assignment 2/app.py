from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
  return render_template("home.html")

@app.route("/About")
def about():
  return render_template("About.html")

@app.route("/sign_in")
def signin():
  return render_template("sign_in.html")

@app.route("/sign_up")
def signup():
  return render_template("sign_up.html")
