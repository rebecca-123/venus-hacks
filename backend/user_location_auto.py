from ipstack import GeoLookup
import requests
import json

class UserLocation:
    """Automatically get user info to find nearby healthcare providers."""

    def __init__(self):
        self.state, self.zip_code = self._get_state_zip()
        self.limit = 0
        self.search = {"limit": self.limit, "taxonomy_description" : "Obstetrics & Gynecology", 
                       "state" : self.state, "postal_code" : self.zip_code}

    def _get_location(self):
        geo_lookup = GeoLookup("2ec7c17df431b8dfaeafef07ecd93cf9") 

        return geo_lookup.get_own_location()

    def _get_state_zip(self):
        location = self._get_location()
        zip_code = location["zip"]
        state = location["region_code"]
        return state, zip_code

    def find_providers(self, limit):
        url = "https://npiregistry.cms.hhs.gov/api/?version=2.1"
        self.search["limit"] = limit
        providers = requests.get(url, params=self.search)
        if providers.status_code == 200:
            providers = json.loads(providers.text)
            results = providers.get("results")
            if not results:
                yield "No doctors found nearby.\n"
            else:
                yield from self._parse_locations(results)
        else:
            yield "Failed to retrieve data: {providers.status_code}\n"

    def _parse_locations(self, providers_dict):
        if providers_dict[0]["addresses"][0]["state"] != self.state:
            yield "No doctors found nearby.\n"
        else:
            i = 0
            for i in range(len(providers_dict)):
                addresses = providers_dict[i]["addresses"]
                name_info = providers_dict[i]["basic"]
                for j in range(len(addresses)):
                    if (addresses[j]["address_purpose"] == "LOCATION")\
                        and (addresses[j]["state"]) == self.state:
                        street = addresses[j]["address_1"]
                        city = addresses[j]["city"]
                        state = addresses[j]["state"]
                        postal = addresses[j]["postal_code"]
                        yield f"{name_info.get('first_name') or ""} {name_info.get('last_name') or ""}, {name_info.get('credential') or ""}\n{street}\n{city}, {state} {postal[0:5]}-{postal[5:]}\n\n"
