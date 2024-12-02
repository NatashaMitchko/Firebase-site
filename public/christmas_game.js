//
//  ___                    _      _     _      _  _           ___                  _                     _    
// / _ \   _  _   __ _    | |    (_)   | |_   | || |   o O O / __|   ___   _ _    | |_     _ _   ___    | |   
//| (_) | | +| | / _` |   | |    | |   |  _|   \_, |  o     | (__   / _ \ | ' \   |  _|   | '_| / _ \   | |   
// \__\_\  \_,_| \__,_|  _|_|_  _|_|_  _\__|  _|__/  TS__[O] \___|  \___/ |_||_|  _\__|  _|_|_  \___/  _|_|_  
// _|"""""_|"""""_|"""""_|"""""_|"""""_|"""""_| """"|{======_|"""""_|"""""_|"""""_|"""""_|"""""_|"""""_|"""""| 
// "`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-./o--000"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-"`-0-0-' 
//
// A Christmas Game by Natasha Mitchko (2024)

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
    conveyorOn();

    // Game Loop
    window.requestAnimationFrame(gameLoop);
}

function overlayOff() {
    document.getElementById("overlay").style.display = "None";
}

function conveyorOn() {
    document.getElementById("conveyor-belt").classList.add("conveyor-belt-animation");
}

// TODO: use this when game is over
function conveyorOff() {
    document.getElementById("conveyor-belt").classList.remove("conveyor-belt-animation");
}

class GameObject {
    constructor(type) {
        this.playable = true;
        this.score = 0; // 0 or 1 - score is adjusted by level in main game loop update

        var obj = document.createElement('div');
        obj.classList.add("element");
        obj.classList.add(type); // styling

        this.DOMelem = obj;
        this.type = type;

        this.inBounds = true;
        this.posX = 0; // don't know Y yet because of height of svg situation

        if (this.type == ornament) {
            this.animal_friend = document.getElementById('cat-friend');
            // calculate playable range
            this.playableRangeLeft = 0;
            this.playableRangeRight = 0;
        }
        else if (this.type == "bone") {
            this.animal_friend = document.getElementById('dog-friend');
            // calculate playable range
            this.playableRangeLeft = 0;
            this.playableRangeRight = 0;
        }
        this.createDOMelement();
    }

    createDOMelement() {
        let conveyor = document.getElementById("conveyor-belt");
        conveyor.appendChild(this.DOMelem);
    }

    update() {
        let width = window.screen.width;
        // when we reach the end, remove the element from the DOM and set inBounds to false so Game.update()
        // can read it and remove this obejct from active objects on the next loop
        if (this.posX >= width) {
            this.DOMelem.remove();
            console.log("removed at end of screen");
            this.inBounds = false;
        }
        // if the obejct is playable and in the playable range, check if it's animal friend got it
        else if (this.playable == true &&
            this.posX >= this.playableRangeLeft && this.posX <= this.playableRangeRight &&
            this.animal_friend.dataset.state == "active"
        ) {
            // change svg!
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
            this.score += (this.level * this.activeObjects[i].score);
            this.activeObjects[i].score = 0; // only count score once

            this.activeObjects[i].update();

            if (!this.activeObjects[i].inBounds) {
                this.activeObjects[i] = null;
            }
        }

        // remove game pieces at the end of the screen
        this.activeObjects = this.activeObjects.filter((obj) => obj !== null);


        // figure out if we should add a new object
        if (this.frameCounter >= fps) { // this calculation could be more sophisticated
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
    window.requestAnimationFrame(gameLoop);
}