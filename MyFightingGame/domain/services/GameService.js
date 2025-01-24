class GameService {

    constructor() {}

    updateTimer(timer) {
        if (timer > 0) {
            timer -= (1 / 60); // Decrease the timer by 1 second every 60 frames
        }
        return timer;
    }

    hasCollided(player, enemy) {
        // Check if the player is behind the enemy (relative to x position)
        const isPlayerBehind = player.position.x > enemy.position.x;

        // Handle back-to-back collisions based on idle and opposite idle sprites
        if(isPlayerBehind && enemy.image == enemy.sprites.idle.image && player.image == player.sprites.idleOpposite.image && !player.isAttacking) {
            return false;
        }

        if(isPlayerBehind && enemy.image == enemy.sprites.idle.image && player.image == player.sprites.idleOpposite.image && player.isAttacking) {
            return true;
        }

        if(isPlayerBehind && enemy.image == enemy.sprites.idleOpposite.image && player.image == player.sprites.idleOpposite.image) {
            return true;
        }

        if(isPlayerBehind && enemy.image == enemy.sprites.idleOpposite.image && player.image == player.sprites.idle.image) {
            return true;
        }


        
        // Check for collision when player is attacking from behind
        if (
            isPlayerBehind && (
                player.image === player.sprites.attack1Opposite.image ||
                player.image === player.sprites.attack2Opposite.image ||
                player.image === player.sprites.idleOpposite.image
            ) && (
                enemy.image === enemy.sprites.idleOpposite.image ||
                enemy.image === enemy.sprites.attack1Opposite.image ||
                enemy.image === enemy.sprites.attack2Opposite.image
            )
        ) {
            console.log('Collision back to back nullified');
            return false;
        }

        // Check if player is attacking and facing the enemy
        if (
            player.position.x < enemy.position.x && (
                player.image === player.sprites.attack1.image ||
                player.image === player.sprites.attack2.image ||
                player.image === player.sprites.idle.image
            ) && (
                enemy.image === enemy.sprites.idleOpposite.image ||
                enemy.image === enemy.sprites.attack1Opposite.image ||
                enemy.image === enemy.sprites.attack2Opposite.image
            ) && player.isAttacking
        ) {
            return true;
        }

        // Check if player is facing away and the enemy is not in attack or idle state
        if (
            (player.image === player.sprites.attack1Opposite.image ||
            player.image === player.sprites.attack2Opposite.image ||
            player.image === player.sprites.idleOpposite.image) && (
                enemy.image === enemy.sprites.idleOpposite.image ||
                enemy.image === enemy.sprites.attack1Opposite.image ||
                enemy.image === enemy.sprites.attack2Opposite.image
            )
        ) {
            console.log('Collision back to back nullified');
            return false;
        }

        // Handle the jump and jumpOpposite states
        if (player.image === player.sprites.jump.image && enemy.image === enemy.sprites.idleOpposite.image) {
            return true;
        }

        if (player.image === player.sprites.jumpOpposite.image && enemy.image === enemy.sprites.idle.image) {
            return true;
        }

        // If the hitboxes overlap, return true
        if (
            player.hitBox.position.x + player.hitBox.width >= enemy.position.x &&
            player.hitBox.position.x <= enemy.position.x + enemy.width &&
            player.hitBox.position.y + player.hitBox.height >= enemy.position.y &&
            player.hitBox.position.y <= enemy.position.y + enemy.height
        ) {
            return true;
        } else {
            return false;
        }
    }

    decreaseHealth(player, enemy, enemyHealthBar, playerHealthBar) {
        // Only decrease health if the player or enemy is attacking and a collision is detected
        if (player.isAttacking && this.hasCollided(player, enemy)) {
            player.isAttacking = false;
            enemy.takeHit(player); // Assuming 'takeHit' properly processes damage
            enemyHealthBar.style.width = `${Math.max(enemy.health, 0)}%`;
            return true;
        }

        if (enemy.isAttacking && this.hasCollided(player, enemy)) {
            enemy.isAttacking = false;
            player.takeHit(enemy); // Assuming 'takeHit' properly processes damage
            playerHealthBar.style.width = `${Math.max(player.health, 0)}%`;
            return true;
        }

        return false;
    }
}

export { GameService };
