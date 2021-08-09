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
let Firstround = [];
let secondround = [];
/* console.log(Firstround);
console.log(secondround); */
function render() {
     
        Image1 = getRandomNumber(0, ArrayOfImages.length - 1);

        do {
            Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
            Image3 = getRandomNumber(0, ArrayOfImages.length - 1);
        }
        while (Image1 == Image2 || Image1 == Image3 || Image2 == Image3);

         

    

    /* while (Image1 == Image2 || Image1 == Image3 || Image2 == Image3) {
        Image1 = getRandomNumber(0, ArrayOfImages.length - 1);
        Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
        Image3 = getRandomNumber(0, ArrayOfImages.length - 1);
    } */
    imgElement1.src = "assets/img/" + allBusMallObjects[Image1].image;
    imgElement2.src = "assets/img/" + allBusMallObjects[Image2].image;
    imgElement3.src = "assets/img/" + allBusMallObjects[Image3].image;
    preventDuplicate();

    allBusMallObjects[Image1].numberOfSeen++;
    allBusMallObjects[Image2].numberOfSeen++;
    allBusMallObjects[Image3].numberOfSeen++;


}

render();



function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}


sectionElement.addEventListener('click', changeImage);
function changeImage(event) {


    if ((event.target.id == "img1"
        || event.target.id == "img2"
        || event.target.id == "img3") && counter < nuberOfRounds+1) {

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
        buttonEle.removeEventListener('click', changeImage);
    }


}

buttonEle.innerText = "Result";

mainEle.appendChild(buttonEle);
buttonEle.addEventListener('click', toggleButton);
function toggleButton(e) {
    createChart();
    buttonEle.style.visibility = 'visible';
    mainEle.appendChild(ulEle);

    for (let i = 0; i < allBusMallObjects.length; i++) {
        let liEle = document.createElement('li');
        liEle.textContent = allBusMallObjects[i].name + "  had " + allBusMallObjects[i].numberofClicks + "  Clicks " + " and was seen  " + allBusMallObjects[i].numberOfSeen + "  times.";
        ulEle.appendChild(liEle);
    }


    if (ulEle.style.visibility == 'visible') {
        ulEle.remove();
        location.reload();
    } else {
        ulEle.style.visibility = "visible";

    }


}

// prevent Duplicate imge With previous Round the next round
function preventDuplicate() { 

    
    if (counter % 2 == 0) {
        if(counter == 0){
            Firstround=[];
            counter++;
            
        }
        Firstround.push(Image1);
        Firstround.push(Image2);
        Firstround.push(Image3);
        console.log(counter);
        console.log(Firstround);
        while (Firstround.includes(secondround[0]) || Firstround.includes(secondround[2]) || Firstround.includes(secondround[1])) {
            {
                Firstround = [];
                Image1 = getRandomNumber(0, ArrayOfImages.length - 1);

                do {
                    Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
                    Image3 = getRandomNumber(0, ArrayOfImages.length - 1);
                }
                while (Image1 == Image2 || Image1 == Image3 || Image2 == Image3);
                Firstround.push(Image1);
                Firstround.push(Image2);
                Firstround.push(Image3);
                console.log(Firstround);


            }

        }
        secondround = [];
        


    } else {
        secondround.push(Image1);
        secondround.push(Image2);
        secondround.push(Image3);
        console.log(counter);
        console.log(secondround);
        while (secondround.includes(Firstround[0]) || secondround.includes(Firstround[2]) || secondround.includes(Firstround[1])) {
            {
                secondround = [];
                Image1 = getRandomNumber(0, ArrayOfImages.length - 1);

                do {
                    Image2 = getRandomNumber(0, ArrayOfImages.length - 1);
                    Image3 = getRandomNumber(0, ArrayOfImages.length - 1);
                }
                while (Image1 == Image2 || Image1 == Image3 || Image2 == Image3);
                secondround.push(Image1);
                secondround.push(Image2);
                secondround.push(Image3);
                console.log(secondround);


            }

        }
        Firstround = [];
       
    }
}

function createChart() {

    let arrayName = [];
    let arrayShown = [];
    let arrayOfClocks = [];
    for (let i = 0; i < allBusMallObjects.length; i++) {
        arrayName.push(allBusMallObjects[i].name);
        arrayShown.push(allBusMallObjects[i].numberOfSeen);
        arrayOfClocks.push(allBusMallObjects[i].numberofClicks);


    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrayName,
            datasets: [{
                label: '# Number of shown',
                data: arrayShown,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {  // Second dataset
                label: '# Number of Clicks ',
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: arrayOfClocks
            }]


        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
