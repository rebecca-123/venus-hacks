import pandas as pd
import numpy as np
import seaborn as sns
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

def remove_outliers(column):
    # Assuming df is your DataFrame and 'column' is the column containing the values you want to check for outliers
    # Calculate the first quartile (Q1) and third quartile (Q3)
    Q1 = column.quantile(0.25)
    Q3 = column.quantile(0.75)

    # Calculate the interquartile range (IQR)
    IQR = Q3 - Q1

    # Define the lower and upper bounds for outlier detection
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Filter the DataFrame to remove rows with values outside the bounds
    column = column.where(column >= lower_bound,lower_bound)
    column = column.where(column <= upper_bound,upper_bound)
    return column

class MaternalRiskModel:
    """
    Maternal risk prediction
    """
    # a singleton instance of MaternalRiskModel
    # train the model once, use for prediction multiple times
    _instance = None
    
    def __init__(self):
        # the maternl risk ML model
        self.model = None
        self.dt = None
        # define ML features and target
        self.features = ['Age', 'SystolicBP', 'BS', 'BodyTemp', 'HeartRate']
        self.target = 'RiskLevel'
        # load dataset
        self.maternal_risk_data = pd.read_csv("maternal_risk.csv")

    # clean the dataset
    def _clean(self):
        # Convert boolean columns to integers
        self.maternal_risk_data['RiskLevel'] = self.maternal_risk_data['RiskLevel'].apply(lambda x: 1 if x == 'high risk' else 0)
        self.maternal_risk_data = self.maternal_risk_data.apply(remove_outliers, axis=0)

    # train the logistic regression maternal risk model
    def _train(self):
        # split the data into features and target
        X = self.maternal_risk_data[self.features]
        y = self.maternal_risk_data[self.target]
        
        # perform train-test split
        self.model = LogisticRegression(max_iter=1000)
        
        # train the model
        self.model.fit(X, y)
        
        # train a decision tree classifier
        self.dt = DecisionTreeClassifier()
        self.dt.fit(X, y)
        
    @classmethod
    def get_instance(cls):
        """ 
        Build model if it doesn't exist already
        Return model
        """        
        # check for instance, if it doesn't exist, create it
        if cls._instance is None:
            cls._instance = cls()
            cls._instance._clean()
            cls._instance._train()
        # return the instance, to be used for prediction
        return cls._instance

    def predict(self, patient):
        """
        Predict the probability of patient being labeled as high risk

        Args:
            patient (dict): A dictionary representing a patient with the following keys:
                'Age'
                'SystolicBP'
                'BS'
                'BodyTemp'
                'HeartRate'

        Returns:
           dictionary : contains probabilities of low and high risk classification
        """
        # clean the patient data
        patient_df = pd.DataFrame(patient, index=[0])
        
        # predict the risk probability and extract the probabilities from numpy array
        low_risk, high_risk = np.squeeze(self.model.predict_proba(patient_df))
        # return the risk probabilities as a dictionary
        return {'high risk': high_risk, 'low risk': low_risk}
    
    def feature_weights(self):
        """
        Get the feature weights
        The weights represent the relative importance of each feature in the prediction model

        Returns:
            dictionary: contains each feature as a key and its weight of importance as a value
        """
        # extract the feature importances from the decision tree model
        importances = self.dt.feature_importances_
        # return the feature importances as a dictionary, using dictionary comprehension
        return {feature: importance for feature, importance in zip(self.features, importances)} 
    
def initMaternalRisk():
    """
    Initialize the Titanic Model.
    This function is used to load the Titanic Model into memory, and prepare it for prediction.
    """
    MaternalRiskModel.get_instance()
    
def testMaternalRisk():
    """
    Test the Maternal Risk Model
    Print test output with patient data and risk
    """
     
    # setup patient data for prediction
    print("Create sample patient")
    patient = {
    'Age': [28],
    'SystolicBP': [120],
    'BS': [6],
    'BodyTemp': [98],
    'HeartRate': [75]
    }
    print("\t", patient)
    print()

    # get instance of ML Model
    maternalRiskModel = MaternalRiskModel.get_instance()
    print(" Step 2:", maternalRiskModel.get_instance.__doc__)
   
    # print the risk probability
    print(" Step 3:", MaternalRiskModel.predict.__doc__)
    probability = maternalRiskModel.predict(patient)
    print('\t low risk probability: {:.2%}'.format(probability.get('low risk')))  
    print('\t high risk probability: {:.2%}'.format(probability.get('high risk')))
    print()
    
    # print the feature weights in the prediction model
    print(" Step 4:", maternalRiskModel.feature_weights.__doc__)
    importances = maternalRiskModel.feature_weights()
    for feature, importance in importances.items():
        print("\t\t", feature, f"{importance:.2%}") # importance of each feature, each key/value pair
        
if __name__ == "__main__":
    print(" Begin:", testMaternalRisk.__doc__)
    testMaternalRisk()