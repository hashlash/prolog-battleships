import http.server
import json
import os

from battleship import PrologAny, solve

PORT = int(os.environ.get('PORT', 8000))
os.chdir(os.path.join(os.path.dirname(__file__), 'frontend'))


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        length = self.headers['content-length']
        data = self.rfile.read(int(length))
        data = json.loads(data)
        ships = data['ships']
        row_clues = data['rowClues']
        col_clues = data['colClues']
        grid = [[PrologAny() if x is None else int(x) for x in l] for l in data['grid']]
        result = solve(ships, row_clues, col_clues, grid)
        answer = next(result)['Rows']
        response = [[bool(x) for x in l] for l in answer]
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())  # send response


httpd = http.server.HTTPServer(('', PORT), CustomHandler)
print('serving at port', PORT)
httpd.serve_forever()
