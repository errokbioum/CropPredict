"""
from tensorflow.keras.models import load_model
import pickle
import joblib

crop_recommendation_model_path = './models/RandomForest.pkl'
crop_recommendation_model = joblib.load(crop_recommendation_model_path)

def topCrops(crops, data):
    # Utilisation de la méthode predict pour obtenir les probabilités des cultures
    probs = crop_recommendation_model.predict(data)
    
    # Dictionnaire pour stocker les probabilités des cultures
    crop_probs = {}
    for i in range(len(crops)):
        # Convertir la probabilité en float pour éviter l'erreur de sérialisation
        crop_probs[crops[i]] = float(probs[0][i])  # Convertir en float
    
    # Trier les cultures par probabilité décroissante et garder les 5 meilleures
    top_crops = sorted(crop_probs.items(), key=lambda x: x[1], reverse=True)[:5]
    top_crops = dict(top_crops)  # Transformer en dictionnaire

    return top_crops
    
"""

import pickle
crop_recommendation_model_path = './models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))


def topCrops(crops, data):
    probs = crop_recommendation_model.predict_proba(data)
    crop_probs = {}
    for i in range(len(crops)):
        crop_probs[crops[i]] = probs[i][0][1]
    top_crops = sorted(crop_probs.items(),
                       key=lambda x: x[1], reverse=True)[:5]
    top_crops = dict(top_crops)
    return top_crops



