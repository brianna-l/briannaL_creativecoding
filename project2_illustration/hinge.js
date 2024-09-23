// MANIPULATING THE DOM

let firstContainer = document.getElementById("container-1");


// LOOPS: TYPE #1
for (let i = 0; i < 550; i++) {
    min = 1
    max = 3
    let newElement = document.createElement("div");
    firstContainer.appendChild(newElement);
    newElement.classList.add("circle");

    let innerElement = document.createElement("div");
    newElement.appendChild(innerElement);
    innerElement.classList.add("square");
  
    let randomHue = Math.floor(Math.random() * (240 - 0 + 1)) + 0;
    newElement.style.backgroundColor = "hsla(" + randomHue + ", 80%, 70%, 0.6)"
    innerElement.style.backgroundColor = "hsl(" + randomHue + " 100% 60%)"

    newElement.onmousemove = function(e) {
    newElement.style.transform = "rotate(" + Math.random() * 360 + "deg)"
    newElement.style.transform = "scale(" + Math.random() * (max - min + 1) + ")"
    newElement.style.opacity = "1"
    newElement.style.filter = "blur(0px)"
  }
}