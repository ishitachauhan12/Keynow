from .slackSdk import slackSDK
from typing import Dict

sdk = slackSDK()

class Driver():
    def getVendorData(self) -> Dict:
        """
        returns a dictionary with emails as keys, which contain True as value if the user is inactive on slack otherwise False
        """
        return sdk.getUsers()

    def suspendUser(self, email) -> bool:
        """
        sets the status of a user as deactivated and sets their availablity to away
        """
        return sdk.suspendUser(email)
