let map = L.map('map').setView([53.430127, 14.564802], 18);
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById("latitude").innerText = lat;
        document.getElementById("longitude").innerText = lon;
        map.setView([lat, lon]);
        let marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup("<strong>Hello!</strong><br>This is your location.");
    }, positionError => {
        console.error(positionError);
    });
});

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        // here we have the canvas

        const puzzles = [];
        for (let index = 1; index <= 16; index++) {
            let element = document.getElementById(`puzzle-${index}`);
            puzzles.push(element);
        }
        puzzles.sort((a,b) => 0.5 - Math.random());

        for (let outerIndex = 0; outerIndex < 4; outerIndex++) {
            for (let innerIndex = 0; innerIndex < 4; innerIndex++) {
                let index = 4 * outerIndex + innerIndex;
                let newCanvas = document.createElement("canvas");
                puzzles[index].innerHTML = '';
                puzzles[index].setAttribute("data-match", index + 1)
                puzzles[index].appendChild(newCanvas);

                let newCanvasContex = newCanvas.getContext("2d");

                newCanvasContex.drawImage(canvas, innerIndex * 150, outerIndex * 75, 150, 75, 0, 0, 150, 75)
            }
        }
    });
});

let items = document.querySelectorAll('.puzzle');
for (let item of items) {
    item.addEventListener("dragstart", function(event) {
        this.style.border = "5px dashed #D8D8FF";
        event.dataTransfer.setData("text", this.id);
    });

    item.addEventListener("dragend", function(event) {
        this.style.borderWidth = "0";
    });
}

let targets = document.querySelectorAll(".drag-target");
for (let target of targets) {
    target.addEventListener("dragenter", function (event) {
        this.style.border = "2px solid #7FE9D9";
    });
    target.addEventListener("dragleave", function (event) {
        this.style.border = "2px dashed #7f7fe9";
    });
    target.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    target.addEventListener("drop", function (event) {
        let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
        this.appendChild(myElement)
        this.style.border = "2px dashed #7f7fe9";

        let gameWon = false;
        for (let item of items) {
            //debugger
            let puzzleIndex = item.getAttribute("data-match");
            let puzzleGridIndex = item.parentElement.getAttribute("data-match");
            if (puzzleIndex === null || puzzleGridIndex === null || puzzleIndex !== puzzleGridIndex) {
                gameWon = false;
                break;
            }
            gameWon = true;
        }
        if (gameWon) {
            console.log("Brawo!")
            notifyMe();
        }
    }, false);
}

function notifyMe() {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("Bravo!");
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Bravo!");
                // …
            }
        });
    }
}