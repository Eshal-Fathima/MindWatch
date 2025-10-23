from flask import Flask, jsonify, request
import google.generativeai as genai
import base64

app = Flask(__name__)

# Replace with your API key
genai.configure(api_key="AIzaSyAyBRUy8mUTZBzNkeRfXNxe6O1ycsY__Ew")

@app.route('/calm-music', methods=['GET'])
def calm_music():
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Request calm, ambient sound
    prompt = "Generate a short calming ambient sound such as rain or soft piano as base64 audio data."
    response = model.generate_content(prompt)

    # Some Gemini models return base64 audio in text form
    return jsonify({"audio": response.text})

if __name__ == '__main__':
    app.run(port=5000)
