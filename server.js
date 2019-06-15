const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000);

const users = [];

io.on('connection', socket => {
    console.log('Kullanıcı bağlandı.');
    
    socket.on('name', name => {
        socket.name = name;
        users.push(name);
        socket.emit('users', users);
        socket.broadcast.emit('addUser', name);
    });

    socket.on('disconnect', () => {
        const index = users.indexOf(socket.name);
        if (index !== -1){
            users.splice(index, 1);
        }
        socket.broadcast.emit('deleteUser', socket.name);
        console.log('Kullanıcı çıkış yaptı.');
    });
});