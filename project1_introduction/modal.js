// Organize HTML file
const modalsHtml = `
    <div id="ModalFront" class="modal">
        <div id="ModalF" class="modal-content">
            <span class="close">&#127960;</span>
            <p>--</p>
            <img src="media/8.jpg"></img>
            <a>dinner at #? Pier on Hudson R.</a>
            <img src="media/9.jpg"></img>
            <a>MOMA</a>
            <img src="media/10.jpg"></img>
            <a>getting something fast to eat</a>
            <img src="media/11.jpg"></img>
            <a>A night at London cuz flight canceled:/</a>
            <img src="media/12.jpg"></img>
            <a>I knew they're gonna fight..</a>
            <img src="media/13.jpg"></img>
            <a>cool</a>
            <img src="media/14.jpg"></img>
            <a>quite scary over 12</a>
        </div>
    </div>
    <div id="ModalBack" class="modal">
        <div id="ModalB" class="modal-content">
            <span class="close">&#128467;</span>
            <h1>random stuff</h1>
            <p>blender, nomad, pixelart, design cloth for games, gamemaker</p>
            <img src="media/1.jpg"></img>
            <img src="media/2.jpg"></img>
        </div>
    </div>
    <div id="ModalRight" class="modal">
        <div id="ModalR" class="modal-content">
            <span class="close">&#128368;</span>
            <p>I was born in Boston; went to kindergarten for a year, learned nothing but climbing monkey bars.</p>
            <i>Then I moved to Beijing, and stayed for 6 years. Miss the days when icepop only costs 50cents.</i>
            <p>For the next few years I lived in Shanghai. Not much to say about this place, but I it's definitely my favorite.</p>
            <i>And now I'm in Newyork...TBC</p>
        </div>
    </div>
    <div id="ModalLeft" class="modal">
        <div id="ModalL" class="modal-content">
            <span class="close">&#128192;</span>
            <p>chill in summer</p>
            <iframe style="border-radius:50px" src="https://open.spotify.com/embed/playlist/04WZMGLSXuWDVc01MSFL2w?utm_source=generator" width="100%" height="400" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </div>
    <div id="ModalTop" class="modal">
        <div id="ModalT" class="modal-content">
            <span class="close">&#128444;</span>
            <p>summer, sea, beach</p>
            <p>nature, fresh air, sun</p>
            <p>noon, cat, rest</p>
            <p>music, livehouse, friend</p>
            <p>night, light, bed</p>
        </div>
    </div>
    <div id="ModalBottom" class="modal">
        <div id="ModalBm" class="modal-content">
            <span class="close">&#9197;</span>
            <p>--</p>
            <img src="media/3.jpg"></img>
            <img src="media/4.jpg"></img>
            <img src="media/5.jpg"></img>
            <img src="media/6.jpg"></img>
            <img src="media/7.jpg"></img>
        </div>
    </div>
`;

// Connect to HTML
function addModalsToDoc() {
    const body = document.body;
    body.insertAdjacentHTML('beforeend', modalsHtml);
}
addModalsToDoc();

// Modal function
var modalFront = document.getElementById("ModalFront");
var modalBack = document.getElementById("ModalBack");
var modalRight = document.getElementById("ModalRight");
var modalLeft = document.getElementById("ModalLeft");
var modalTop = document.getElementById("ModalTop");
var modalBottom = document.getElementById("ModalBottom");
    // click on cube
var btnFront = document.getElementById("Front");
var btnBack = document.getElementById("Back");
var btnRight = document.getElementById("Right");
var btnLeft = document.getElementById("Left");
var btnTop = document.getElementById("Top");
var btnBottom = document.getElementById("Bottom");
    // click on name
var nameF = document.getElementById("o2");
var nameB = document.getElementById("o3");
var nameR = document.getElementById("o1");
var nameL = document.getElementById("o4");
var nameT = document.getElementById("o5");
var nameBm = document.getElementById("o6");
    // X
var span = document.getElementsByClassName("close")[0];

// Open modals with clicks [cube/name]
btnFront.onclick = function() {modalFront.style.display = "block";}
btnBack.onclick = function() {modalBack.style.display = "block";}
btnRight.onclick = function() {modalRight.style.display = "block";}
btnLeft.onclick = function() {modalLeft.style.display = "block";}
btnTop.onclick = function() {modalTop.style.display = "block";}
btnBottom.onclick = function() {modalBottom.style.display = "block";}

nameF.onclick = function() {modalFront.style.display = "block";}
nameB.onclick = function() {modalBack.style.display = "block";}
nameR.onclick = function() {modalRight.style.display = "block";}
nameL.onclick = function() {modalLeft.style.display = "block";}
nameT.onclick = function() {modalTop.style.display = "block";}
nameBm.onclick = function() {modalBottom.style.display = "block";}


// Close
window.onclick = function(event) {
    if (event.target === modalFront) {
      modalFront.style.display = "none";
    } 
    else if (event.target === modalBack) {
      modalBack.style.display = "none";
    }
    else if (event.target === modalRight) {
      modalRight.style.display = "none";
    }
    else if (event.target === modalLeft) {
      modalLeft.style.display = "none";
    }
    else if (event.target === modalTop) {
      modalTop.style.display = "none";
    }
    else if (event.target === modalBottom) {
      modalBottom.style.display = "none";
    }
  }