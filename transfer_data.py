import json, pymongo
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://root:root@tracker.9tcqk.mongodb.net/Tracker?retryWrites=true&w=majority",
    tls=True,
    tlsAllowInvalidCertificates=True,
)
db = client["Tracker"]
collection = db["datas"]
bays = db["bays"]
bay_ids = {}
data_array = []
for doc in bays.find():
    bay_ids[doc["bay_name"]] = doc["_id"]
for data in collection:
    if data["bay_id"]
# for doc in collection.find():
#     print(doc)

# with open("data.json", "r") as data_json:
#     data = json.load(data_json)
#     for entry in data:
#         new_entry = {
#             "game": entry["game"],
#             "play_time": entry["time_played"],
#             "bay_id": entry["bayid"],
#             "date": entry["date"],
#             "time": entry["time"],
#             "bayid": "",
#         }
#         new_id = collection.insert_one(new_entry).inserted_id
#     print("DONE")