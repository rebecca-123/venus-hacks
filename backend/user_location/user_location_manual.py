from ipstack import GeoLookup
import requests
import json
from user_location_auto import UserLocation

class UserLocationManual(UserLocation):
    """Manually get user info to find nearby healthcare providers."""

    def __init__(self, city = "", state = "", zip_code = ""):
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.search = {"limit": self.limit, "taxonomy_description" : "Obstetrics & Gynecology"}
        self._filter_empty_search()
    
    def _filter_empty_search(self):
        fields = [self.city, self.state, self.zip_code]
        if any(fields):
            for field in fields:
                match field:
                    case self.city:
                        self.search["city"] = self.city
                    case self.state:
                        self.search["state"] = self.city
                    case self.zip_code:
                        self.search["postal_code"] = self.zip_code
        