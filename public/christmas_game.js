
const CatKey = "f";
const DogKey = "j";
const Dog = document.getElementById("DogPlayer");
const Cat = document.getElementById("CatPlayer");

function catAction() {
    const Cat = document.getElementById("CatPlayer");
    Cat.src = "assets/christmas/cat/swipe.svg"
    setTimeout(() => {
        Cat.src = "assets/christmas/cat/sit_1.svg"
        console.log("revert cat");
      }, 250);
};


function dogAction() {
    const Dog = document.getElementById("DogPlayer");
    Dog.src = "assets/christmas/dog/bite.svg"
    Dog.style.marginBottom = "-195px";
    setTimeout(() => {
        Dog.src = "assets/christmas/dog/sit_1.svg"
        Dog.style.marginBottom = "0px";
        console.log("revert dog");
      }, 250);
};

window.addEventListener('keydown', function(e) {
    if (e.key == CatKey) {
        console.log("cat");
        catAction();
    } else if (e.key == DogKey) {
        console.log("dog");
        dogAction();
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
          if (pos >= screenWidth) {
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

