const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000);

io.on('connection', socket => {
    console.log('Kullanıcı bağlandı.');
    socket.on('veri', data => {
        console.log(data);
    });
    socket.on('disconnect', () => {
        console.log('Kullanıcı çıkış yaptı.');
    });
});