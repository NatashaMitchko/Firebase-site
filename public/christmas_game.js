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


window.addEventListener('load', function() {
    
    const screenWidth = window.screen.width;

    function myMove() {
        let id = null;
        const elem = document.getElementById("moving");
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

      myMove();
  });

