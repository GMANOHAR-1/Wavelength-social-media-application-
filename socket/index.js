const io = require('socket.io')(8081, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


let activeUsers = []
console.log(activeUsers)
io.on("connection", (socket) => {
    socket.on('new-user-add', (newuserId) => {
        if (!activeUsers.some((user) => user.userId === newuserId)) {
            activeUsers.push({
                userId: newuserId,
                socketId: socket.id
            })
            console.log(activeUsers)
        }

        io.emit('get-users', activeUsers)
    })
    //sending message
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("sending to receiver",data)
        if (user) {
            io.to(user.socketId).emit("receive-message", data)
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log("user disconnected", activeUsers)
        io.emit('get-users', activeUsers)
    })

})