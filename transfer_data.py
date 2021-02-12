import json, pymongo
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://root:root@tracker.9tcqk.mongodb.net/Tracker?retryWrites=true&w=majority",
    tls=True,
    tlsAllowInvalidCertificates=True,
)
db = client["Tracker"]
collection = db["datas"]
with open("data.json", "r") as data_json:
    data = json.load(data_json)
    for entry in data:
        new_entry = {
            "game": entry["game"],
            "play_time": entry["time_played"],
            "bay_id": entry["bayid"],
            "date": entry["date"],
            "time": entry["time"],
        }
        new_id = collection.insert_one(new_entry).inserted_id
    print("DONE")