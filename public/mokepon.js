//Secciones de la página
const beginning = document.getElementById('beginning');
const petSelect = document.getElementById('pet-select');
const mapSection = document.getElementById('map-section');
const attackSelect = document.getElementById('attack-select');
const resetSection = document.getElementById('box-reset');

//Canvas dónde se dibujará el mapa y mascotas
const villageMap = document.getElementById('village-map');
let ctx = villageMap.getContext('2d');
let range;
const mapBackground = new Image();
mapBackground.src = './assets/mokemap.png';
let petImg;
let findHeight;
let mapWidth = window.innerWidth - 20;
let maxWidthMap = 620;

//Ajusta el tamaño del canvas según el tamaño de la ventana
if (mapWidth > maxWidthMap) {
    mapWidth = maxWidthMap - 20;
} else {
    console.log("mapWidth menor a maxWidthMap");
}
findHeight = mapWidth * 600 / 800;
villageMap.width = mapWidth;
villageMap.height = findHeight;

//Variables de la mascota del jugador
let playerID = null;
let enemyID = null;
let enemiesMokepones = [];
let playerPet;
const petsContainer = document.getElementById('pets-container');
const playerPetImg = document.getElementById('player-pet-img');
const playerWinsCount = document.getElementById("player-wins");
let playerPetName = document.getElementById('player-pet');
let playerWins = 0;
let playerAttack = [];
let iPlayerAttack;

//Variables de la mascota del PC
const enemyPetImg = document.getElementById('pc-pet-img')
const enemyWinsCount = document.getElementById("pc-wins");
let enemyPet = document.getElementById('pc-pet');
let enemyWins = 0;
let enemyAttack = [];
let enemyAttacks;
let iEnemyAttack;

//Botones
let attackButtons = [];
const attacksContainer = document.getElementById('attacks-container');
const beginningButton = document.getElementById('beginning-button');
const confirmButton = document.getElementById('confirm-button');
let fireButton;
let waterButton;
let earthButton;
const resetButton = document.getElementById("reset-button");

//Entradas de texto
let inHipodoge;
let inCapipepo;
let inRatigueya;
let inLangostelvis;
let inTacupalma;
let inPydos;

//Mensajes
const myMessages = document.getElementById('my-messages');
const enemyMessages = document.getElementById('pc-messages');
const battleMessages = document.getElementById('battle-messages');
const definition = document.getElementById('messages');

//Arreglo con datos de mascotas
let pets = [];
//Opción de mascotas para elejir
let petsOptions;
let petsAttacks;

//Clase o plano de nuestros objetos
class Mokepon {
    //Propiedades del objeto
    constructor(name, img, live, id = null) {
        this.name = name;
        this.img = img;
        this.live = live;
        this.id = id;
        this.attacks = [];
        this.widthImg = 80;
        this.heightImg = 80;
        this.x = random(0, villageMap.width - this.widthImg);
        this.y = random(0, villageMap.height - this.heightImg);
        this.mapImg = new Image();
        this.mapImg.src = img;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    drawPet() {
        ctx.drawImage(
            this.mapImg,
            this.x,
            this.y,
            this.widthImg,
            this.heightImg
        );
    }
}

//Objetos creados a partir de nuestra clase o plano (Objetos instancia)
let hipodoge = new Mokepon ('Hipodoge', './assets/hipodoge.png', 5);
let capipepo = new Mokepon ('Capipepo', './assets/capipepo.png', 5);
let ratigueya = new Mokepon ('Ratigueya', './assets/ratigueya.png', 5);
let langostelvis = new Mokepon ('Langostelvis', './assets/langostelvis.png', 5);
let tacupalma = new Mokepon ('Tacupalma', './assets/tacupalma.png', 5);
let pydos = new Mokepon ('Pydos', './assets/pydos.png', 5);

const hipodogeAttacks = [
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
];

const capipepoAttacks = [
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
];

const ratigueyaAttacks = [
    {name: 'Earth 🌱🌱', id: 'earth-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
];

const langostelvisAttacks = [
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
];

const tacupalmaAttacks = [
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
];

const pydosAttacks = [
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Water 💦💦', id: 'water-button'},
    {name: 'Fire 🔥🔥', id: 'fire-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
    {name: 'Earth 🌱🌱', id: 'earth-button'},
];

hipodoge.attacks.push(...hipodogeAttacks);

capipepo.attacks.push(...capipepoAttacks);

ratigueya.attacks.push(...ratigueyaAttacks);

langostelvis.attacks.push(...langostelvisAttacks);

tacupalma.attacks.push(...tacupalmaAttacks);

pydos.attacks.push(...pydosAttacks);

//Agregar objetos al arreglo
pets.push(hipodoge, capipepo, ratigueya, langostelvis, tacupalma, pydos);

//Ocultar, obtener elementos y escuchar botones
function htmlElements() {
    // Ocultar secciones que no aparecerán hasta ser llamadas
    petSelect.style.display = 'none';
    mapSection.style.display = 'none';
    attackSelect.style.display = 'none';
    resetSection.style.display = 'none';

    //Por cada pet dentro de pets, haz lo siguiente
    pets.forEach((pet) => {
        petsOptions = `
        <input class="box-input" name="pet-type" type="radio" id=${pet.name}>
        <label class="box-mokepon" for=${pet.name}>
            <p>${pet.name}</p>
            <img src=${pet.img} alt=${pet.name}>
        </label>
        `;
        // Agregar mascota a la lista de opciones
        petsContainer.innerHTML += petsOptions;

        // Obtener elemento de HTML y guardar en JS
        inHipodoge = document.getElementById('Hipodoge');
        inCapipepo = document.getElementById('Capipepo');
        inRatigueya = document.getElementById('Ratigueya');
        inLangostelvis = document.getElementById('Langostelvis');
        inTacupalma = document.getElementById('Tacupalma');
        inPydos = document.getElementById('Pydos');
    });
    
    // Escuchar eventos de botones y ejecutar funciones
    beginningButton.addEventListener('click', 
    function() {
        beginning.style.display = 'none';
        petSelect.style.display = 'flex';
    });
    confirmButton.addEventListener('click', selPlayerPet);
    resetButton.addEventListener('click', reset);

    joinToTheGame();
}

// Cargar servicio del servidor local
function joinToTheGame() {
    // Petición hacia el servidor y devolver res
    fetch('http://192.168.1.191:8080/join').then(function (res) {
        // console.log(res);
        // Si la respuesta es ok, devolver la respuesta en texto
        if (res.ok) {
            res.text().then(function (answer) {
                playerID = answer;
            });
        } else {
            console.log("Falla en carga de servidor");
            return;
        }
    });
}

function selPlayerPet() {
    /*Verificar si alguno de los inputs está seleccionado (.checked) y
    modificar el nombre de la mascota con .innerHTML
    */
    if (inHipodoge.checked) {
        playerPetName.innerHTML = inHipodoge.id;//Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${hipodoge.img} alt=${hipodoge.name}>`;
        playerPet = inHipodoge.id;//Guardar nombre de mascota
        confirmButton.disabled = true;
    } 
    else if (inCapipepo.checked) {
        playerPetName.innerHTML = inCapipepo.id;//Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${capipepo.img} alt=${capipepo.name}>`;
        playerPet = inCapipepo.id;//Guardar nombre de mascota
        confirmButton.disabled = true;
    }
    else if (inRatigueya.checked) {
        playerPetName.innerHTML = inRatigueya.id;//Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${ratigueya.img} alt=${ratigueya.name}>`;
        playerPet = inRatigueya.id;//Guardar nombre de mascota
        confirmButton.disabled = true;
    }
    else if (inLangostelvis.checked) {
        playerPetName.innerHTML = inLangostelvis.id;//Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${langostelvis.img} alt=${langostelvis.name}>`;
        playerPet = inLangostelvis.id;//Guardar nombre de mascota
        confirmButton.disabled = true;
    }
    else if (inTacupalma.checked) {
        playerPetName.innerHTML = inTacupalma.id;//Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${tacupalma.img} alt=${tacupalma.name}>`;
        playerPet = inTacupalma.id;//Guardar nombre de mascota
        confirmButton.disabled = true;
    } 
    else if (inPydos.checked) {
        playerPetName.innerHTML = inPydos.id; //Imprimir nombre de mascota en HTML
        playerPetImg.innerHTML = `<img src=${pydos.img} alt=${pydos.name}>`;
        playerPet = inPydos.id; //Guardar nombre de mascota
        confirmButton.disabled = true;
    } else {
        alert('⚔ Chose you pet');
        return;
    }

    petSelect.style.display = 'none';
    mapSection.style.display = 'flex';
    mokeponSelect(playerPet);
    attackExtract(playerPet);
    startMap();
}

function mokeponSelect(playerPet) {
    fetch(`http://192.168.1.191:8080/mokepon/${playerID}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerPet
        })
    });
}

//Buscar playerPet para extraer attacks de ese pet
function attackExtract(playerPet) {
    let attacks;
    for (let index = 0; index < pets.length; index++) {
        if (playerPet === pets[index].name) {
            attacks = pets[index].attacks;
        } else {
            console.log("Falla al extraer ataques");
        }
    }
    seeAttacks(attacks);
}

//Insertar attack-button por cada ataque en el arreglo attacks
function seeAttacks(attacks) {
    attacks.forEach((attack) => {
        petsAttacks = `<button class="attack-button attack-buttons" id=${attack.id}>${attack.name}</button>`;
        attacksContainer.innerHTML += petsAttacks;
    });
    fireButton = document.getElementById('fire-button');
    waterButton = document.getElementById('water-button');
    earthButton = document.getElementById('earth-button');

    //Seleccionar todos los elementos con la clase .attack-buttons
    attackButtons = document.querySelectorAll('.attack-buttons');
}

// Inicializar mapa
function startMap() {
    // Ejecutar cada 50ms drawCanvas
    range = setInterval(drawCanvas, 50);
    petImg = petObject(petImg);
    window.addEventListener('keydown', KeyBoardEvent);
    window.addEventListener('keyup', stopMove);
}

// Escuchar eventos del teclado
function KeyBoardEvent(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            break;
    }
}

// Mover mascota hacia la derecha
function moveRight() {
    petImg.xSpeed = 3;
}

// Mover mascota hacia la izquierda
function moveLeft() {
    petImg.xSpeed = -3;
}

// Mover mascota hacia abajo
function moveDown() {
    petImg.ySpeed = 3;
}

// Mover mascota hacia arriba
function moveUp() {
    petImg.ySpeed = -3;
}

// Detener movimiento
function stopMove() {
    petImg.xSpeed = 0;
    petImg.ySpeed = 0;
}

// Dibujar personaje en mapa
function drawCanvas() {
    petImg.x += petImg.xSpeed;
    petImg.y += petImg.ySpeed;
    // limpiar espacio de canvas
    ctx.clearRect(0, 0, villageMap.width, villageMap.height);
    ctx.drawImage(
        mapBackground,
        0,
        0,
        villageMap.width,
        villageMap.height
    );

    petImg.drawPet();
    sendPosition(petImg.x, petImg.y);

    enemiesMokepones.forEach(function (mokepon) {
        mokepon.drawPet();
        collisionCheck(mokepon);
    });
}

function sendPosition(x, y) {
    fetch(`http://192.168.1.191:8080/mokepon/${playerID}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemies }) {
                enemiesMokepones = enemies.map(function (enemy) {
                    let enemyMokepon = null;
                    const mokeponName = enemy.mokepon.name || "";
                    if (mokeponName === "Hipodoge") {
                        enemyMokepon = new Mokepon ('Hipodoge', './assets/hipodoge.png', 5, enemy.id);
                    } else if (mokeponName === "Capipepo") {
                        enemyMokepon = new Mokepon ('Capipepo', './assets/capipepo.png', 5, enemy.id);
                    } else if (mokeponName === "Ratigueya") {
                        enemyMokepon = new Mokepon ('Ratigueya', './assets/ratigueya.png', 5, enemy.id);
                    } else if (mokeponName === "Langostelvis") {
                        enemyMokepon = new Mokepon ('Langostelvis', './assets/langostelvis.png', 5, enemy.id);
                    } else if (mokeponName === "Tacupalma") {
                        enemyMokepon = new Mokepon ('Tacupalma', './assets/tacupalma.png', 5, enemy.id);
                    } else if (mokeponName === "Pydos") {
                        enemyMokepon = new Mokepon ('Pydos', './assets/pydos.png', 5, enemy.id);
                    } else {
                        console.log("Falla al cargar mokepon enemigo");
                        return;
                    }
                    enemyMokepon.x = enemy.x;
                    enemyMokepon.y = enemy.y

                    return enemyMokepon;
                });                
            });
        } else {
            console.log("Falla al ejecutar carga mokepon enemigo");
        }
    });
}

// Verificar colisión con una mascota enemiga
function collisionCheck(enemy) {
    const downPC = enemy.y + enemy.heightImg;
    const rightPC = enemy.x + enemy.widthImg;
    const upPC = enemy.y;
    const leftPC = enemy.x;

    const upPlayer = petImg.y;
    const downPlayer = petImg.y + petImg.heightImg;
    const rightPlayer = petImg.x + petImg.widthImg;
    const leftPlayer = petImg.x;

    if (downPlayer < upPC ||
        upPlayer > downPC ||
        rightPlayer < leftPC ||
        leftPlayer > rightPC) {
        return;
    }
    attackSelect.style.display = 'flex';
    mapSection.style.display = 'none';
    stopMove();
    clearInterval(range);
    enemyID = enemy.id;
    selPCpet(enemy);
}

//Selección aleatoria de mascota
function selPCpet(enemy) {
    enemyPet.innerHTML = enemy.name;
    enemyAttacks = enemy.attacks;
    enemyPetImg.innerHTML = `<img src=${enemy.img} alt=${enemy.name}>`;

    attackSequence();
}

// Obtener objeto completo de mascota
function petObject() {
    for (let index = 0; index < pets.length; index++) {
        if (playerPet === pets[index].name) {
            return pets[index];
        } else {
            console.log("Falla al obtener index de mokepon");
        }
    }
}

//Gererar secuencia de ataques según event y agregar a playerAttack
function attackSequence() {
    //Por cada button en attackButtons
    attackButtons.forEach((button) => {
        //Agregar escuchador de click y ejecutar event
        button.addEventListener('click', (event) => {
            if (event.target.textContent === 'Fire 🔥🔥') {
                playerAttack.push('🔥');
                button.style.background = '#111f58';
                button.disabled = true;
            } else if (event.target.textContent === 'Water 💦💦') {
                playerAttack.push('💦');
                button.style.background = '#111f58';
                button.disabled = true;
            } else {
                playerAttack.push('🌱');
                button.style.background = '#111f58';
                button.disabled = true;
            }

            if (playerAttack.length === 5) {
                sendAttacks();
            } else {
                console.log(playerAttack.length);
                return;
            }
        });
    });
}

function sendAttacks() {
    fetch(`http://192.168.1.191:8080/mokepon/${playerID}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    });
    console.log(playerAttack);
    range = setInterval(getAttacks, 50);
}

function getAttacks() {
    fetch(`http://192.168.1.191:8080/mokepon/${enemyID}/attacks`,)
    .then(function (res) {
        if (res.ok) {
            res.json().then(function ({ attacks }) {
                if (attacks.length === 5) {
                    enemyAttack = attacks;
                    combat();
                } else {
                    console.log(enemyAttack.length);
                    return;
                }
            });
        } else {
            console.log("Falla al obtener ataques enemigo");
            return;
        }
    });
}

// // Genera un ataque aleatorio para enemyAttack y agregalo al array enemyAttack
// function selPCAttack() {
//     let randomAttack = random(0, enemyAttacks.length -1);
//     if (enemyAttacks[randomAttack].name === 'Water 💦💦') {
//         enemyAttack.push('💦');
//         enemyAttacks.splice(randomAttack, 1);
//     } else if (enemyAttacks[randomAttack].name === 'Fire 🔥🔥') {
//         enemyAttack.push('🔥');
//         enemyAttacks.splice(randomAttack, 1);
//     } else {
//         enemyAttack.push('🌱');
//         enemyAttacks.splice(randomAttack, 1);
//     }
//     startBattle();
// }

//Verificar longitud de playerAttack para ejecutar combate
// function startBattle() {
//     if (playerAttack.length === 5) {
//         combat();
//     } else {
//         console.log("Falla al verificar longitud de ataques jugador");
//         return;
//     }
// }

/* Verifica los estados de playerAttack y enemyAttack para determinar el resultado.
Guarda el resultado en la función messageCreator y la invoca */
function combat() {
    clearInterval(range);
    for (let index = 0; index < playerAttack.length; index++) {
        if (playerAttack[index] === '🔥' && enemyAttack[index] === '🌱' || playerAttack[index] === '💦' && enemyAttack[index] === '🔥' || playerAttack[index] === '🌱' && enemyAttack[index] === '💦') {
            indexPets(index, index);
            messageCreate("🥳 YOU WIN! 🎉");
            playerWins++;
            playerWinsCount.innerHTML = playerWins;
        } else if (playerAttack[index] === enemyAttack[index]) {
            indexPets(index, index);
            messageCreate("😱 TIE! 😰");
        } else {
            indexPets(index, index);
            messageCreate("🤯 ENEMY WIN! 📈");
            enemyWins++;
            enemyWinsCount.innerHTML = enemyWins;
        }
        winsCheck();
    }
}

//Guardar valores de los index en una variable
function indexPets(player, enemy) {
    iPlayerAttack = playerAttack[player];
    iEnemyAttack = enemyAttack[enemy];
}

// Verificar el conteo de vidas
function winsCheck() {
    if (playerWins > enemyWins) {
        finalMessage("🥳 You won this battle ⚔");
    } else if (enemyWins > playerWins) {
        finalMessage("😔 You lost this battle ⚔");
    } else {
        finalMessage("🤯 The battle ended in a tie ⚔");
    }
}

// Generar mensajes del resultado de la batalla
function messageCreate(result) {
    // Crear un parrafo y luego insertar el resultado de la battalla
    let pMyAttack = document.createElement('p');
    pMyAttack.innerHTML = iPlayerAttack;
    myMessages.appendChild(pMyAttack);
    
    let pEnemyAttack = document.createElement('p');
    pEnemyAttack.innerHTML = iEnemyAttack;
    enemyMessages.appendChild(pEnemyAttack);

    let pBattleMessages = document.createElement('p');
    pBattleMessages.innerHTML = result;
    battleMessages.appendChild(pBattleMessages);
}

// Mensaje final del resultado de la batalla
function finalMessage(final) {
    // Crear un parrafo y luego insertar el resultado de la battalla
    definition.innerHTML = final;

    // Mostrar boton de reset
    resetSection.style.display = 'flex';
}

// Restablecer página
function reset() {
    // Recargar página
    location.reload();
}

// Generar un número aleatorio dentro de un rango
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Escuchar evento cuando navegador cargo completamente
window.addEventListener('load', htmlElements);