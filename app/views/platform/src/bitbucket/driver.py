from atlassian import Bitbucket
import os

class Driver():
    def __init__(self):
        self.base_url='https://bitbucket.org/keynow'
        self.username = "keynow-admin"
        self.app_password = os.environ.get('BITBUCKET_APP_PASSWORD')

        self.bitbucket = Bitbucket(
            url=self.base_url,
            username=self.username,
            password=self.app_password
        )

    def getVendorData(self):
        response = self.bitbucket.get_users()
        print(response.status_code)
        print(response)
