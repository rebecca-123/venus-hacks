# Import flask and datetime module for showing date and time
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
 
@app.route('/')
def foo():
    return "hello"
 
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in reactjs
    return "hello"
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)