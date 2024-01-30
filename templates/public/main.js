window.onload = function () {
    var b = document.getElementById("versiontoggle");
    if (b != null) {
        b.addEventListener("click", toggler);
    }
}

function toggler() {
    elements = document.getElementsByClassName("toggles");
    for (var i = 0; i < elements.length; i++) {
        var disp = elements[i].style.display
        if (disp == 'none') {
            elements[i].style.display = 'inline';
        } else {
            elements[i].style.display = 'none';
        }
    
    }
}
