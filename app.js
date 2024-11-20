const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')

const button = document.getElementById('iniciar')
const button2 = document.getElementById('reiniciar')
button2.style.display = 'none'

let playerSpeed = 0 //35
let beyonceSpeed = 0 //2
let volume = document.getElementById('volumeControl') //50

let personaje = document.getElementById('player')


let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            alert('Perdiste :(')
            isPlaying = false
            audio.pause()
        }
    }
}

function gameLoop () {

    moveBeyonce()
    requestAnimationFrame(gameLoop)
    
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision();
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition();
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

window.addEventListener('keydown', movePlayer)
/*
window.addEventListener('load', () => {

    gameLoop()
    audio.play()
})
*/

volume.addEventListener("change", function(e) {
    audio.volume = e.currentTarget.value / 100;
});

function imageCat(){
    personaje.style.backgroundImage = "url(assets/cat.jfif)";
}
function imageDoge(){
    personaje.style.backgroundImage = "url(assets/doge.jfif)";
}
function imageMacaco(){
    personaje.style.backgroundImage = "url(assets/macaco.jfif)";
}

function reiniciar() {
    location.reload(); 
}

button2.addEventListener('click', reiniciar);

button.addEventListener("click", () => {
    playerSpeed = parseInt(document.getElementById("playerSpeed").value);
    beyonceSpeed = parseInt(document.getElementById("beyonceSpeed").value);

    gameLoop();
    audio.play();

    button.style.display = "none";
    button2.style.display = "block";
});