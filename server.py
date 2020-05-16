import socketserver
import http.server
import json
from hello import solve


PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/':
            self.path = 'templates/index.html'
        
        http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        length = self.headers['content-length']
        data = self.rfile.read(int(length))
        print(data.decode())
        print(json.loads(data))
        response = solve()
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode()) #send response

httpd = socketserver.ThreadingTCPServer(('', PORT), CustomHandler)
print('serving at port', PORT)
httpd.serve_forever()
