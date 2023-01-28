console.log("Node JS");

// Importar librería Express
const express = require("express");
// Importar librería Cors
const cors = require("cors");

// Iniciar servidor HTTP con Express
const app = express();

app.use(express.static('public'));
app.use(cors()); // Evitar errores de Cors
app.use(express.json()); // Soportar peticiones JSON


// Clase Jugadores
class Player {
    // Constuir clase a partir de los siguientes parametros
    constructor(id) {
        // Asignar ID a propiedad del objeto
        this.id = id;
    }

    assingMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    positionUpdate(x, y) {
        this.x = x;
        this.y = y;
    }

    assingAttacks(attacks) {
        this.attacks = attacks;
    }
}

class Mokepon {
    constructor(name) {
        this.name = name;
    }
}

// Arreglo para almacenar jugadores
const players = [];

// Generar una alerta cuando el cliente haga una petición
// localhost:8080/join
// Ruta para unirse a la partida
app.get("/join", (req, res) => {
    // Generar ID aleatorio para jugador
    const id = `${Math.random()}`;

    // Crear nuevo jugador con ID generado
    const player = new Player(id);
    
    // Agregar jugador al arreglo
    players.push(player);

    // Permitir acceso de todas las solicitudes desde cualquier origen
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Enviar ID del jugador como respuesta
    res.send(id);
});

// Ruta para envíar
app.post("/mokepon/:playerID", (req, res) => {
    const playerID = req.params.playerID || "";
    const name = req.body.mokepon || "";
    const mokepon = new Mokepon(name);

    const playerIndex = players.findIndex((player) => playerID === player.id);

    if (playerIndex >= 0) {
        players[playerIndex].assingMokepon(mokepon);
    }
    res.end();
});

app.post("/mokepon/:playerID/position", (req, res) => {
    const playerID = req.params.playerID || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const playerIndex = players.findIndex((player) => playerID === player.id);

    if (playerIndex >= 0) {
        players[playerIndex].positionUpdate(x, y);
    }

    const enemies = players.filter((player) =>  playerID !== player.id);

    res.send({
        enemies
    });
});

app.post("/mokepon/:playerID/attacks", (req, res) => {
    const playerID = req.params.playerID || "";
    const attacks = req.body.attacks || [];

    const playerIndex = players.findIndex((player) => playerID === player.id);

    if (playerIndex >= 0) {
        players[playerIndex].assingAttacks(attacks);
    }
    res.end();
});

app.get("/mokepon/:playerID/attacks", (req, res) => {
    const playerID = req.params.playerID || "";
    const player = players.find((player) => player.id === playerID);

    res.send({
        attacks: player.attacks || []
    });
});

// Iniciar servidor y escuchar por solicitudes en el puerto 8080
app.listen(8080, () => {
    console.log("Servidor en línea");
});