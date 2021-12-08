let socket = null 


export default {
    init(url, { onMessage, onOpen, onError }) {
        // 实例化
        socket = new WebSocket(url)
        // open
        socket.onopen = function(data) {
            console.log('---websockt open ---', data)
            typeof onOpen == 'function' && onOpen(socket)
        }
        // message
        socket.onmessage = function(data) {
            console.log('---websockt message---', data)
            typeof onMessage == 'function' && onMessage(data.data)
        }
        // error
        socket.onerror = function() {
            console.log('---websockt error ---')
            typeof onError == 'function' && onError(socket)
        }

        return socket
    },
    destroy() {
        socket = null
    }
}