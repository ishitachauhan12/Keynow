userBody = {
    "name": {
        "familyName": "",
        "givenName": ""
    },
    "password": "",
    "primaryEmail": ""
}

"""
55656082996 and 810260081642 are google application IDs for gmail and gDrive respectively

In case any function starts giving a 'service not found error' (which would be rare)
it needs to be checked wheather the application IDs are still the same
"""

transferBody = {
    "oldOwnerUserId": "",
    "newOwnerUserId": "",
    "applicationDataTransfers": [
        {
            "applicationId": 55656082996,
            "applicationTransferParams": [
                {
                    "key": "PRIVACY_LEVEL",
                    "value": [
                        "SHARED",
                        "PRIVATE"
                    ]
                }
            ]
        },
        {
            "applicationId": 810260081642,
            "applicationTransferParams": [
                {
                    "key": "PRIVACY_LEVEL",
                    "value": [
                        "SHARED",
                        "PRIVATE"
                    ]
                }
            ]
        }
    ]
}

subjectToFileDict = {
    'Report Link for PR Master New1 scheduled Daily': 'master.csv',
    'Report Link for Master new1 scheduled Daily': 'master1.csv'
}
