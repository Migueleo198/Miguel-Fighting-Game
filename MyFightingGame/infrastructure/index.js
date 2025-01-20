import { SpriteFunctions } from '../application/SpriteFunctions.js';
import { BackgroundSprite } from '../domain/Sprite.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const sprites = new SpriteFunctions();

const gravity = 0.24;

//TIMER VALUE IN SECONDS
let timer = 60;

let timerElement = document.createElement("p");
timerElement.style.fontSize = "20px"; // Fix fontSize typo from "20x" to "20px"
timerElement.style.margin = "25px";

let timerBox = document.querySelector('.timer');
timerBox.appendChild(timerElement);

let enemyHealthBar = document.querySelector('#enemyHealth');
let playerHealthBar = document.querySelector('#playerHealth');

let healthBars = document.querySelector('.healthsContainer');
let container = document.querySelector('.gameOverContainer');

// Create player and enemy objects
sprites.loadPlayer(80, 150);
sprites.loadEnemy(925, 150);

let jumpCounter = 0;

let elementGameOver = document.createElement('h1');

// Background Image
const background = new BackgroundSprite({
    position: { x: 0, y: 0 },
    imageSrc: '../assets/oak_woods_v1.0/background/background_layer_1.png'
});



// Attack Animations
var spriteSheetURL = '../assets/Martial Hero 2/Sprites/Attack1.png';
var image = new Image();
image.src = spriteSheetURL;
image.crossOrigin = true;

var row = 0;
var col = 0;

let audioPlayed = false;

//AUDIO FROM ATTACKS

let getHitSE = document.querySelector('.getHit');


document.addEventListener('DOMContentLoaded', () => {
    // Handle audio start event outside the animation loop
    document.addEventListener('click', () => {

        if (!audioPlayed) {
            let audio = document.body.querySelector('.bgm');
            audio.load();
            audio.play();
            audio.loop = true;
            audioPlayed = true;
        }

    });
});

// Animation Loop
let isKeyADown = false; // Tracks if 'a' is pressed
let isKeyDDown = false; // Tracks if 'd' is pressed

// Movement Events for Sprites
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            isKeyADown = true; // Mark 'a' as pressed
            sprites.player.velocity.x = -5;
            sprites.player.switchSprite('run');
            break;
        case ' ':
            if (sprites.player.getJumpCounter() == 0) {
                sprites.player.velocity.y = -8;
                sprites.player.switchSprite('jump');
            }
            break;
        case 'd':
            isKeyDDown = true; // Mark 'd' as pressed
            sprites.player.velocity.x = 5;
            sprites.player.switchSprite('run');
            break;
        case 'ArrowLeft':
            sprites.enemy.velocity.x = -5;
            keyArrowDownLeft = true; // Mark 'a' as pressed
            break;
        case '0':
            if (sprites.enemy.getJumpCounter() == 0) {
                sprites.enemy.velocity.y = -8;
            }
            break;
        case 'ArrowRight':
            sprites.enemy.velocity.x = 5;
            keyArrowDownRight = true; // Mark 'a' as pressed
            break;
        case 'Enter':
            sprites.enemy.attack();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case ' ':
            if (sprites.player.getJumpCounter() == 0) {
                sprites.player.velocity.y = 0;
            }
            break;
        case 'a':
            isKeyADown = false; // Mark 'a' as released
            if (!isKeyDDown) { // If 'd' is not pressed, switch to idle
                sprites.player.velocity.x = 0;

            }
            break;
        case 'd':
            isKeyDDown = false; // Mark 'd' as released
            if (!isKeyADown) { // If 'a' is not pressed, switch to idle
                sprites.player.velocity.x = 0;

            }
            break;
        case 'ArrowLeft':
            keyArrowDownLeft = false; // Mark 'arrow left' as released
            sprites.enemy.velocity.x = 0;
            break;
        case '0':
            if (sprites.enemy.getJumpCounter() == 0) {
                sprites.enemy.switchSprite('jump');
                sprites.enemy.velocity.y = 0;
            }
            break;
        case 'ArrowRight':
            keyArrowDownRight = false; // Mark 'arrow right' as released
            sprites.enemy.velocity.x = 0;
            break;
    }
});

// Animation Loop
function animateSprites() {
    window.requestAnimationFrame(animateSprites);

    // Switch to idle animation if no horizontal movement keys are pressed
    if (sprites.player.position.y + sprites.player.height + sprites.player.velocity.y >= canvas.height) {
        if (!isKeyADown && !isKeyDDown) {
            sprites.player.switchSprite('idle');

        } else if (isKeyADown || isKeyDDown) {
            sprites.player.switchSprite('run');

        }


    }
    if (sprites.enemy.position.y + sprites.enemy.height + sprites.enemy.velocity.y >= canvas.height) {
        if (!keyArrowDownLeft && !keyArrowDownRight) {
            sprites.enemy.switchSprite('idle');
        } else if (keyArrowDownLeft || keyArrowDownRight) {
            sprites.enemy.switchSprite('run');
        }
    }

    // Update the timer countdown
    if (timer > 0) {
        timer -= (1 / 60); // Decrease the timer by 1 second every 60 frames
    }



    if (timer <= 0 && timer > -1 || sprites.enemy.dead || sprites.player.dead) {
        timer = -1;

        elementGameOver.style.zIndex = '999';
        elementGameOver.style.alignSelf = 'center';
        elementGameOver.style.position = 'absolute';
        elementGameOver.style.marginLeft = '450px';
        elementGameOver.style.marginTop = '450px';
        container.appendChild(elementGameOver);
        if (sprites.enemy.dead) {
           
            elementGameOver.textContent = 'PLAYER 1 WINS';
            
           cancelAnimationFrame();
          

        }
        if (sprites.player.dead) {
           
            elementGameOver.textContent = 'PLAYER 2 WINS';
            cancelAnimationFrame();



        }
    }

    //TRIGGER FALL ANIMATIONS

    if(sprites.player.getJumpCounter() == 1 && sprites.player.position.y<300){
        sprites.player.switchSprite('fall');
    }

    if(sprites.enemy.getJumpCounter() == 1 && sprites.enemy.position.y<300){
        sprites.enemy.switchSprite('fall');
    }

    // End of game cleanup
    if (timer == -1) {
        /*document.querySelector('.timer').remove();
        healthBars.remove();*/
        timer=0;
        timerElement.textContent = timer;
        elementGameOver.textContent = 'GAME OVER';
        cancelAnimationFrame();

    }



    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    timerElement.textContent = parseInt(timer);

    // Update background
    background.update();

    // Update player and enemy
    sprites.player.update(gravity, jumpCounter);
    sprites.enemy.update(gravity, jumpCounter);

    // Draw player and enemy
    sprites.player.drawPlayer();
    sprites.enemy.drawEnemy();

    // Collision detection and enemy Hit
    if (sprites.player.hitBox.position.x + sprites.player.hitBox.width >= sprites.enemy.position.x
        && sprites.player.hitBox.position.x <= sprites.enemy.position.x + sprites.enemy.width &&
        sprites.player.hitBox.position.y + sprites.player.hitBox.height >= sprites.enemy.position.y &&
        sprites.player.hitBox.position.y <= sprites.enemy.position.y + sprites.enemy.height) {

        if (sprites.player.isAttacking) {
            getHitSE.load();
            getHitSE.play();
            sprites.enemy.takeHit();
            sprites.player.isAttacking = false;
            enemyHealthBar.style.width = sprites.enemy.health + "%";

        }
        if (sprites.enemy.isAttacking) {
            getHitSE.load();
            getHitSE.play();
            sprites.player.takeHit();
            sprites.enemy.isAttacking = false;
            playerHealthBar.style.width = sprites.player.health + "%";
        }
    }

    // Enemy death event
    if (sprites.enemy.health <= 0 && sprites.enemy.enemyDeadFrameConfirmed) {
       
            sprites.enemy.dead=true;
        
    }

    // Player death event
    if (sprites.player.health <= 0) {
        if (sprites.player.framesCurrent == sprites.player.sprites.death.framesMax - 1) {
            sprites.player.dead = true;
        }

    }
   
}

animateSprites();


// Movement Events for Sprites
window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'a':
            sprites.player.velocity.x = -5;
            sprites.player.switchSprite('run');
            break;
        case ' ':
            if (sprites.player.getJumpCounter() == 0) {
                sprites.player.velocity.y = -8;
                sprites.player.switchSprite('jump');
            }
            break;
        case 'd':
            sprites.player.velocity.x = 5;
            sprites.player.switchSprite('run');
            break;
        case 'ArrowLeft':
            sprites.enemy.velocity.x = -5;
            sprites.enemy.switchSprite('run');
            break;
        case '0':
            if (sprites.enemy.getJumpCounter() == 0) {
                sprites.enemy.velocity.y = -8;
                sprites.enemy.switchSprite('jump');
            }
            break;
        case 'ArrowRight':
            sprites.enemy.velocity.x = 5;
            sprites.enemy.switchSprite('run');
            break;
        case 'Enter':
            sprites.enemy.attack();
            break;
    }
});

// Declare audio elements for player and enemy attack sounds
let audioAtkPlayer = document.querySelector('#atkPlayer');
let audioAtkEnemy = document.querySelector('#atkEnemy');

// Player attack key 'e' press
// Declare audio elements for player and enemy attack sounds


// Player attack key 'e' press
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'e':
            // Trigger player attack
            sprites.player.attack();

            // Check if the audio element is present and play sound only once
            if (audioAtkPlayer) {
                if (!audioAtkPlayer.paused) {
                    audioAtkPlayer.currentTime = 0;  // Reset audio to start
                }
                audioAtkPlayer.play();  // Play the attack sound for the player
            }
            break;
    }
});

// Enemy attack key 'Enter' press
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter':
            // Trigger enemy attack
            sprites.enemy.attack();

            // Check if the audio element is present and play sound only once
            if (audioAtkEnemy) {
                if (!audioAtkEnemy.paused) {
                    audioAtkEnemy.currentTime = 0;  // Reset audio to start
                }
                audioAtkEnemy.play();  // Play the attack sound for the enemy
            }
            break;
    }
});



let keyArrowDownLeft;
let keyArrowDownRight;

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case ' ':
            if (sprites.player.getJumpCounter() == 0 && !isKeyDDown) {
                sprites.player.velocity.y = 0;

            }

            break;
        case 'a':
            sprites.player.velocity.x = 0;

            break;
        case 'd':
            sprites.player.velocity.x = 0;

            break;
        case 'ArrowLeft':
            sprites.enemy.velocity.x = 0;
            break;
        case '0':
            if (sprites.enemy.getJumpCounter() == 0) {
                sprites.enemy.velocity.y = 0;
            }
            break;
        case 'ArrowRight':
            sprites.enemy.velocity.x = 0;
            break;
    }
});

console.log(sprites.player);
console.log(sprites.enemy);
