class GameService {


    constructor() {

    }

    updateTimer(timer) {
        if (timer > 0) {
            timer -= (1 / 60); // Decrease the timer by 1 second every 60 frames
        }
    }

    hasCollided(player,enemy){
        if(player.hitBox.position.x +player.hitBox.width >= enemy.position.x
            && player.hitBox.position.x <= enemy.position.x + enemy.width &&
            player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
            player.hitBox.position.y <= enemy.position.y + enemy.height){
                return true;
        } else{
            return false;
        }
    }

    decreaseHealth(player,enemy,enemyHealthBar,playerHealthBar){
        if (player.isAttacking) {
            player.isAttacking = false;
            enemy.takeHit();
            enemyHealthBar.style.width = enemy.health + "%";

        }
    
        if (enemy.isAttacking) {
            enemy.isAttacking = false;
            player.takeHit();
            playerHealthBar.style.width = player.health + "%";
        }
    }
}


export { GameService };