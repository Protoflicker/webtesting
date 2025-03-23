let playerHP = 500;
let enemyHP = 500;
let playerAccuracy = 50;
let playerCrit = 20;
let enemyAccuracy = 50;
let enemyCrit = 20;

function getRandomChance(percent) {
    return Math.random() * 100 < percent;
}

function attack() {
    let playerStickman = document.getElementById("player-stickman");
    let enemyStickman = document.getElementById("enemy-stickman");

    playerStickman.classList.add("attacking");
    setTimeout(() => playerStickman.classList.remove("attacking"), 300);

    if (getRandomChance(playerCrit)) {
        enemyHP -= 250;
        logAction("Critical hit! 5x damage!");
    } else if (getRandomChance(playerAccuracy)) {
        enemyHP -= 50;
        logAction("Attack hit!");
    } else {
        logAction("Attack missed!");
    }

    enemyStickman.classList.add("damaged");
    setTimeout(() => enemyStickman.classList.remove("damaged"), 300);

    updateStatus();
    enemyTurn();
}

function heal() {
    let healAmount = Math.floor(Math.random() * (100 - 20) + 20);
    playerHP += healAmount;
    logAction(`Healed +${healAmount} HP!`);
    updateStatus();
    enemyTurn();
}

function focusAccuracy() {
    let increase = Math.floor(Math.random() * (25 - 5) + 5);
    playerAccuracy += increase;
    logAction(`Accuracy increased by ${increase}!`);
    updateStatus();
    enemyTurn();
}

function tripleShot() {
    let shots = [false, false, false];
    let hitCount = 0;
    
    shots = shots.map(() => getRandomChance(playerAccuracy));

    hitCount = shots.filter(hit => hit).length;

    if (hitCount > 0) {
        enemyHP -= hitCount * 50;
        logAction(`Triple Shot hit ${hitCount} times!`);
    } else {
        logAction("Triple Shot missed!");
    }

    updateStatus();
    enemyTurn();
}

function stun() {
    if (getRandomChance(50)) {
        logAction("Enemy stunned! You get two extra turns!");
        updateStatus();
        setTimeout(() => playerTurn(), 1000); 
        setTimeout(() => playerTurn(), 2000); 
    } else {
        logAction("Stun failed! Enemy gets two turns.");
        setTimeout(() => enemyTurn(), 1000); 
        setTimeout(() => enemyTurn(), 2000); 
    }
}

function playerTurn() {
    logAction("Your extra turn! Choose an action.");
}

function enemyTurn() {
    setTimeout(() => {
        let enemyStickman = document.getElementById("enemy-stickman");
        let playerStickman = document.getElementById("player-stickman");

        enemyStickman.classList.add("attacking");
        setTimeout(() => enemyStickman.classList.remove("attacking"), 300);

        if (getRandomChance(enemyCrit)) {
            playerHP -= 250;
            logAction("Enemy landed a critical hit!");
        } else if (getRandomChance(enemyAccuracy)) {
            playerHP -= 50;
            logAction("Enemy attack hit!");
        } else {
            logAction("Enemy attack missed!");
        }

        playerStickman.classList.add("damaged");
        setTimeout(() => playerStickman.classList.remove("damaged"), 300);

        updateStatus();
        checkGameOver();
    }, 1000);
}

function updateStatus() {
    document.getElementById("player-hp").innerText = `Player HP: ${playerHP}`;
    document.getElementById("enemy-hp").innerText = `Enemy HP: ${enemyHP}`;
    document.getElementById("player-accuracy").innerText = `Accuracy: ${playerAccuracy}%`;
    document.getElementById("player-crit").innerText = `Crit Chance: ${playerCrit}%`;
}

function checkGameOver() {
    if (playerHP <= 0) {
        alert("Game Over! You Lost.");
        location.reload();
    } else if (enemyHP <= 0) {
        alert("You Win!");
        location.reload();
    }
}

function logAction(action) {
    document.getElementById("log").innerText = action;
}
