import os
import base64
import json
import requests
from flask import jsonify, request
from dotenv import load_dotenv

load_dotenv()

def verify_content_handler():
    try:
        # Extract data from JSON payload
        data = request.get_json()

        submitted_text = data.get("submitted_text")
        verification_text = data.get("verification_text")
        submitted_image_base64 = data.get("submitted_image_base64")
        verification_image_base64 = data.get("verification_image_base64")

        # Validate inputs
        if not all([submitted_text, verification_text, submitted_image_base64, verification_image_base64]):
            return jsonify({"error": "All inputs (text and images) are required"}), 400

        # Construct prompt and payload
        prompt = """
        Compare the following content and determine the relevance of the images and their matching descriptions. 
        Assess the similarities between the submitted image and the verification image, and also compare the corresponding texts.
        If the images and texts match, calculate the relevance score. 
        Consider the relevance between the images and the texts, as well as the overall severity and priority of the situation described.
        """

        reqText = f"{prompt}\nSUBMITTED TEXT: {submitted_text}\nVERIFICATION TEXT: {verification_text}"

        prompt_end = """
        Return the analysis in the following format: 
        {"isMatching": <bool>, "score": <int>, "priority_score": <int>, "reason_severity_score": <str>}
        """

        reqText += f"\n{prompt_end}"

        api = "https://api.hyperbolic.xyz/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('HYPERBOLIC_KEY')}",
        }

        payload = {
            "messages": [
                {
                    "role": "user",
                    "content": reqText,
                    "images": [
                        {"type": "base64", "content": submitted_image_base64},
                        {"type": "base64", "content": verification_image_base64},
                    ]
                }
            ],
            "model": "mistralai/Pixtral-12B-2409",
            "max_tokens": 2048,
            "temperature": 0.7,
            "top_p": 0.9,
        }

        # Make API request
        response = requests.post(api, headers=headers, json=payload)

        if response.status_code != 200:
            return jsonify({"error": "Failed to get a valid response from the API"}), 500

        output = response.json().get("choices", [{}])[0].get("message", {}).get("content", "{}")
        
        # Parse JSON response safely
        try:
            parsed_dict = json.loads(output.strip('```json\n').strip('```'))
        except json.JSONDecodeError:
            return jsonify({"error": "Failed to parse API response"}), 500

        return jsonify(parsed_dict)

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
