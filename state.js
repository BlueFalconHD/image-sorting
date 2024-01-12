var running = false;
var speed = 0.5;
var image = null;
var img = null;
var data = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval = null;

var row = 0;
var pixelRow = null;

document.getElementById('uploadImage').addEventListener('change', loadImage);
document.getElementById('startButton').addEventListener('click', startSorting);
document.getElementById('resetButton').addEventListener('click', resetSorting);
document.getElementById('speedSlider').addEventListener('change', changeSpeed);
document.getElementById('algorithmPicker').addEventListener('change', changeAlgorithm);
document.getElementById('sortByPicker').addEventListener('change', changeSortBy);

// HANDLERS //

function loadImage(e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        img = new Image();
        img.onload = function () {
            data = getImagePixels(img);
            image = data;
            drawImageData(canvas, data);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
function startSorting() {
    if (running) return;
    running = true;
    sort();
}
function resetSorting() {
    running = false;
    clearInterval(interval)
    row = 0;
    data = image
    drawImageData(canvas, data);
}
function changeSpeed(e) {
    speed = e.target.value;
    resetSorting();
}
function changeAlgorithm(e) {
    algorithm = e.target.value;
    resetSorting();
}
function changeSortBy(e) {
    sortBy = e.target.value;
    resetSorting();
}

// SORTING //


function startSortingInterval() {
    if (!running) return;
    interval = setInterval(() => {
        data[row] = algos["quicksort"](data[row], "pixelColor");


        if (sortingData._sf && sortingData._sf.sorted) {
            // if there are no more rows to sort, stop the interval
            if (row === data.length - 1) {
                running = false;
                clearInterval(interval);
                console.log('done');
            } else {
                row++;
            }
        }
    }, 500);
}