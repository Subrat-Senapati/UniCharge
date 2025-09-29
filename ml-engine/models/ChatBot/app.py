from flask import Flask, request, jsonify
from flask_cors import CORS # To handle Cross-Origin Resource Sharing
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, important for local development

# Initialize the GenAI client with your API key
# IMPORTANT: Replace "YOUR_API_KEY" with your actual API key
genai_api_key = "AIzaSyCMgG5vTclxs7OiPeY0K-YBxXEqov6wR8k" # Make sure this is your correct key
client = genai.Client(api_key=genai_api_key)

@app.route('/')
def home():
    return "UniCharge Chatbot Backend is running!"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction="Your name is UniCharge, and you are an EV guider. You can guide users on any sort of FAQ related to the Electric Vehicle sector, guide politely. If anything unrelated to the EV sector is asked, just behave politely to the user and ask them to ask relatable things to your domain."),
            contents=user_message
        )
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Run on port 5000, debug=True for development