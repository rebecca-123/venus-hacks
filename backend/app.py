# Import flask and datetime module for showing date and time
from flask import Flask
from flask_cors import CORS
from maternal_risk import mr_api
from mr_model import initMaternalRisk
from flask.cli import AppGroup

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 

app.register_blueprint(mr_api)

@app.route('/')
def foo():
    return "hello"
 
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in reactjs
    return "bruh"

# Create an AppGroup for custom commands
custom_cli = AppGroup('custom', help='Custom commands')

@custom_cli.command('generate_data')
def generate_data():
    initMaternalRisk()

# Register the custom command group with the Flask application
app.cli.add_command(custom_cli)
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)