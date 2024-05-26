# Import flask and datetime module for showing date and time
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from maternal_risk import mr_api
from mr_model import initMaternalRisk
from flask.cli import AppGroup
from user_location_auto import UserLocation
from user_location_manual import UserLocationManual

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
 
@app.route('/providers', methods=['GET'])
def get_providers_auto():
    limit = request.args.get('limit', default=10, type=int)
    user_location = UserLocation()
    generator = user_location.find_providers(limit)
    return Response(generator, content_type='text/plain')

@app.route('/manual_providers', methods=['GET'])
def stream_manual_providers():
    city = request.args.get('city', default="")
    state = request.args.get('state', default="")
    zip_code = request.args.get('zip_code', default="")
    limit = request.args.get('limit', default=10, type=int)
    
    user_location_manual = UserLocationManual(city, state, zip_code)
    generator = user_location_manual.find_providers(limit)
    # return Response(generator, content_type='text/plain')
    return jsonify(list(generator))
     
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5002)