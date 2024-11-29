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

window.addEventListener('keydown', function(e) {
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

function overlayOff() {
    document.getElementById("overlay").style.display = "None";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-game-button").addEventListener("click", function() {
        overlayOff();
        startGame();
    });
  });

function startGame() {
    console.log("Game Started")
    conveyorOn();
    var elem = document.getElementById("moving");
    myMove(elem);
    setTimeout(() => {
        dispatchObject()
    }, 150);
}

function conveyorOn() {
    document.getElementById("conveyor-belt").classList.add("conveyor-belt-animation");
}

// TODO: Spawn Elements Logic
// doesn't get faster, just more elements spawned per second

function dispatchObject() {
    let conveyor = document.getElementById("conveyor-belt");
    score = 0;
    while (score < 100) {
    setTimeout(() => {
            // if (score < 25) {
                let obj = spawnObject();
                conveyor.appendChild(obj)
                myMove(obj);
                score = 100;
            // }
            // else if (score < 50) {
        
            // }
            // else if (score < 75) {
        
            // }
            // else {
        
            // }
        }, 200);
        score += 5;
        console.log(score);
    }
}

function spawnObject() {
    // TODO: random cat/dog object logic here
    var obj = document.createElement('div');
    obj.classList.add("element");
    return obj
}

function myMove(elem) {
    const screenWidth = window.screen.width;
    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (pos >= screenWidth - 10) {
        console.log("end of the screen");
        clearInterval(id);
      } else {
        pos = pos + 2;
        elem.style.left = pos + 'px';
      }
    }
  }
