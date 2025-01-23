const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


class Sprite {


    constructor({ position, velocity, imageSrc, scale = 1, framesMax, offset, sprites,type }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 70;
        this.height = 150;
        this.jumpCounter = 0;
        this.positionHitBox = {
            position:{
                x:this.position.x+100,
                y:this.position.y
            }

        }
        this.hitBox = {
            position: this.positionHitBox,
            width: 300,
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
        if (this.dead) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return; // Stop further updates if the player is dead
        }
    
        this.framesElapsed++;
    
        if (this.image == this.sprites.death.image && this.type === 'enemy') {
            this.keep = true;
            console.log('should be ded');
            if (this.framesCurrent == 0 && this.framesCurrent != 6) {
                this.framesCurrent = 6;
            }
            if (this.framesElapsed % this.framesHold == 0) {
                if (this.framesCurrent >= 0) {
                    this.framesCurrent--;
                }
                if (this.framesCurrent <= 1) {
                    this.enemyDeadFrameConfirmed = true;
                    
                    this.dead=true;
                }
            }
        } else if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
                
            }
        }
    
        // Apply movement if not dead
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    
        // Update hitbox
        this.hitBox.position.x = this.position.x - 110;
        this.hitBox.position.y = this.position.y;
    
        // Gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.position.y = 425.76;
            this.jumpCounter = 0;
        } else {
            this.jumpCounter = 1;
            this.velocity.y += gravity;
        }
    }
    

    getJumpCounter() {
        console.log(this.jumpCounter);
        return this.jumpCounter;
    }

    attack(index,lastKey) {
        if(this.type=='player'){
        if(lastKey=='d'){
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
    else if(lastKey=='a'){
        if(index==1 ){
            this.switchSprite('attack1Opposite');
            }
            else{
             this.switchSprite('attack2Opposite');
            }
            this.isAttacking = true;
            setTimeout(() => {
                this.switchSprite('idleOpposite');
                this.isAttacking = false;
            }, 250);
    }
    else{
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
    }
    else if(this.type==='enemy'){
        if(lastKey=='ArrowLeft'){
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
        else if(lastKey=='ArrowRight'){
            if(index==1 ){
                this.switchSprite('attack1Opposite');
                }
                else{
                 this.switchSprite('attack2Opposite');
                }
                this.isAttacking = true;
                setTimeout(() => {
                    this.switchSprite('idleOpposite');
                    this.isAttacking = false;
                }, 250);
        }
        else{
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
    }
    }


    switchSprite(sprite) {

        //OVERRIDING ALL OTHER ANIMATIONS WITH THE ATTACK ANIMATION
        if(this.image == this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax-1){ return }
       
        //ALSO WITH ATTACK ANIMATION 2
        if(this.image == this.sprites.attack2.image && this.framesCurrent < this.sprites.attack2.framesMax-1){ return }

        //OPPOSITE ATTACKS 1 AND 2

        if(this.image == this.sprites.attack1Opposite.image && this.framesCurrent < this.sprites.attack1Opposite.framesMax-1){ return }
       
       
        if(this.image == this.sprites.attack2Opposite.image && this.framesCurrent < this.sprites.attack2Opposite.framesMax-1){ return }

        //OVERRIDE WHEN FIGHTER GETS HIT
        if(this.image == this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax-1){ return }
       
       //OVERRIDE WHEN FIGHTER DIES

       if(this.image == this.sprites.death.image && this.framesCurrent < this.sprites.death.framesMax-1){ return }
       
       if(this.image == this.sprites.jump.image && this.framesCurrent < this.sprites.jump.framesMax-1){ return }
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

            case 'idleOpposite': if (this.image != this.sprites.idleOpposite.image) {
                this.image = this.sprites.idleOpposite.image; this.framesMax = this.sprites.idleOpposite.framesMax; this.framesCurrent=0;
            } break;
            case 'runOpposite': if (this.image != this.sprites.runOpposite.image ) {
                this.image = this.sprites.runOpposite.image; this.framesMax = this.sprites.runOpposite.framesMax; this.framesCurrent=0;
            } break;
            case 'jumpOpposite': if (this.image != this.sprites.jumpOpposite.image || this.image!= this.sprites.runOpposite.image && this.position.y + this.height + this.velocity.y <= canvas.height) {
                this.image = this.sprites.jumpOpposite.image;
                this.framesMax = this.sprites.jumpOpposite.framesMax;
                this.framesCurrent=0;
            } break;
            case 'attack1Opposite':  if (this.image != this.sprites.attack1Opposite.image){
                this.image = this.sprites.attack1Opposite.image;
                this.framesMax = this.sprites.attack1Opposite.framesMax;
                this.framesCurrent=0;
            }break;
            case 'attack2Opposite':  if (this.image != this.sprites.attack2Opposite.image){
                this.image = this.sprites.attack2Opposite.image;
                this.framesMax = this.sprites.attack2Opposite.framesMax;
                this.framesCurrent=0;
            }break;
            case 'takeHitOpposite' : if(this.image != this.sprites.takeHitOpposite.image){
                this.image = this.sprites.takeHitOpposite.image;
                this.framesMax = this.sprites.takeHitOpposite.framesMax;
                this.framesCurrent=0;
            }break;
            case 'fallOpposite': if(this.image != this.sprites.fallOpposite.image){
                this.image = this.sprites.fallOpposite.image;
                this.framesMax = this.sprites.fallOpposite.framesMax;
                this.framesCurrent=0;
            }break;
        }
    }

    takeHit(){
        
        this.health-=10;
       console.log(this.type+" health: " +this.health);
        if(this.health<=0){
            console.log("sprite switched");
            console.log('dead?');
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