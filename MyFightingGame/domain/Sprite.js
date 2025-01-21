const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


class Sprite {


    constructor({ position, velocity, imageSrc, scale = 1, framesMax, offset, sprites,type }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 70;
        this.height = 150;
        this.jumpCounter = 0;
        this.hitBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.isAttacking;
        this.health = 100;
        this.dead = false;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesMax = framesMax;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.enemyDeadFrameConfirmed=false;
        this.framesCurrent = 0;
        this.scale = scale;
        this.offset = offset;
        this.sprites = sprites;
        this.type=type;
        this.off=false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imgSrc;
        }

        console.log(this.sprites);
    }


    drawPlayer() {
       
            c.fillStyle = 'blue';
            c.font = `30px Verdana`;
            c.fillText("Player 1", this.position.x - 40, this.position.y + 20, 70);

            c.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax), 0,
                this.image.width / this.framesMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale);

        
        if (this.isAttacking) {
            c.fillStyle = 'blue';


            c.fillText("Attack!", this.hitBox.position.x + 20, this.hitBox.position.y - 50, this.hitBox.width, this.hitBox.height);
            c.fillStyle = 'rgba(225,225,225,0)';
            let attackRect = c.fillRect(this.hitBox.position.x + 30, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);

        }
    }

    drawEnemy() {
       
            c.fillStyle = 'red';
            c.font = `30px Verdana`;
            c.fillText("Player 2", this.position.x - 40, this.position.y + 20, 70);
            c.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax), 0,
                this.image.width / this.framesMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale);
            if (this.isAttacking) {
                c.fillStyle = 'red';
                c.fillText("Attack!", this.hitBox.position.x - 35, this.hitBox.position.y - 50, this.hitBox.width, this.hitBox.height);
                c.fillStyle = 'rgba(225,225,225,0)';
                let attackRectEnemy = c.fillRect(this.hitBox.position.x + 30, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);

            }
    }



    update(gravity) {

        this.framesElapsed++;

        


        if(this.image == this.sprites.death.image && this.type==='enemy' || this.keep==true && this.image == this.sprites.death.image && this.type==='enemy'){
            this.keep=true;
            console.log("supposedly dead");
            console.log("framesCurrent:" + this.framesCurrent);
            if(this.framesCurrent==0 &&  this.framesCurrent!=6){
              this.framesCurrent=6;
              console.log("framesCurrentAfter switch:" + this.framesCurrent)
              console.log(this.framesHold);
              console.log(this.framesElapsed);
              }
              if (this.framesElapsed % this.framesHold == 0) {
                console.log("works?");
                if (this.framesCurrent >= 0) {
                    console.log("decrement works");
                    this.framesCurrent--;
                    
                }

                if(this.framesCurrent <=1){
                   
                    this.enemyDeadFrameConfirmed=true
                }
                
        
              } 
          
        }
       
        else if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    

       

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
           
            
            this.position.y = 425.76000000000016;
            
            this.jumpCounter = 0;
          

        }
        else {
           console.log(this.position.y);
           
            this.jumpCounter = 1;
          
            this.velocity.y += gravity;
          
        }


        //update Sprite anim

      

    }

    getJumpCounter() {
        console.log(this.jumpCounter);
        return this.jumpCounter;
    }

    attack(index) {
        if(index==1){
        this.switchSprite('attack1');
        }
        else{
         this.switchSprite('attack2');
        }
        this.isAttacking = true;
        setTimeout(() => {
            this.switchSprite('idle');
            this.isAttacking = false;
        }, 250);
    }


    switchSprite(sprite) {

        //OVERRIDING ALL OTHER ANIMATIONS WITH THE ATTACK ANIMATION
        if(this.image == this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax-1){ return }
       
        //ALSO WITH ATTACK ANIMATION 2
        if(this.image == this.sprites.attack2.image && this.framesCurrent < this.sprites.attack2.framesMax-1){ return }


        //OVERRIDE WHEN FIGHTER GETS HIT
        if(this.image == this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax-1){ return }
       
       //OVERRIDE WHEN FIGHTER DIES

       if(this.image == this.sprites.death.image && this.framesCurrent < this.sprites.death.framesMax-1){ return }
        //enemy
        if(this.image == this.sprites.death.image && this.type=='enemy') { return };

        switch (sprite) {
            case 'idle': if (this.image != this.sprites.idle.image) {
                this.image = this.sprites.idle.image; this.framesMax = this.sprites.idle.framesMax; this.framesCurrent=0;
            } break;
            case 'run': if (this.image != this.sprites.run.image ) {
                this.image = this.sprites.run.image; this.framesMax = this.sprites.run.framesMax; this.framesCurrent=0;
            } break;
            case 'jump': if (this.image != this.sprites.jump.image || this.image!= this.sprites.run.image && this.position.y + this.height + this.velocity.y <= canvas.height) {
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesCurrent=0;
            } break;
            case 'attack1':  if (this.image != this.sprites.attack1.image){
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.framesCurrent=0;
            }break;
            case 'attack2':  if (this.image != this.sprites.attack2.image){
                this.image = this.sprites.attack2.image;
                this.framesMax = this.sprites.attack2.framesMax;
                this.framesCurrent=0;
            }break;
            case 'takeHit' : if(this.image != this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image;
                this.framesMax = this.sprites.takeHit.framesMax;
                this.framesCurrent=0;
            }break;
            case 'death' : if(this.image != this.sprites.death.image){
                this.image = this.sprites.death.image;
                this.framesMax = this.sprites.death.framesMax;
                this.framesCurrent=0;
            }break;
            case 'fall': if(this.image != this.sprites.fall.image){
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.framesCurrent=0;
            }break;
        }
    }

    takeHit(){
        
        this.health-=10;
       console.log(this.type+" health: " +this.health);
        if(this.health<=0){
            console.log("sprite switched");
            this.switchSprite('death');
        }else{
            this.switchSprite('takeHit');
            
        }
        
    }
    
}

class BackgroundSprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.width = 1024;
        this.height = 576;
        this.image = new Image(this.width, this.height);
        this.image.src = imageSrc;


    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

       

    }

   
}




export { Sprite, BackgroundSprite };