import os
import requests
import json
from flask import jsonify
from flask import Flask, request
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

@app.route('/api/submit-content', methods=['POST'])
def handle_submit_content(request):
    proof_image = request.form.get('proof_image')
    proof_text = request.form.get('proof_text')

    prompt = """
    Check if the image is public property or city property. Check if the image contains a problem or everything is fine. 
Also check if the given STATEMENT matches the problem in the image. Calculate the relevancy score between the image and the STATEMENT. 
"isMatching" is "true" when the "score" is greater than "80%" true only if the image and text are relevant to each other. 

Analyze the following situation and predict the severity of the problem based on the description provided. 
If the situation is a severe or urgent problem (e.g., broken infrastructure, safety hazards, major delays), 
it should be assigned a high severity score. If the problem is less urgent or involves minor issues 
(e.g., minor road problems or typical delays), it should be assigned a lower severity score.

If the severity score is **less than 5**, provide basic tips or suggestions to address the issue. For **medical situations**, offer first aid advice such as cleaning a wound with water and applying a bandage, while for general issues, suggest simple fixes like tightening a loose screw or using temporary tape. If the severity score falls **between 5 and 7**, categorize the issue as **medium priority** and recommend appropriate steps, such as contacting local maintenance, notifying authorities, or informing the city council. For scores **above 7**, classify the issue as **high priority** and advise immediate action, such as contacting emergency services, evacuating the area, or consulting relevant professionals.

Analyze the following image and statement to assess the nature and severity of the situation. Determine if the image shows an issue and whether the provided statement aligns with the problem depicted. Additionally, categorize the situation into one of the following categories based on the context:

**Categories:**
1. Public Property Issues (e.g., roads, streetlights, parks)
2. City Infrastructure (e.g., bridges, public transport, sewage)
3. Safety Hazards (e.g., electrical issues, unsafe areas)
4. Environmental Issues (e.g., pollution, deforestation)
5. Health and Hygiene (e.g., medical emergencies, sanitation)
6. Emergency Situations (e.g., natural disasters, fire hazards)
7. Noise and Air Pollution (e.g., loud noises, vehicle emissions)
8. Priority-Based (Low, Medium, High Priority)

### Output Format:
```json
{
    "isMatching": <bool>,
    "score": <int>, 
    "severity_score": <int>, 
    "reason_severity_score": <str>, 
    "category": <str>, 
    "suggestions": <str>
}
    """

    # API Configuration
    api_url = "https://api.hyperbolic.xyz/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('hyperbolic_key')}",
    }

    # Prepare API payload
    req_text = f"{prompt}\n\nSTATEMENT: {proof_text}"
    payload = {
        "messages": [
            {"role": "user", "content": req_text},
            {"role": "user", "content": f"Image: {proof_image}"}
        ],
        "model": "mistralai/Pixtral-12B-2409",
        "max_tokens": 2048,
        "temperature": 0.7,
        "top_p": 0.9,
    }

    try:
        response = requests.post(api_url, headers=headers, json=payload)

        if response.status_code != 200:
            return jsonify({"error": f"API request failed with status {response.status_code}", "details": response.text}), 500

        # Parse the response JSON
        response_data = response.json()
        if "choices" not in response_data:
            return jsonify({"error": "Unexpected API response format", "response": response_data}), 500

        output = response_data["choices"][0]["message"]["content"]
        
        # Parse the JSON string output
        try:
            cleaned_output = output.strip('```json\n').strip('```')
            start_idx = cleaned_output.find('{')
            end_idx = cleaned_output.rfind('}')
            if start_idx != -1 and end_idx != -1:
                json_content = cleaned_output[start_idx:end_idx + 1]
                parsed_dict = json.loads(json_content)
                return jsonify(parsed_dict)
            else:
                return jsonify({"error": "Failed to extract JSON content from response", "details": cleaned_output}), 500

        except json.JSONDecodeError as e:
            return jsonify({"error": "Failed to parse JSON response", "details": str(e), "output": output}), 500

    except requests.RequestException as e:
        return jsonify({"error": "API request failed", "details": str(e)}), 500