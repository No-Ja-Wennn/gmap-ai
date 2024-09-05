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

def saveTable(variable, isEmpty, u, uBelongToC, v, l1, l):
    data = {
        "isEmpty": isEmpty,
        "u": u,
        "uBelongToT": uBelongToC,
        "v": v,
        "l1": l1,
        "l": l,
    }
    variable.append(data)

def hill_climbing_search(locations, start, end):
    L = [start]
    visited_id = []
    waiting_id = [start["id"]]
    location_neigbor = []
    index = 0
    tableShow = [] # save table of ... for return 
    
    while L:
        data = {}
        data["isEmpty"] = False
        u = L.pop(0)
        data["u"] = u
        visited_id.append(u["id"])
        
        index +=1
        
        data["uBelongToT"] = False 
        
        if u["id"] == end["id"]:
            print("Tìm thấy trạng thái kết thúc")
            way_id = way_from_neibor(location_neigbor)
            way_id.append({"id": end['id'], "near": end["near"]})
            way = [convert_id_to_infor(locations, id["id"]) for id in way_id]
            data["u"] = u
            data["uBelongToT"] = True 
            data["v"] = []
            data["l1"] = []
            data["l"] = []

            tableShow.append(data)
            
            return way, tableShow
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
        data["v"] = L1.copy()
        L1.sort(key=lambda x: x["distance"])
        data["l1"] = L1.copy()
        L = L1 + L
        data["l"] = L.copy()
            
        tableShow.append(data)
        # for value in L:
        #     print(value)
        # print("==========================================================")

        near_ids = [item["id"] for item in L1]

        location_neigbor.append({"id": u["id"], "near": near_ids})


    print("Không tìm thấy trạng thái kết thúc")
    return None