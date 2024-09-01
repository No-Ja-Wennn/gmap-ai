from .calculate_distance import calculate_distance

def save_way(location_neigbor, id, L1 , flag = True):
    print("location_neigbor: ", location_neigbor)
    print("id: ", id)
    print("L1: ", L1) 
    print("flag: ", flag) 
    # if len(location_neigbor) >=2 and location_neigbor[-1] in :

    print("=====================================================================")
        
    return location_neigbor

def way_from_neibor(neibors):
    empty_near_ids = {i["id"] for i in neibors if not i["near"]}
    for i in neibors:
        i["near"] = [id for id in i["near"] if id not in empty_near_ids]
    neibors = [x for x in neibors if x["near"]]
    return neibors

def convert_id_to_infor(locations, id):
    for location in locations:
        if location["id"] == id:
            return location
    return id
    

def hill_climbing_search(locations, start, end):
    L = [start]
    visited_id = []
    waiting_id = [start["id"]]
    location_neigbor = []
    index = 0

    while L:
        u = L.pop(0)
        visited_id.append(u["id"])
        
        index +=1
        if u["id"] == end["id"]:
            print("Tìm thấy trạng thái kết thúc")
            way_id = way_from_neibor(location_neigbor)
            way_id.append({"id": end['id'], "near": end["near"]})
            way = [convert_id_to_infor(locations, id["id"]) for id in way_id]
            return way
        L1 = []
        # print("visited: ", visited_id)
        # print("wating_id: ", waiting_id)
        flag = False
        for id in u["near"]: 
            if id not in visited_id and id not in waiting_id:
                flag = True
                for location in locations:
                    if id == location['id']:
                        # print(id)
                        v = location
                        v['distance'] = calculate_distance(u, v)
                        L1.append(v)
                        waiting_id.append(id)
        L1.sort(key=lambda x: x["distance"])
        L = L1 + L
        # for value in L:
        #     print(value)
        # print("==========================================================")

        near_ids = [item["id"] for item in L1]

        location_neigbor.append({"id": u["id"], "near": near_ids})


    print("Không tìm thấy trạng thái kết thúc")
    return None