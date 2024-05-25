from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource

from mr_model import MaternalRiskModel

mr_api = Blueprint('mr_api', __name__,
                   url_prefix='/api/maternal')

api = Api(mr_api)
class MaternalRiskAPI:

    class _Predict(Resource):
        
        def post(self):
            # Get the patient data from the request
            patient = request.get_json()

            maternalRiskModel = MaternalRiskModel.get_instance()
            # Predict the risk probability of the patient
            response = maternalRiskModel.predict(patient)

            # Return the response as JSON
            return jsonify(response)

    api.add_resource(_Predict, '/predict')