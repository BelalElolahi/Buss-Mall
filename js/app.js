'use strict';

let ArrayOfImages = [
    "bag.jpg",
    "banana.jpg",
    "bathroom.jpg",
    "boots.jpg",
    "breakfast.jpg",
    "chair.jpg",
    "bubblegum.jpg",
    "cthulhu.jpg",
    "dog-duck.jpg",
    "dragon.jpg",
    "pen.jpg",
    "pet-sweep.jpg",
    "scissors.jpg",
    "shark.jpg",
    "sweep.png",
    "tauntaun.jpg",
    "unicorn.jpg",
    "water-can.jpg",
    "wine-glass.jpg"
];

let nuberOfRounds = 25;
let counter = 0;

let mainEle = document.querySelector('main');
let buttonEle = document.createElement('button');
let ulEle = document.createElement('ul');
let sectionElement = document.getElementById('imgSection');
let imgElement1 = document.getElementById('img1');
let imgElement2 = document.getElementById('img2');
let imgElement3 = document.getElementById('img3');

let allBusMallObjects = [];
function BusMallImg(name, imgPath) {
    this.name = name,
        this.image = imgPath,
        this.numberofClicks = 0,
        this.numberOfSeen = 0,
        allBusMallObjects.push(this)

}

BusMallImg.allBusMallObjects = [];







//Initilizing Objects
for (let i = 0; i < ArrayOfImages.length; i++) {
    new BusMallImg(ArrayOfImages[i].split('.')[0]
        , ArrayOfImages[i]);

}


let Image1 = 0;
let Image2 = 0;
let Image3 = 0;
function render() {

    Image1 = getRandomNumber(0, ArrayOfImages.length - 1);
    Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
    Image3 = getRandomNumber(0, ArrayOfImages.length - 1);

    while (Image1 == Image2 || Image1 == Image3 || Image2 == Image3) {
        Image1 = getRandomNumber(0, ArrayOfImages.length - 1);
        Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
        Image3 = getRandomNumber(0, ArrayOfImages.length - 1);
    }
    imgElement1.src = "assets/img/" + allBusMallObjects[Image1].image;
    imgElement2.src = "assets/img/" + allBusMallObjects[Image2].image;
    imgElement3.src = "assets/img/" + allBusMallObjects[Image3].image;

    allBusMallObjects[Image1].numberOfSeen++;
    allBusMallObjects[Image2].numberOfSeen++;
    allBusMallObjects[Image3].numberOfSeen++;


}

render();
console.log(Image1);


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}


sectionElement.addEventListener('click', changeImage);
function changeImage(event) {

    if ((event.target.id == "img1" || event.target.id == "img2" || event.target.id == "img3") && counter < nuberOfRounds) {

        if (event.target.id == "img1") {

            allBusMallObjects[Image1].numberofClicks++;
        } else if (event.target.id == "img2") {

            allBusMallObjects[Image2].numberofClicks++;

        } else {

            allBusMallObjects[Image3].numberofClicks++;
        }
        render();
        counter++;
    }

    if (counter == nuberOfRounds) {
        buttonEle.innerText = "Result";
        mainEle.appendChild(buttonEle);

    }


}
buttonEle.remove('Text');

buttonEle.addEventListener('click', toggleButton);
function toggleButton(e) {
    render2();
    buttonEle.textContent = "Reset"
    if (ulEle.style.display == "block") {

        ulEle.remove();
        location.reload();


    } else {
        ulEle.style.display = "block";
    }
}


function render2() {

    mainEle.appendChild(ulEle);

    for (let i = 0; i < allBusMallObjects.length; i++) {
        let liEle = document.createElement('li');
        liEle.textContent = allBusMallObjects[i].name + "  had " + allBusMallObjects[i].numberofClicks + "  Clicks " + " and was seen  " + allBusMallObjects[i].numberOfSeen + "  times.";
        ulEle.appendChild(liEle);
    }

}