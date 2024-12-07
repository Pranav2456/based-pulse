from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from submit_content import handle_submit_content
# from analyze import handle_analyze
from verify_content import verify_content_handler
from twitter_api import twitter_bp

app = Flask(__name__)
CORS(app)

# Register the Twitter blueprint
app.register_blueprint(twitter_bp, url_prefix='/api')
# New Report 
@app.route('/api/submit-content', methods=['POST'])
def submit_content():
    '''
    Params: proof_image = i, proof_text = t
     prompt:  i == public property
              i == problem == statement_equal(t)
              isMatching = true if score > 80
              response: isMatching: <bool>, matching: <str>, score: <int>/100
    '''
    # Log the request headers and body for debugging
#     if app.debug:
#         print("Headers:", request.headers)
#         print("Data:", request.data)
#         print("JSON:", request.get_json(silent=True))

    # Pass the request to the handler
    return handle_submit_content(request)

@app.route('/api/verify-content', methods=['POST'])
def verify_content():
    """
    Handles the verification of submitted content.
    Expects necessary verification parameters in the request.
    """
    return verify_content_handler(request)

if __name__ == "__main__":
    app.run("0.0.0.0", port=8080, debug=True)