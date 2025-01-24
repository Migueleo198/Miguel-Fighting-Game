import { Sprite } from '../domain/Sprite.js';



class SpriteFunctions {
    constructor() {

    }


    loadPlayer(x, y) {

        this.player = new Sprite({
            position: {
                x: x,
                y: y
            },
            velocity: {
                x: 0,
                y: 0
            },
            imageSrc : '../assets/Martial Hero 2/Sprites/Idle.png',
            scale: 2.1,
            framesMax: 4,
            offset:{
                x:215,
                y:120
            },
            sprites:{
                //RIGHT ANIMATIONS
                idle:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Idle.png',
                    framesMax:4
                },
                run:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Run.png',
                    framesMax:8
                },
                jump:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Jump.png',
                    framesMax:2
                },
                attack1:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack1.png',
                    framesMax:4
                },
                 takeHit:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Take hit.png',
                    framesMax:3
                },
                death:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Death.png',
                    framesMax:7
                },
                fall:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Fall.png',
                    framesMax:2
                },
                attack2:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack2.png',
                    framesMax:4
                },
                //LEFT ANIMATIONS
                idleOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Idle2.png',
                    framesMax:4
                },
                runOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/RunEnemy.png',
                    framesMax:8
                },
                jumpOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/JumpEnemy.png',
                    framesMax:2
                },
                attack1Opposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack1Enemy.png',
                    framesMax:4
                },
                takeHitOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Take hit Enemy.png',
                    framesMax:3

                },
                fallOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/FallLeft.png',
                    framesMax:2
                },
                deathOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/DeathLeft.png',
                    framesMax:7
                },
                attack2Opposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack2Left.png',
                    framesMax:4
                }
            },
            type:'player',
            hitBox: {
                offset:{
                    x:0,
                    y:0
                },
                width:100,
                height:50
            }
           
           
        });

        

    }

    loadEnemy(x, y) {

        this.enemy = new Sprite({
            position: {
                x: x,
                y: y
            },
            velocity: {
                x: 0,
                y: 0
            },
            imageSrc : '../assets/Martial Hero 2/Sprites/Idle2.png',
            scale:2.1,
            framesMax:4,
            offset:{
                x:215,
                y:120
            },
            sprites:{
                idle:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Idle2.png',
                    framesMax:4
                },
                run:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/RunEnemy.png',
                    framesMax:8
                },
                jump:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/JumpEnemy.png',
                    framesMax:2
                },
                attack1:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack1Enemy.png',
                    framesMax:4
                },
                takeHit:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Take hit Enemy.png',
                    framesMax:3

                },
                death:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/DeathLeft.png',
                    framesMax:7
                },
                fall:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/FallLeft.png',
                    framesMax:2
                },
                attack2:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack2Left.png',
                    framesMax:4
                },

                //RIGHT ANIMATIONS

                idleOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Idle.png',
                    framesMax:4
                },
                runOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Run.png',
                    framesMax:8
                },
                jumpOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Jump.png',
                    framesMax:2
                },
                attack1Opposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack1.png',
                    framesMax:4
                },
                takeHitOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Take hit.png',
                    framesMax:3

                },
                fallOpposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Fall.png',
                    framesMax:2
                },
                deathOpposite: {
                    imgSrc:'../assets/Martial Hero 2/Sprites/Death.png',
                    framesMax:7
                },
                attack2Opposite:{
                    imgSrc:'../assets/Martial Hero 2/Sprites/Attack2.png',
                    framesMax:4
                }

            },
            type:'enemy',
            hitBox: {
                offset:{
                    x:0,
                    y:0
                },
                width:100,
                height:50
            }
        });

       

    }

    


}







export { SpriteFunctions };