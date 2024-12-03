//
//  ___                    _      _     _      _  _           ___                  _                     _    
// / _ \   _  _   __ _    | |    (_)   | |_   | || |   o O O / __|   ___   _ _    | |_     _ _   ___    | |   
//| (_) | | +| | / _` |   | |    | |   |  _|   \_, |  o     | (__   / _ \ | ' \   |  _|   | '_| / _ \   | |   
// \__\_\  \_,_| \__,_|  _|_|_  _|_|_  _\__|  _|__/  TS__[O] \___|  \___/ |_||_|  _\__|  _|_|_  \___/  _|_|_  
// _|"""""_|"""""_|"""""_|"""""_|"""""_|"""""_| """"|{======_|"""""_|"""""_|"""""_|"""""_|"""""_|"""""_|"""""| 
// "`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-./o--000"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-' 
//
// A Christmas Game by Natasha Mitchko (2024)

console.log(`
Welcome to my website! What are you doing over here in the dev tools? You'd better not be cheating!

But if you want to check out the code I wrote for this amazing christmas game run the following function in the console:

seeCodeOnGithub();

or maybe you're looking for a recipe? Try:

natashasCookbook();
`);

function seeCodeOnGithub() {
    window.open("https://github.com/NatashaMitchko/Firebase-site/blob/master/public/christmas_game.js", '_blank').focus();
}

function natashasCookbook() {
    window.open("http://cookbook.natashamitchko.com", '_blank').focus();
}

let ornament = "ornament";
let bone = "bone";

function catAction(catEl) {
    const swipe = document.getElementById('cat-swipe').content.cloneNode(true);
    catEl.replaceChildren(swipe);
    setTimeout(() => {
        catEl.dataset.state = "inactive";
        const sit = document.getElementById('cat-sit').content.cloneNode(true);
        catEl.replaceChildren(sit);
    }, 100)
}

function dogAction(dogEl) {
    const bite = document.getElementById('dog-bite').content.cloneNode(true);
    dogEl.replaceChildren(bite);
    setTimeout(() => {
        dogEl.dataset.state = "inactive";
        const sit = document.getElementById('dog-sit').content.cloneNode(true);
        dogEl.replaceChildren(sit);
    }, 150);
}

window.addEventListener('keydown', function (e) {
    const CatKey = "f";
    const DogKey = "j";
    const catEl = document.getElementById('cat-friend');
    const dogEl = document.getElementById('dog-friend');

    if (e.key == CatKey && catEl.dataset.state === 'inactive') {
        catEl.dataset.state = "active";
        catAction(catEl);
    } else if (e.key == DogKey && dogEl.dataset.state === 'inactive') {
        dogEl.dataset.state = "active";
        dogAction(dogEl);
    }
});


// Game Initialization

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-game-button").addEventListener("click", function () {
        startGame();
    });
});

function startGame() {
    // Initialization
    console.log("Game Started");

    overlayOff();
    showScoreCard();
    conveyorOn();

    // Game Loop
    window.requestAnimationFrame(gameLoop);
}

function overlayOff() {
    document.getElementById("overlay").style.display = "None";
}

function showScoreCard() {
    document.getElementById("score-card").style.display = "block";
}

function conveyorOn() {
    document.getElementById("conveyor-belt").classList.add("conveyor-belt-animation");
}

function conveyorOff() {
    document.getElementById("conveyor-belt").classList.remove("conveyor-belt-animation");
}

function showWinnerScreen(finalScore) {
    document.getElementById("final-score").textContent = finalScore;
    document.getElementById("winner-screen").classList.remove("hide-winner-screen");
}

class GameObject {
    ornamentTemplate = document.getElementById("ornament");
    ornamentBroken = document.getElementById("ornament-broken");
    boneTemplate = document.getElementById("bone");
    boneEaten = document.getElementById("bone-eaten");

    constructor(type) {
        this.playable = true;
        this.score = 0; // 0 or 1 - score is adjusted by level in main game loop update

        var obj = document.createElement('div');
        this.type = type;

        if (this.type == ornament) {
            this.animal_friend = document.getElementById('cat-friend');
            obj.classList.add(ornament);
            obj.appendChild(this.ornamentTemplate.content.cloneNode(true));

            let rect = this.animal_friend.getBoundingClientRect();
            this.playableRangeLeft = rect.left;
            this.playableRangeRight = rect.right;
        }
        else if (this.type == bone) {
            this.animal_friend = document.getElementById('dog-friend');
            obj.appendChild(this.boneTemplate.content.cloneNode(true));
            obj.classList.add(bone);

            let rect = this.animal_friend.getBoundingClientRect();
            this.playableRangeLeft = rect.left;
            this.playableRangeRight = rect.right;
        }

        this.DOMelem = obj;

        this.inBounds = true;
        this.posX = 0;


        this.createDOMelement();
    }

    createDOMelement() {
        let conveyor = document.getElementById("conveyor-belt");
        conveyor.appendChild(this.DOMelem);
    }

    changeSVG() {
        if (this.type == ornament) {
            const newSVG = this.ornamentBroken.content.cloneNode(true);
            this.DOMelem.replaceChildren(newSVG);
        }
        else if (this.type == bone) {
            const newSVG = this.boneEaten.content.cloneNode(true);
            this.DOMelem.classList.add("half-bone");
            this.DOMelem.replaceChildren(newSVG);
        }
    }

    update() {
        let width = window.screen.width;
        // when we reach the end, remove the element from the DOM and set inBounds to false so Game.update()
        // can read it and remove this obejct from active objects on the next loop
        if (this.posX >= width) {
            this.DOMelem.remove();
            this.inBounds = false;
        }
        // if the obejct is playable and in the playable range, check if it's animal friend got it
        else if (this.playable == true &&
            this.posX >= this.playableRangeLeft && this.posX <= this.playableRangeRight &&
            this.animal_friend.dataset.state == "active"
        ) {
            this.changeSVG();
            this.playable = false;
            this.score = 1;
        }

        // always move forward even if there isnt an element to move forward
        this.posX += 2; // TODO: fix this calculation
        this.DOMelem.style.left = this.posX + 'px';
    }
}

function spawnObject() {
    let type;
    var choice = Math.random()
    if (choice < .5) {
        type = ornament;
    } else {
        type = bone;
    }

    const obj = new GameObject(type)
    return obj
}

class Game {
    score = 0;
    level = 1;
    frameCounter = 0;

    activeObjects = [];

    update() {
        this.frameCounter += 1;

        for (let i = 0; i < this.activeObjects.length; i++) {
            let scoreToAdd = this.level * this.activeObjects[i].score;
            if (scoreToAdd != 0) {
                this.score = this.score + (this.level * this.activeObjects[i].score);
                document.getElementById("score").textContent = this.score;
            }
            this.activeObjects[i].score = 0; // only count score once

            this.activeObjects[i].update();

            if (!this.activeObjects[i].inBounds) {
                this.activeObjects[i] = null;
            }
        }

        // remove game pieces at the end of the screen
        this.activeObjects = this.activeObjects.filter((obj) => obj !== null);

        let speed;
        if (this.score <= 10) {
            speed = fps * 3;
            this.level = 1;
        }
        else if (this.score <= 25) {
            speed = fps * 2;
            this.level = 2;
        }
        else if (this.score <= 50) {
            speed = fps;
            this.level = 3;
        }
        else if (this.score <= 75) {
            speed = Math.round(fps * 0.8);
            this.level = 4;
        }
        else {
            speed = fps * .4;
            this.level = 5;
        }



        // figure out if we should add a new object
        if (this.frameCounter >= speed) {
            this.activeObjects.push(spawnObject());
            this.frameCounter = 0;
        }
    }
}

// Game object initialization
const qualityControlChristmasGame = new Game();

let secondsPassed;
let prevTimeStamp;
let fps;

function gameLoop(timestamp) {
    secondsPassed = (timestamp - prevTimeStamp) / 1000;
    prevTimeStamp = timestamp;
    fps = Math.round(1 / secondsPassed);

    qualityControlChristmasGame.update();
    let score  = document.getElementById("score").textContent;

    if (score >= 200) {
        conveyorOff();
        showWinnerScreen(qualityControlChristmasGame.score);
    } else {
        window.requestAnimationFrame(gameLoop);
    }
}