import pymongo

url = "mongodb+srv://nojawen:Ngogia%40%40201104@cluster0.maj2q.mongodb.net/"

client = pymongo.MongoClient(url)

db = client['AI']
