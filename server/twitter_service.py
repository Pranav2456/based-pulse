import os
import tweepy
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class TwitterService:
    def __init__(self):
        self.client = None
        self.initialize_client()

    def initialize_client(self) -> None:
        """Initialize the Twitter API client with credentials."""
        try:
            self.client = tweepy.Client(
                consumer_key=os.getenv('TWITTER_API_KEY'),
                consumer_secret=os.getenv('TWITTER_API_SECRET'),
                access_token=os.getenv('TWITTER_ACCESS_TOKEN'),
                access_token_secret=os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
            )
            logger.info("Twitter client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Twitter client: {str(e)}")
            raise

    def create_tweet(self, text: str) -> Dict:
        """
        Create a new tweet.
        
        Args:
            text (str): The text content of the tweet
            
        Returns:
            dict: Response containing success status and message/error
        """
        if not self.client:
            logger.error("Twitter client not initialized")
            return {"success": False, "error": "Twitter client not initialized"}

        try:
            response = self.client.create_tweet(text=text)
            
            if response.data:
                tweet_id = response.data['id']
                logger.info(f"Tweet posted successfully with ID: {tweet_id}")
                return {
                    "success": True,
                    "message": f"Tweet posted successfully with ID: {tweet_id}"
                }
            else:
                logger.error("No response data from Twitter API")
                return {"success": False, "error": "No response from Twitter API"}
                
        except Exception as e:
            error_msg = f"Error posting tweet: {str(e)}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}

# Create a singleton instance
twitter_service = TwitterService()
