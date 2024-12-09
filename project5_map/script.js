const firebaseConfig = {
  apiKey: "AIzaSyAIR9QOt7g_-S_5IYPv72HN_TwyM1UkxpE",
  authDomain: "virtual-world-3682d.firebaseapp.com",
  projectId: "virtual-world-3682d",
  storageBucket: "virtual-world-3682d.firebasestorage.app",
  messagingSenderId: "618889478232",
  appId: "1:618889478232:web:b79c5f3d9231e1e68cca2d",
  measurementId: "G-VTYN0GSPKX",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("example1");
const oce = database.ref("example2");
const cty = database.ref("example3");

const name = document.getElementById("name-input");
const message = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const chatroom = document.getElementById("chatroom");
const ocean = document.getElementById("ocean");
const city = document.getElementById("city");

const chatModal = document.getElementById("chat-modal");
const oceanModal = document.getElementById("ocean-modal");
const cityModal = document.getElementById("city-modal");
const closeButtons = document.querySelectorAll(".close-button");

const oceanCount = document.getElementById("ocean-count");
const cityCount = document.getElementById("city-count");
const forestCount = document.getElementById("forest-count");
const totalCount = document.getElementById("total-count");

function updateCounts() {
  const oceanItems = document.querySelectorAll('li[data-category="ocean"]').length;
  const cityItems = document.querySelectorAll('li[data-category="city"]').length;
  const forestItems = document.querySelectorAll('li[data-category="forest"]').length;
  
  document.getElementById("ocean-count").textContent = oceanItems;
  document.getElementById("city-count").textContent = cityItems;
  document.getElementById("forest-count").textContent = forestItems;
  document.getElementById("total-count").textContent = oceanItems + cityItems + forestItems;
}

chatroom.onclick = () => {
  chatModal.style.display = "flex";
};
ocean.onclick = () => {
  oceanModal.style.display = "flex";
};
city.onclick = () => {
  cityModal.style.display = "flex";
};
closeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    chatModal.style.display = "none";
    oceanModal.style.display = "none";
    cityModal.style.display = "none";
  })
);
window.onclick = (event) => {
  if (event.target === chatModal) {
    chatModal.style.display = "none";
  }
  if (event.target === oceanModal) {
    oceanModal.style.display = "none";
  }
  if (event.target === cityModal) {
    citynModal.style.display = "none";
  }
};

function updateChatroom(data, container, category) {
  container.innerHTML = "";
  const positionedElements = [];
  const containerRect = container.getBoundingClientRect();

  for (const key in data) {
    const li = document.createElement("li");
    li.setAttribute("data-category", category);
    li.innerHTML = `
      <strong>${data[key].name}</strong>: ${data[key].message}
    `;

    li.style.position = "absolute";
    li.style.display = "flex";
    li.style.alignItems = "center";

    let randomTop, randomLeft, overlap;

    do {
      randomTop = Math.random() * (containerRect.height - 100);
      randomLeft = Math.random() * (containerRect.width - 100);

      overlap = positionedElements.some((pos) => {
        const buffer = 10;
        return (
          randomTop < pos.top + 100 + buffer &&
          randomTop + 100 > pos.top - buffer &&
          randomLeft < pos.left + 100 + buffer &&
          randomLeft + 100 > pos.left - buffer
        );
      });
    } while (overlap);

    li.style.top = `${randomTop}px`;
    li.style.left = `${randomLeft}px`;

    positionedElements.push({ top: randomTop, left: randomLeft });

    container.appendChild(li);
  }
  updateCounts();
}

document.getElementById("chat-send-button").onclick = (event) => {
  event.preventDefault();
  const name = document.getElementById("chat-name-input").value.trim();
  const message = document.getElementById("chat-message-input").value.trim();

  if (!name || !message) {
    alert("Name and message cannot be empty.");
    return;
  }

  const text = { name, message };
  ref.push(text);
};

document.getElementById("ocean-send-button").onclick = (event) => {
  event.preventDefault();
  const name = document.getElementById("ocean-name-input").value.trim();
  const message = document.getElementById("ocean-message-input").value.trim();

  if (!name || !message) {
    alert("Name and message cannot be empty.");
    return;
  }

  const text = { name, message };
  oce.push(text);
};

document.getElementById("city-send-button").onclick = (event) => {
  event.preventDefault();
  const name = document.getElementById("city-name-input").value.trim();
  const message = document.getElementById("city-message-input").value.trim();

  if (!name || !message) {
    alert("Name and message cannot be empty.");
    return;
  }

  const text = { name, message };
  cty.push(text);
};

ref.on("value", (snapshot) => {
  const data = snapshot.val();
  updateChatroom(data, chatroom, "forest");
  updateCounts();
});

oce.on("value", (snapshot) => {
  const data = snapshot.val();
  updateChatroom(data, ocean, "ocean");
  updateCounts();
});

cty.on("value", (snapshot) => {
  const data = snapshot.val();
  updateChatroom(data, city, "city");
  updateCounts();
});



// TRANSITION
const oc = document.getElementById("oc");
oc.addEventListener("mouseover", () => {
  ocean.style.boxShadow = "0 4px 16px #ffe097";
});
oc.addEventListener("mouseout", () => {
  ocean.style.boxShadow = "none";
});

const me = document.getElementById("me");
me.addEventListener("mouseover", () => {
  city.style.boxShadow = "0 4px 16px #ffe097";
});
me.addEventListener("mouseout", () => {
  city.style.boxShadow = "none";
});

const fo = document.getElementById("fo");
fo.addEventListener("mouseover", () => {
  chatroom.style.boxShadow = "0 4px 16px #ffe097";
});
fo.addEventListener("mouseout", () => {
  chatroom.style.boxShadow = "none";
});


// AUDIO
document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audio-player");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  const playlist = [
    { src: "media/1.mp3" },
    { src: "media/2.mp3" },
    { src: "media/3.mp3" },
    { src: "media/4.mp3" },
    { src: "media/5.mp3" },
  ];
  let currentSongIndex = 0;

  function loadSong(index) {
    if (index < 0) {
      index = playlist.length - 1;
    } else if (index >= playlist.length) {
      index = 0;
    }

    currentSongIndex = index; 
    audioPlayer.src = playlist[index].src; 
    audioPlayer.play();
  }

  loadSong(currentSongIndex);

  prevButton.addEventListener("click", () => {
    currentSongIndex -= 1;
    loadSong(currentSongIndex);
  });

  nextButton.addEventListener("click", () => {
    currentSongIndex += 1;
    loadSong(currentSongIndex);
  });

  audioPlayer.addEventListener("ended", () => {
    currentSongIndex += 1;
    loadSong(currentSongIndex);
  });
});
