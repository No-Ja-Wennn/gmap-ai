import math
def calculate_distance(start, end):
    R = 6371.0
    
    lat1 = math.radians(start['lat'])
    lon1 = math.radians(start['long'])
    lat2 = math.radians(end['lat'])
    lon2 = math.radians(end['long'])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Khoảng cách
    distance = R * c
    
    return distance