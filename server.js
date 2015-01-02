#!/bin/env node
var http = require('http');
var express = require('express'),
app = express();
var jade = require('jade');
var server = http.createServer(app);

var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
//app.configure(function() {
app.use(express.static(__dirname + '/public'));
//});

app.get('/', function(req, res){
  res.render('home.jade');
});
server.listen(port);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  socket.on('setPseudo', function (data) {
    socket.name = data;
  });
  socket.on('message', function (message) {
    // socket.on('pseudo', function (error, name) {
    var data = { 'message' : message, pseudo : socket.name };
    socket.broadcast.emit('message', data);
    console.log("user " + socket.name + " send this : " + message);
    // })
  });
});




/*
https://github.com/Automattic/socket.io

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

// when the client emits 'add user', this listens and executes
socket.on('add user', function (username) {
// we store the username in the socket session for this client
socket.username = username;
// add the client's username to the global list
usernames[username] = username;
++numUsers;
addedUser = true;
socket.emit('login', {
numUsers: numUsers
});
// echo globally (all clients) that a person has connected
socket.broadcast.emit('user joined', {
username: socket.username,
numUsers: numUsers
});
});
*/
