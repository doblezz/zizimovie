const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const engine = require('ejs-mate');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);


// Configuraciones de motor de plantilla ejs y archivos.
app.set('views', path.join(__dirname, './src/views/pages'));
app.use(express.static(path.join(__dirname, './src/public')));

// Instanciando motor de plantilla
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// Rutas de navegacion
app.get('/', require('./src/routers/router'));




// Socket io
io.on('connection', (socket) => {
    console.log('a user connected');


    // api THEMOVIE
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=578e6015995a8395d0c83b76f698c1be&query=';

    socket.on('titulo', (titulo) => {
        const gt = async () => {
            try{
                return await axios.get(url+titulo);
            }catch (error){
                console.log(error);
            }
        }

        const ct = async () => {
            const gte = await gt();

            if(gte){
                const datos = Object.values(gte)[5].results;
                socket.emit('resultados_db', datos);
            }
        }
        ct();
    });
  });

// Estableciendo puerto.
server.listen(3000, () => {
    console.log('Server zizimovie on, port 3000');
})