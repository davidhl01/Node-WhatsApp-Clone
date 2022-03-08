const express = require('express') // Importamos express y se lo asignamos a una variable

const fileupload = require('express-fileupload'); // Importamos la libreria fileupload


const app = express() // Utilizamos express en nuestra app

const http = require('http') // Hacemos uso del protocolo de transferencia de hipertexto

//const formidable = require('formidable'); // Hacemos uso de la libreria formidable

const path = require("path"); // Hacemos uso del path para indicar el directorio de la plantilla

const server = http.createServer(app) // Tenemos nuestro servidor creado

const {Server} = require('socket.io') // Requerimos socket.io

const io = new Server(server) // creamos una instancia y se lo asignamos a una constante

const puerto = process.env.PORT || 3000

server.listen(puerto, ()=>{ // Puerto por el que escucha nuestro servidor

    console.log('Servidor corriendo en http://localhost:3000')

})


// Pasamos la plantilla del html

const directory = path.join(__dirname, "cliente");

app.use(express.static(directory));


io.on('connection', (socket)=>{ // Escuchamos al evento connection en busca de sockets entrantes
    
    //console.log('Un usuario se ha conectado')

    socket.on('nuestrochat', (mensaje)=>{
        io.emit('nuestrochat', mensaje) // Emitimos el mensaje desde nuestro chat
    })

})

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/public/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);

    // res.send('<a href ="./public/' + sampleFile.name+ '">Descarga</a>')
    res.send('File Uploaded')
    })
});



