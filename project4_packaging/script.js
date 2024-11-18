let sheetID = "188t6eC8SZhptJoHdPGtA1p-ff9x99AHFZsaIHeYDBLU";
let tabName = "1";
let myURL = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

let body = document.body;
let container = document.getElementById("dataHere");
let dataPoints = [];

const flavorColors = {
    chocolate: "linear-gradient(180deg, #89553D, #231610)",
    strawberry: "linear-gradient(180deg, #FF87B5, #F73163)",
    banana: "linear-gradient(180deg, #C1C420, #FB9700)",
    matcha: "linear-gradient(180deg, #81AA36, #344416)",
    milk: "linear-gradient(180deg, #B39A9A, #584130)",
    mint: "linear-gradient(180deg, #65C7A6, #00BBDC)",
    pizza: "linear-gradient(180deg, #ED3300, #DA7B00)",
    salty: "linear-gradient(180deg, #FFAB6B, #FA6868)",
    corn: "linear-gradient(180deg, #EDD773, #71B230)",
    "sour cream": "linear-gradient(180deg, #E6D3B1, #B98966)",
    "toasted sugar": "linear-gradient(180deg, #E6D3B1, #B98966)",
    barbeque: "linear-gradient(180deg, #BA5C31, #542216)",
};

const flavorMap = {
    "sweet slight": 1,
    "sweet regular": 2,
    "sweet heavy": 3,
    "salty slight": 1,
    "salty regular": 2,
    "salty heavy": 3,
};

async function getData() {
    try {
        let response = await fetch(myURL);
        dataPoints = await response.json();

        showRandomDataPoint();
    } catch (error) {
        console.error(error);
    }
}

function showRandomDataPoint() {
    
    container.innerHTML = "";

    const randomIndex = Math.floor(Math.random() * dataPoints.length);
    const dataPoint = dataPoints[randomIndex];

    let newElement = document.createElement("div");
    newElement.classList.add("flavor");
    newElement.style.background = flavorColors[dataPoint.Type] || "white";

    let titleElement = document.createElement("div");
    titleElement.classList.add("title");
    titleElement.textContent = dataPoint.Name;
    newElement.appendChild(titleElement);

    let stickImage = document.createElement("img");
    stickImage.src =
        dataPoint.Series === "pocky"
            ? "media/stick.png"
            : dataPoint.Series === "pejoy"
            ? "media/stick2.png"
            : "media/stick3.png";
    stickImage.classList.add("sticks");
    newElement.appendChild(stickImage);

    let crumbsBox = document.createElement("div");
    crumbsBox.classList.add("crumbsbox");
    newElement.appendChild(crumbsBox);

    let logo = document.createElement("img");
    logo.src =
        dataPoint.Series === "pocky"
            ? "media/pocky.png"
            : dataPoint.Series === "pejoy"
            ? "media/pejoy.png"
            : "media/pretz.png";
    logo.classList.add("logo");
    newElement.appendChild(logo);

    let note = document.createElement("img");
    note.classList.add("note");
    note.src = "media/note.png";
    newElement.appendChild(note);

    let taste = document.createElement("div");
    taste.classList.add("topBox");
    newElement.appendChild(taste);

    let key = document.createElement("div");
    key.classList.add("bottomBox");
    const imgSrc = (() => {
        if (
            dataPoint.FlavorIntensity &&
            dataPoint.FlavorIntensity.includes("sweet")
        ) {
            return "media/sugar.png";
        }
        if (
            dataPoint.FlavorIntensity &&
            dataPoint.FlavorIntensity.includes("salty")
        ) {
            return "media/salt.png";
        }
        return "media/sugar.png";
    })();
    key.innerHTML = `
    ————— YES<br>
    - - - - - &nbsp NONE<br>
    <span><img src="media/crumb.png" style="width: 12px; height: 12px;">&nbsp lv${dataPoint.Crunchiness} &nbsp crumbs<span>
    <span>&nbsp<img src="${imgSrc}" style="width: 11px; height: 11px; vertical-align: -3px">&nbsp&nbsp ${dataPoint.FlavorIntensity}<span>`;
    newElement.appendChild(key);

    let flavorCount = flavorMap[dataPoint.FlavorIntensity] || 0;
    let sugarNCount = Math.max(0, 3 - flavorCount);
    let saltCount = Math.max(0, 3 - flavorCount);
    if (dataPoint.FlavorIntensity && dataPoint.FlavorIntensity.includes("sweet")) {
        for (let i = 0; i < flavorCount; i++) {
            let sugarY = document.createElement("img");
            sugarY.src = "media/sugarfill.png";

            if (dataPoint.FlavorIntensity === "sweet") {
                sugarY.classList.add("sugarfill");
            }
            taste.appendChild(sugarY);
        }

        for (let i = 0; i < sugarNCount; i++) {
          let sugarN = document.createElement("img");
          sugarN.src = "media/sugar.png";
      
          if (dataPoint.FlavorIntensity === "sweet") {
              sugarN.classList.add("sugarfill");
          }
      
          taste.appendChild(sugarN);
        }
      }

    if (dataPoint.FlavorIntensity && dataPoint.FlavorIntensity.includes("salty")) {
      for (let i = 0; i < flavorCount; i++) {
        let saltY = document.createElement("img");
        saltY.src = "media/saltfill.png";
    
        if (dataPoint.FlavorIntensity === "salty") {
            saltY.classList.add("sugarfill");
        }
    
        taste.appendChild(saltY);
      }

      for (let i = 0; i < saltCount; i++) {
        let saltN = document.createElement("img");
        saltN.src = "media/salt.png";
    
        if (dataPoint.FlavorIntensity === "sweet") {
            saltN.classList.add("sugarfill");
        }
    
        taste.appendChild(saltN);
      }
    }

    for(let i = 0; i < dataPoint.Crunchiness * 3; i++) {
      let confetti = document.createElement("img");
      confetti.classList.add("confetti");
      confetti.src = "media/crumb.png";
      confetti.style.top = `${i * 50}px`;
      confetti.style.left = `${Math.random() * 70}px`;
      confetti.style.transform = `rotate(${Math.random()* 360}deg )`;
      crumbsBox.appendChild(confetti);
    }

    let existingContent = document.querySelector(".additional-content");
    if (existingContent) {
        existingContent.remove();
    }

    let newContent = document.createElement("div");
    newContent.classList.add("additional-content");
    newContent.innerHTML = `
    <div>
        <div>1.&nbsp Flavor: ${dataPoint.Name}</div>
        <div>2. Series: ${dataPoint.Series}</div>
        <div>3. Taste: ${dataPoint.FlavorIntensity}</div>
        <div>4. Crunchy: ${dataPoint.Crunchiness}</div>
        <div>5. Coating: ${dataPoint.Coat}</div>
        <div>6. Filling: ${dataPoint.Filling}</div><hr>
        <a href="gallery.html">gallery</a>
    </div>
`;
    body.appendChild(newContent);
    container.appendChild(newElement);
}

container.addEventListener("click", showRandomDataPoint);

getData();