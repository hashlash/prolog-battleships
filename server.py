import http.server
import json
from battleship import PrologAny, solve

PORT = 8000


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        kwargs['directory'] = 'frontend/'
        super().__init__(*args, **kwargs)

    def do_POST(self):
        length = self.headers['content-length']
        data = self.rfile.read(int(length))
        data = json.loads(data)
        ships = data['ships']
        row_clues = data['rowClues']
        col_clues = data['colClues']
        grid = [[PrologAny() if x is None else int(x) for x in l] for l in data['grid']]
        result = solve(ships, row_clues, col_clues, grid)
        answers = result
        response = [[[bool(x) for x in l] for l in ans] for ans in answers]
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())  # send response


httpd = http.server.HTTPServer(('', PORT), CustomHandler)
print('serving at port', PORT)
httpd.serve_forever()
