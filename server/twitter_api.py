from flask import Blueprint, request, jsonify
from twitter_service import twitter_service
import logging

logger = logging.getLogger(__name__)
twitter_bp = Blueprint('twitter', __name__)

@twitter_bp.route('/tweet', methods=['POST'])
def create_tweet():
    """
    Endpoint to create a new tweet.
    Expects JSON input with 'text' field.
    """
    if not request.is_json:
        logger.warning("Request Content-Type is not application/json")
        return jsonify({"error": "Content-Type must be application/json"}), 400
        
    text = request.json.get('text')
    if not text:
        logger.warning("Tweet text is missing in request")
        return jsonify({"error": "Text is required"}), 400

    # Use the service to create the tweet
    result = twitter_service.create_tweet(text)
    
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify({"error": result["error"]}), 500
