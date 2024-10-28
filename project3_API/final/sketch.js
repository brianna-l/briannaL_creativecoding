let shiftX, shiftS;
let r, g, b;
let s;
var speed = 3;
var size = 1;
let canvas;
let actualTemp;
let updatedTemp;

function setup() {
  canvas = createCanvas(windowWidth * 0.5, 200);
  canvas.style('display', 'block');
  centerCanvas();

  background(255);
  frameRate(7);
  
  shiftX = 0;
  shiftS = 0;
  
  s = color(random(0, 255), random(0, 255), random(0, 255));

  fetchColorData();
}

function fetchColorData() {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=dd5e56c491cc41e677b12f4481570d82')
    .then(response => response.json())
    .then(data => {
      console.log('Weather data fetched successfully:', data);

      actualTemp = data.main.temp - 273.15;
      console.log(actualTemp);
      document.getElementById('tempSlider').value = actualTemp;
      updatedTemp = actualTemp;
      updateColorsAndShifts();
      updateTempDisplay();
    })
    .catch(error => console.error('Error fetching data:', error));
}

function adjustTemp() {
  updatedTemp = parseFloat(document.getElementById('tempSlider').value);
  updateColorsAndShifts();
  updateTempDisplay();
}

function resetToOriginal() {
  document.getElementById('tempSlider').value = actualTemp;
  updatedTemp = actualTemp;
  console.log('Updated Temp after reset:', updatedTemp);
  updateColorsAndShifts();
  updateTempDisplay();
}

function updateTempDisplay() {
  document.getElementById('currentTemp').innerText = updatedTemp.toFixed(2);
}

function updateColorsAndShifts() {
  shiftX = map(updatedTemp, -20, 50, 1, 10);
  shiftS = map(updatedTemp, -20, 50, 0, 20);

  redness = map(updatedTemp, -20, 50, 1, 255);
  greeness = map(updatedTemp, -20, 50, 90, 100);
  blueness = map(updatedTemp, -20, 50, 255, 1);

  r = redness;
  g = greeness;
  b = blueness;
  s = color(r, g, b);
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}
function windowResized() {
  resizeCanvas(windowWidth * 0.5, 200);
  centerCanvas();
}

function draw() {
  background(255);
  shiftX += (shiftX > 10 ? -0.1 : (shiftX < 0 ? 0.1 : 0));
  shiftS += (shiftS > 5 ? -0.1 : (shiftS < 0 ? 0.1 : 0));

  rectMode(CENTER);
  
  fill(r, g, b, 80);
  stroke(s);
  
  // Drawing letters using rectangles
  rect(50, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(90, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(70, 60 - shiftX, 60, 10 + shiftS, 10);
  
  rect(150, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(190, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(170, 60 - shiftX, 60, 10 + shiftS, 10);
  rect(170 + shiftX, 100, 60, 10 + shiftS, 10);

  rect(270, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(270, 60 - shiftX, 60, 10 + shiftS, 10);

  rect(350, 100 - shiftX, 10 + shiftS, 100, 10);
  rect(390, 100 - shiftX, 10 + shiftS, 100, 10);
  rect(370, 140 + shiftX, 60, 10 + shiftS, 10);

  rect(490 + shiftX, 80, 10 + shiftS, 60, 10);
  rect(470 + shiftX, 100, 60, 10 + shiftS, 10);
  rect(480, 120 + shiftX, 10 + shiftS, 60, 10);
  rect(470, 60 - shiftX, 60, 10 + shiftS, 10);
  rect(450, 100 + shiftX, 10 + shiftS, 100, 10);

  rect(550, 100 + shiftX, 10 + shiftS, 100, 10);
  rect(570 + shiftX, 100, 60, 10 + shiftS, 10);
  rect(570 + shiftX, 140, 60, 10 + shiftS, 10);
  rect(570, 60 - shiftX, 60, 10 + shiftS, 10);
}
