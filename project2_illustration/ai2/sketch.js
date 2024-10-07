let lineXone = 0;
let lineYone = 0;
let colors = ["#1C1C28", "#E0E2E5", "#0FFFC3", "#FF007F", "#FFBF00", "#FF4848"]
;
let colors2 = ["#F5F5F5", "#333333", "#FF77B5", "#FFD700", "#77DDFF", "#FF6F61"]
;
let text2 = ["AI", "is", "amazing", "!!!!", ":D"];
let textS = [140, 100, 60, 140, 140];

let boxes = [];
let myFont;
function preload() {
  myFont = loadFont('text.ttf');
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvasContainer');
  createNewBox(width / 2, height / 2, true);
  textFont(myFont);
}

function draw() {
  background("blue");
  frameRate(15);

  // DRAW BOX
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];

    // BOXBACKG
    stroke(box.colorA);
    strokeWeight(3);
    fill(box.colorB);
    rect(box.posX - (frameCount - box.frameCount) % 10, box.posY + (frameCount - box.frameCount) % 10, 300, 200);
    fill("lightgray");
    rect(box.posX - (frameCount - box.frameCount) % 10, box.posY + (frameCount - box.frameCount) % 10, 300, 30);

    // TEXTPOS
    stroke("white");
    fill(box.colorA);
    textSize(box.sizeX);
    let textWidthOffset = textWidth(box.textV) / 2;
    let textHeightOffset = box.sizeX / 2.5;

    // ELEMENTS
    text(box.textV, box.posX + 140 - textWidthOffset + (frameCount - box.frameCount) % 5, box.posY + 110 + textHeightOffset - (frameCount - box.frameCount) % 5);
    fill("blue");
    strokeWeight(1);
    rect(box.posX + 240 - (frameCount - box.frameCount) % 10, box.posY + 5 + (frameCount - box.frameCount) % 10, 20, 20);
    fill("yellow");
    textSize(40);
    text("-", box.posX + 243 - (frameCount - box.frameCount) % 10, box.posY + 25 + (frameCount - box.frameCount) % 10);
    fill("blue");
    rect(box.posX + 270 - (frameCount - box.frameCount) % 10, box.posY + 5 + (frameCount - box.frameCount) % 10, 20, 20);
    fill("yellow");
    textSize(30);
    text("x", box.posX + 273 - (frameCount - box.frameCount) % 10, box.posY + 23 + (frameCount - box.frameCount) % 10);
  }

  // GLITCH
  stroke("white");
  strokeWeight(1);
  line(lineXone, lineYone, lineXone + 200, lineYone - 5);
  lineXone = random(0, width);
  lineYone = random(0, height / 2);

  // MOUSE
  if (mouseIsPressed === true) {
    fill(0);
  } else {
    fill(255);
  }
  stroke("black");
  strokeWeight(10);
  triangle(mouseX, mouseY, mouseX + 50, mouseY + 50, mouseX, mouseY + 70);
}

function mousePressed() {
  createNewBox(mouseX, mouseY, false);
}

function createNewBox(x, y, isCenter) {
  let newColorB = random(colors);
  let newColorA = random(colors2);
  let newTextV, newSizeX;

  // DISPLAY ORDER
  if (isCenter) {
    newTextV = "AI";
    newSizeX = 140;
  } else {
    let index = int(random(text2.length));
    newTextV = text2[index];
    newSizeX = textS[index];
  }

  // CENTER
  let newPosX, newPosY;
  if (isCenter) {
    newPosX = width / 2 - 150;
    newPosY = height / 2 - 100;
  } else {
    newPosX = constrain(x - 150, 0, width - 300);
    newPosY = constrain(y - 100, 0, height - 200);
  }

  // PUSH
  boxes.push({
    posX: newPosX,
    posY: newPosY,
    colorA: newColorA,
    colorB: newColorB,
    textV: newTextV,
    sizeX: newSizeX,
    frameCount: frameCount
  });
}
