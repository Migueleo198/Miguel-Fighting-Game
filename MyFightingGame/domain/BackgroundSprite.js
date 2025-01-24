const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

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

export { BackgroundSprite };
