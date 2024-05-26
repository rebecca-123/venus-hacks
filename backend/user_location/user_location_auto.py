from ipstack import GeoLookup
import requests
import json

class UserLocation:
    """User info to find nearby healthcare providers."""

    def __init__(self):
        self.zip_code, self.state = self._get_postal_and_state()
        self.limit = 0
        self.search = {"limit": self.limit, "taxonomy_description" : "Obstetrics & Gynecology", 
                       "postal_code" : self.zip_code, "state" : self.state}

    def _get_location(self):
        geo_lookup = GeoLookup("921a4e0e6b2883cdb65b92a7298ecbfe") 

        return geo_lookup.get_own_location()

    def _get_postal_and_state(self):
        location = self._get_location()
        zip_code = location["zip"]
        state = location["region_code"]
        return zip_code, state

    def find_providers(self, limit):
        url = "https://npiregistry.cms.hhs.gov/api/?version=2.1"
        self.search[self.limit] = limit
        providers = requests.get(url, params=self.search)
        if providers.status_code == 200:
            providers = json.loads(providers.text)
            results = providers["results"]
            if len(results) < 1:
                print("No doctors found nearby.")
            else:
                self._parse_locations(results)
        else:
            print("Failed to retrieve data: ", providers.status_code)

    def _parse_locations(self, providers_dict):
        if providers_dict[0]["addresses"][0]["state"] != self.state:
            print("No doctors found nearby.")
        else:
            i = 0
            for i in range(len(providers_dict)):
                addresses = providers_dict[i]["addresses"]
                for j in range(len(addresses)):
                    if (addresses[j]["address_purpose"] == "LOCATION")\
                        and (addresses[j]["state"]) == self.state:
                        street = addresses[j]["address_1"]
                        city = addresses[j]["city"]
                        state = addresses[j]["state"]
                        postal = addresses[j]["postal_code"]
                        return (street, city, state, postal)


