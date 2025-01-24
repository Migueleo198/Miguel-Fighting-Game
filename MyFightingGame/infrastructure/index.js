import { SpriteFunctions } from '../application/SpriteFunctions.js';
import { BackgroundSprite } from '../domain/BackgroundSprite.js';
import { GameService } from '../domain/services/GameService.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const SERVICE = new GameService();

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




let audioPlayed = false;

//AUDIO FROM ATTACKS

let getHitSE = document.querySelector('.getHit');

let jumpSE = document.querySelector('.jump');


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

let keyArrowDownLeft = false;
let keyArrowDownRight = false;

let lastKey;

let lastKeyEnemy;

// Movement Events for Sprites
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            isKeyADown = true;
            sprites.player.velocity.x = -5;
            lastKey = 'a';
            break;
        case 'd':
            isKeyDDown = true;
            sprites.player.velocity.x = 5;
            lastKey = 'd';
            break;
        case ' ':
            if (sprites.player.getJumpCounter() == 0) {

                if (lastKey === 'd') {
                    sprites.player.velocity.y = -8;
                    sprites.player.switchSprite('jump');
                    jumpSE.load();
                    jumpSE.play();
                }
                if (lastKey === 'a') {
                    sprites.player.velocity.y = -8;
                    sprites.player.switchSprite('jumpOpposite');
                    jumpSE.load();
                    jumpSE.play();
                }

            }
            break;


        case 'ArrowLeft':
            keyArrowDownLeft = true;
            sprites.enemy.velocity.x = -5;
            lastKeyEnemy = 'ArrowLeft';

            break;
        case 'ArrowRight':
            keyArrowDownRight = true;
            sprites.enemy.velocity.x = 5;
            lastKeyEnemy = 'ArrowRight';

            break;
        case '0': // Enemy jump
            if (sprites.enemy.getJumpCounter() == 0) {

                if (lastKeyEnemy === 'ArrowLeft') {
                    sprites.enemy.velocity.y = -8;
                    sprites.enemy.switchSprite('jump');
                    jumpSE.load();
                    jumpSE.play();
                }
                if (lastKeyEnemy === 'ArrowRight') {
                    sprites.enemy.velocity.y = -8;
                    sprites.enemy.switchSprite('jumpOpposite');
                    jumpSE.load();
                    jumpSE.play();
                }

            }
            break;



    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {

        case 'a':
            isKeyADown = false;
            if (!isKeyDDown) sprites.player.velocity.x = 0;
            break; // Fix missing break

        case 'd':
            isKeyDDown = false;
            if (!isKeyADown) sprites.player.velocity.x = 0;
            break; // Fix missing break

        case ' ':
            if (sprites.player.getJumpCounter() == 0) {
                sprites.player.velocity.y = 0;
            }
            break;

        case 'ArrowLeft':
            keyArrowDownLeft = false;
            if (!keyArrowDownRight) {
                sprites.enemy.velocity.x = 0;

            }
            break;
        case 'ArrowRight':
            keyArrowDownRight = false;
            if (!keyArrowDownLeft) {
                sprites.enemy.velocity.x = 0;

            }
            break;
        case '0': // Reset jump animation
            if (sprites.enemy.getJumpCounter() === 0) {
                sprites.enemy.velocity.y = 0;
            }
            break;
    }
});





// Animation Loop
function animateSprites() {

    window.requestAnimationFrame(animateSprites);

    //CONSTANTLY UPDATE HITBOX POSITION

    if (timer >= 59) {
        //TRIGGER STARTING FALL ANIMATIONS

        if (sprites.enemy.getJumpCounter() == 1 && sprites.enemy.position.y < 450) {
            sprites.enemy.switchSprite('fall');
        }

        else{
            sprites.enemy.switchSprite('idle');
        }

        if (sprites.player.getJumpCounter() == 1 && sprites.player.position.y < 450) {
            sprites.player.switchSprite('fall');
        }
        else{
            sprites.player.switchSprite('idle');
        }
        }


        if (timer <= 10 && !sprites.player.dead && !sprites.enemy.dead) {
            timerElement.style.margin = "35px";
        }

        // Switch to idle animation if no horizontal movement keys are pressed
        if (sprites.player.position.y + sprites.player.height + sprites.player.velocity.y >= canvas.height) {
            if (!isKeyADown && lastKey === 'a' || lastKey == 'aAttack') {
                sprites.player.switchSprite('idleOpposite');
            } else if (!isKeyDDown && lastKey === 'd' || lastKey == 'dAttack') {
                sprites.player.switchSprite('idle');
            } else if (isKeyDDown) {

                sprites.player.switchSprite('run');

            } else if (isKeyADown) {
                sprites.player.switchSprite('runOpposite');
            }


        }
        if (sprites.enemy.position.y + sprites.enemy.height + sprites.enemy.velocity.y >= canvas.height) {
            if (!keyArrowDownLeft && lastKeyEnemy === 'ArrowLeft' || lastKeyEnemy == 'aLeftAttack') {

                sprites.enemy.switchSprite('idle');
            } else if (!keyArrowDownRight && lastKeyEnemy === 'ArrowRight' || lastKeyEnemy == 'aRightAttack') {

                sprites.enemy.switchSprite('idleOpposite');

            } else if (keyArrowDownLeft) {
                sprites.enemy.switchSprite('run');
            } else if (keyArrowDownRight) {
                sprites.enemy.switchSprite('runOpposite');
            }
        }



        // Update the timer countdown

        timer = SERVICE.updateTimer(timer);



        if (timer <= 0 && timer > -1 || sprites.enemy.dead || sprites.player.dead) {
            timer = -1;

            elementGameOver.style.zIndex = '999';
            elementGameOver.style.alignSelf = 'center';
            elementGameOver.style.position = 'absolute';
            elementGameOver.style.marginLeft = '385px';
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

        if (sprites.player.getJumpCounter() == 1 && sprites.player.position.y < 300) {
            if (lastKey === 'd') {
                sprites.player.switchSprite('fall');
            }
            else if (lastKey === 'a') {
                sprites.player.switchSprite('fallOpposite');
            }
        }




        if (sprites.enemy.getJumpCounter() == 1 && sprites.enemy.position.y < 300) {
            if (lastKeyEnemy === 'ArrowLeft') {
                sprites.enemy.switchSprite('fall');
            }
            else if (lastKeyEnemy === 'ArrowRight') {
                sprites.enemy.switchSprite('fallOpposite');
            }
        }

        // End of game cleanup
        if (timer == -1) {
            /*document.querySelector('.timer').remove();
            healthBars.remove();*/
            timer = 0;
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
        sprites.player.update(gravity, sprites.enemy);
        sprites.enemy.update(gravity, sprites.player);





        // Collision detection and enemy Hit
        if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {

            if (SERVICE.decreaseHealth(sprites.player, sprites.enemy, enemyHealthBar, playerHealthBar, lastKey)) {
                getHitSE.load();
                getHitSE.play();

            }

        }




    }

    animateSprites();


    // Declare audio elements for player and enemy attack sounds
    let audioAtkPlayer = document.querySelector('#atkPlayer');
    let audioAtkEnemy = document.querySelector('#atkEnemy');

    // Player attack key 'e' press
    // Declare audio elements for player and enemy attack sounds

    let canAttackPlayer = true; // Attack cooldown flag
    const attackCooldownPlayer = 300; // Cooldown in milliseconds (adjust as needed)

    // Player attack key 'e' press or 'q' press for attack2
    window.addEventListener('keydown', (event) => {
        if (event.key === 'e' && canAttackPlayer) {

            canAttackPlayer = false; // Prevent further attacks until cooldown ends

            if (sprites.player.attack(1, lastKey) == 'd') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKeyEnemy = 'aLeftAttack';
                }
                console.log(lastKey)
            }

            if (sprites.player.attack(1, lastKey) == 'a') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKeyEnemy = 'aRightAttack';
                }
                console.log(lastKey)
            }

            // Play attack sound
            if (audioAtkPlayer) {
                if (!audioAtkPlayer.paused) {
                    audioAtkPlayer.currentTime = 0;
                }
                audioAtkPlayer.play();
            }

            // Re-enable attack after cooldown
            setTimeout(() => {
                canAttackPlayer = true;
            }, attackCooldownPlayer);


        }

        if (event.key === 'q' && canAttackPlayer) {
            canAttackPlayer = false; // Prevent further attacks until cooldown ends

            if (sprites.player.attack(2, lastKey) == 'd') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKeyEnemy = 'aLeftAttack';
                }
                console.log(lastKey)
            }

            if (sprites.player.attack(2, lastKey) == 'a') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKeyEnemy = 'aRightAttack';
                }
                console.log(lastKey)
            }

            // Play attack sound
            if (audioAtkPlayer) {
                if (!audioAtkPlayer.paused) {
                    audioAtkPlayer.currentTime = 0;
                }
                audioAtkPlayer.play();
            }

            // Re-enable attack after cooldown
            setTimeout(() => {
                canAttackPlayer = true;
            }, attackCooldownPlayer);
        }
    });


    let canAttackEnemy = true; // Attack cooldown flag
    const attackCooldownEnemy = 300; // Cooldown in milliseconds

    // Enemy attack key 'Enter' press
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && canAttackEnemy) {
            canAttackEnemy = false;

            // Trigger enemy attack
            if (sprites.enemy.attack(1, lastKeyEnemy) == 'ArrowLeft') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKey = 'dAttack';
                }
                console.log(lastKey)
            }

            if (sprites.enemy.attack(1, lastKeyEnemy) == 'ArrowRight') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKey = 'aAttack';
                }
                console.log(lastKey)
            }



            // Play attack sound if available
            if (audioAtkEnemy) {
                if (!audioAtkEnemy.paused) {
                    audioAtkEnemy.currentTime = 0; // Reset audio to start
                }
                audioAtkEnemy.play();
            }

            // Cooldown reset
            setTimeout(() => {
                canAttackEnemy = true;
            }, attackCooldownEnemy);
        }

        if (event.key === 'Backspace' && canAttackEnemy) {
            canAttackEnemy = false; // Prevent further attacks until cooldown ends

            if (sprites.enemy.attack(2, lastKeyEnemy) == 'ArrowLeft') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKey = 'dAttack';
                }
                console.log(lastKey)
            }

            if (sprites.enemy.attack(2, lastKeyEnemy) == 'ArrowRight') {
                if (SERVICE.hasCollided(sprites.player, sprites.enemy)) {
                    lastKey = 'aAttack';
                }
                console.log(lastKey)
            }

            // Play attack sound
            if (audioAtkEnemy) {
                if (!audioAtkEnemy.paused) {
                    audioAtkEnemy.currentTime = 0; // Reset audio to start
                }
                audioAtkEnemy.play();
            }

            // Cooldown reset
            setTimeout(() => {
                canAttackEnemy = true;
            }, attackCooldownEnemy);
        }

        return lastKey;
    });

    console.log(sprites.player);
    console.log(sprites.enemy);
