from typing import List, Dict
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import re
import base64
import os

from .scopes import SCOPES
from .utils import userBody, transferBody

import mimetypes
from email.message import EmailMessage

from googleapiclient.errors import HttpError

parent_directory = os.getcwd()


class Driver():
    def getCreds(self, credFile: str = 'credentials', tokenName: str = 'token'):
        creds = None
        try:
            if os.path.exists(f'{os.getcwd()}/{tokenName}.json'):
                print('token found')
                creds = Credentials.from_authorized_user_file(
                    f'{tokenName}.json', SCOPES)
                print('token found, building creds')
                print('creds created')
                # If there are no (valid) credentials available, let the user log in.
            if not creds or not creds.valid:
                print('creds are invalid')
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                    print('refreshed token')
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        f'{os.getcwd()}/credentials.json', SCOPES)
                    creds = flow.run_local_server(port=0)
                # Save the credentials for the next run
                    with open(f'{os.getcwd()}/token.json', 'w') as token:
                        token.write(creds.to_json())
        except Exception as e:
            print(e)

        return creds

    def buildService(self, service: str, version: str, credentials):
        """
        returns an API service from google's API directory
        If the api name mentioned exists in the directory
        """
        try:
            return build(service, version, credentials=credentials)
        except Exception as e:
            print('could not build service')
            print(e)
            return None

    def getUsers(self, maxResults: int = 200, orderBy: str = 'email', suspended: bool = False) -> List[Dict]:
        """
        returns a list of users in the form of dictionaries (suspended users if the suspended variable is set as True)
        """
        users = []
        adminService = self.buildService(
            'admin', 'directory_v1', self.getCreds(tokenName='token'))
        if suspended:
            results = adminService.users().list(customer='my_customer', maxResults=maxResults,
                                                orderBy=orderBy, query='isSuspended=True').execute()
            users = results.get('users', [])
        else:
            request = adminService.users().list(customer='my_customer',
                                                maxResults=maxResults, orderBy=orderBy)
            response = request.execute()
            users = response.get('users', [])
            while request:
                request = adminService.users().list_next(
                    previous_request=request, previous_response=response)
                if request:
                    response = request.execute()
                    users.extend(response.get('users', []))
        return users

    def suspendUser(self, email: str) -> bool:
        """
        suspends the user with the given email
        """
        try:
            adminService = self.buildService(
                'admin', 'directory_v1', self.getCreds(tokenName='token'))
            user = adminService.users().get(userKey=email).execute()
            user['suspended'] = True
            self.transferFiles(
                source=email, destination='ishita.chauhan@keynow.live')
            adminService.users().update(userKey=email, body=user).execute()
            return True
        except Exception as e:
            raise Exception(e)

    def transferFiles(self, source: str, destination: str) -> Dict:
        try:
            adminService = self.buildService(
                'admin', 'directory_v1', self.getCreds())
            sourceId = adminService.users().get(userKey=source).execute()['id']
            destinationId = adminService.users().get(
                userKey=destination).execute()['id']
            service = self.buildService(
                'admin', 'datatransfer_v1', self.getCreds())
            body = transferBody
            body["oldOwnerUserId"] = sourceId
            body["newOwnerUserId"] = destinationId
            transferRequest = service.transfers().insert(body=body).execute()
            return transferRequest
        except Exception as e:
            raise Exception(f'Files could not be transfered {e}')

    def getVendorData(self) -> Dict:
        try:
            users = self.getUsers()
            googleDict = {}
            print(f'got {len(users)} google users')
            for user in users:
                googleDict[user['primaryEmail'].lower()] = user['suspended']
            return googleDict
        except Exception as e:
            print(e)
            return []

    def sendEmail(self, to: List[str], fromEmail: str, vendor: str, message: str):
        try:
            emailService = self.buildService(
                service='gmail', version='v1', credentials=self.getCreds(tokenName='token'))
            mime_message = EmailMessage()
            mime_message['To'] = ", ".join(to)
            mime_message['From'] = fromEmail

            mime_message['Subject'] = f'Your account was not found to be linked with company master data'

            mime_message.set_content(message)

            """attachment = f'{vendor}.csv'
            type_subtype, _ = mimetypes.guess_type(attachment)
            maintype, subtype = type_subtype.split('/')

            with open(attachment, 'rb') as fp:
                attachment_data = fp.read()
            mime_message.add_attachment(attachment_data, maintype, subtype)"""
            encoded_message = base64.urlsafe_b64encode(
                mime_message.as_bytes()).decode()

            email_body = {
                'message': {
                    'raw': encoded_message
                }
            }

            draft = emailService.users().drafts().create(
                userId="me", body=email_body).execute()

            send_message = emailService.users().drafts().send(
                userId='me', body={'id': draft["id"]}
            ).execute()
            print(F'Message Id: {send_message["id"]}')
        except HttpError as error:
            print(f'error: {error}')
            send_message = None

        return send_message
