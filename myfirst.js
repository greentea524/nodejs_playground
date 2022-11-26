var http = require('http');
var url = require('url');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Thes date and time are currently: " + dt.myDateTime());
    res.write('<br>' + req.url);
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write('<br>' + txt);

    res.end('<br>Hello World');
}).listen(8080);
