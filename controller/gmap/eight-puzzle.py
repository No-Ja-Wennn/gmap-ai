import copy
from collections import deque

# Hàm tìm vị trí của số 0 trong bảng
def find_zero(puzzle):
    for i in range(len(puzzle)):
        for j in range(len(puzzle[i])):
            if puzzle[i][j] == 0:
                return i, j

# Hàm kiểm tra xem bảng đã đạt trạng thái hoàn thành chưa
def is_solved(puzzle):
    target = [[1, 2, 3],
              [4, 5, 6],
              [7, 8, 0]]
    return puzzle == target

# Hàm tạo các trạng thái tiếp theo dựa trên các di chuyển hợp lệ
def get_neighbors(puzzle):
    neighbors = []
    x, y = find_zero(puzzle)
    
    # Các bước di chuyển hợp lệ
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # Lên, Xuống, Trái, Phải
    for move in moves:
        new_x, new_y = x + move[0], y + move[1]
        if 0 <= new_x < 3 and 0 <= new_y < 3:
            new_puzzle = copy.deepcopy(puzzle)
            new_puzzle[x][y], new_puzzle[new_x][new_y] = new_puzzle[new_x][new_y], new_puzzle[x][y]
            neighbors.append(new_puzzle)
    return neighbors

# Hàm in bảng trạng thái
def print_puzzle(puzzle):
    for row in puzzle:
        print(' '.join(str(x) for x in row))
    print()

# Thuật toán BFS để giải bài toán 8-puzzle
def solve_puzzle_bfs(start):
    queue = deque([(start, [])])  # (trạng thái, các bước di chuyển)
    visited = set()
    visited.add(tuple(map(tuple, start)))

    while queue:
        current, path = queue.popleft()
        print("Trạng thái hiện tại:")
        print_puzzle(current)

        if is_solved(current):
            print("Đã đạt trạng thái hoàn thành!")
            print_puzzle(current)
            return path
        
        for neighbor in get_neighbors(current):
            neighbor_tuple = tuple(map(tuple, neighbor))
            if neighbor_tuple not in visited:
                visited.add(neighbor_tuple)
                queue.append((neighbor, path + [neighbor]))

    return None

# Trạng thái ban đầu của 8-puzzle
start_puzzle = [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8]
]

print("Bắt đầu giải bài toán 8-puzzle...")
solve_puzzle_bfs(start_puzzle)
