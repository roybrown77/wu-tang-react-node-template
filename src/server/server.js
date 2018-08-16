require('./db');

var express = require('express');
var path = require('path');

var app = express();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

var AlbumController = require('./album/AlbumController');
app.use('/api/albummanagement', AlbumController);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});