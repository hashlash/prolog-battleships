import socketserver
import http.server


PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'templates/index.html'

        http.server.SimpleHTTPRequestHandler.do_GET(self)


httpd = socketserver.ThreadingTCPServer(('', PORT), CustomHandler)
print('serving at port', PORT)
httpd.serve_forever()
