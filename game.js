let player = {
    hp: 500,
    dmg: 50,
    accuracy: 50,
    crit: 20
};

let enemy = {
    hp: 500,
    dmg: 50,
    accuracy: 50,
    crit: 10
};

let playerTurn = true;
let enemyStun = 0;
let playerStun = 0;

function logMessage(message) {
    document.getElementById("log").innerHTML += `<p>${message}</p>`;
}

function updateStats() {
    document.getElementById("player-hp").textContent = player.hp;
    document.getElementById("player-accuracy").textContent = player.accuracy;
    document.getElementById("player-crit").textContent = player.crit;
    document.getElementById("enemy-hp").textContent = enemy.hp;
}

function getRandomChance(percent) {
    return Math.random() * 100 < percent;
}

function attack() {
    if (!playerTurn) return;
    
    let hit = getRandomChance(player.accuracy);
    let crit = getRandomChance(player.crit);

    if (crit) {
        enemy.hp -= player.dmg * 5;
        logMessage("Critical hit! 5x damage!");
    } else if (hit) {
        enemy.hp -= player.dmg;
        logMessage("Attack hit!");
    } else {
        logMessage("Attack missed!");
    }

    endTurn();
}

function heal() {
    if (!playerTurn) return;

    let increase = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    player.hp += increase;
    logMessage(`Healed +${increase} HP`);

    endTurn();
}

function focus() {
    if (!playerTurn) return;

    let increase = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
    player.accuracy += increase;
    logMessage(`Accuracy increased by +${increase}`);

    endTurn();
}

function tripleShot() {
    if (!playerTurn) return;

    let hits = 0;
    for (let i = 0; i < 3; i++) {
        if (getRandomChance(player.accuracy)) hits++;
    }

    enemy.hp -= player.dmg * hits;
    logMessage(`Triple Shot: ${hits} shots hit`);

    endTurn();
}

function stun() {
    if (!playerTurn) return;

    if (getRandomChance(50)) {
        logMessage("Stun Success! Enemy skips 2 turns");
        enemyStun = 2;
    } else {
        logMessage("Stun Failed! You skip 2 turns");
        playerStun = 2;
    }

    endTurn();
}

function enemyTurn() {
    if (enemy.hp <= 0) {
        logMessage("Enemy defeated! You win!");
        return;
    }

    if (enemyStun > 0) {
        logMessage("Enemy is stunned! Turn skipped.");
        enemyStun--;
        playerTurn = true;
        return;
    }

    let actions = ["attack", "heal", "focus", "tripleShot"];
    let action = actions[Math.floor(Math.random() * actions.length)];

    if (action === "attack") {
        let hit = getRandomChance(enemy.accuracy);
        let crit = getRandomChance(enemy.crit);

        if (crit) {
            player.hp -= enemy.dmg * 5;
            logMessage("Enemy Critical Hit! 5x damage!");
        } else if (hit) {
            player.hp -= enemy.dmg;
            logMessage("Enemy Attack Hit!");
        } else {
            logMessage("Enemy Attack Missed!");
        }
    } else if (action === "heal") {
        let increase = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
        enemy.hp += increase;
        logMessage(`Enemy Healed +${increase} HP`);
    } else if (action === "focus") {
        let increase = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
        enemy.accuracy += increase;
        logMessage(`Enemy Accuracy increased by +${increase}`);
    } else if (action === "tripleShot") {
        let hits = 0;
        for (let i = 0; i < 3; i++) {
            if (getRandomChance(enemy.accuracy)) hits++;
        }

        player.hp -= enemy.dmg * hits;
        logMessage(`Enemy Triple Shot: ${hits} shots hit`);
    }

    playerTurn = true;
    updateStats();

    if (player.hp <= 0) {
        logMessage("You have been defeated!");
    }
}

function endTurn() {
    updateStats();
    playerTurn = false;

    if (enemy.hp <= 0) {
        logMessage("Enemy defeated! You win!");
        return;
    }

    setTimeout(() => {
        enemyTurn();
    }, 1000);
}

updateStats();
