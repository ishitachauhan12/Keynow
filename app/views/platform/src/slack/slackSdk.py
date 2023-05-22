from slack_bolt import App
from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient
from typing import Dict
import os
import json

SLACK_BOT_TOKEN = os.environ.get('SLACK_BOT_TOKEN')
SLACK_SIGNING_SECRET = os.environ.get('SLACK_SIGNING_SECRET')
SLACK_USER_TOKEN=os.environ.get('SLACK_USER_TOKEN')
SLACK_APP_TOKEN = os.environ.get('SLACK_APP_TOKEN')

class slackSDK():
    def __init__(self) -> None:
        self.app = App(
            token=SLACK_BOT_TOKEN,
            signing_secret=SLACK_SIGNING_SECRET
        )
        self.client = WebClient(token=SLACK_USER_TOKEN)

    def getUsers(self) -> Dict:
        try:
            cursor = self.app.client.users_list(limit=1000)
            res = {}
            userList = []
            for cur in cursor:
                userList += cur["members"]
            #size = 0
            for user in userList:
                if (user['name'] != 'slackbot' and not user['is_bot']):
                    email = user['profile']['email'].lower()
                    deleted = user['deleted']
                    res[email] = deleted
                    #size += 1
            #print(f'size is {size}')
            #print(len(userList))
            return res
        except SlackApiError as e:
            print(str(e))
            return {}

    def suspendUser(self, email):
        try:
            response = self.client.users_lookupByEmail(email=email)
            user_id = response["user"]["id"]
            self.client.users_setPresence(user=user_id, presence="away")
            status_message = "deactivated"
            status_emoji = ":x:"
            self.client.users_profile_set(
                user=user_id,
                profile={
                    "status_text": status_message,
                    "status_emoji": status_emoji
                }
            )
            return True
        except SlackApiError as e:
            print(str(e))
            return False
