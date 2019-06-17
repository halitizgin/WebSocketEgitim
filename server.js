const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000);

const users = [];

io.on('connection', socket => {
    console.log('Kullanıcı bağlandı.');
    socket.on('name', name => {
        const user = { username: name, id: socket.id };
        socket.name = name;
        users.push(user);
        socket.emit('users', users);
        socket.broadcast.emit('addUser', user);
    });

    socket.on('pm', data => {
        io.sockets.to(data.to).emit('pm', data);
    });

    socket.on('disconnect', () => {
        const index = users.findIndex(item => item.id === socket.id);
        if (index !== -1){
            users.splice(index, 1);
        }
        socket.broadcast.emit('deleteUser', { id: socket.id, username: socket.name });
        console.log('Kullanıcı çıkış yaptı.');
    });
});