from flask import Flask, request, jsonify
import joblib

# Load your model and vectorizer
model = joblib.load('text_classifier.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return "ML Service is running!"



@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Transform and predict
    text_vec = vectorizer.transform([text])
    prediction = model.predict(text_vec)[0]

    emotion_map = {
        0: "sadness",
        1: "joy",
        2: "love",
        3: "anger",
        4: "fear",
        5: "surprise"
    }

    return jsonify({'prediction': emotion_map.get(int(prediction), "unknown")})

    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
