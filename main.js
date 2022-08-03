// Switch Random Backgoround Option
let backgrounElement = document.querySelectorAll(".random-background button");

// Random Background Option
let backgroundOption = true;

// Control Background Interval
let backgrounINterval;
if (window.localStorage.getItem("option") !== null) {
  if (window.localStorage.getItem("option") === "true") {
    backgroundOption = true;
    setRandomBackground();
  } else {
    backgroundOption = false;
  }
  backgrounElement.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("option") === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
backgrounElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      setRandomBackground();
      window.localStorage.setItem("option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgrounINterval);
      window.localStorage.setItem("option", false);
    }
  });
});
// Random Background
let imgArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
let landing = document.querySelector(".landing");
function setRandomBackground() {
  if (backgroundOption === true) {
    backgrounINterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgArray.length);
      landing.style.backgroundImage = `url("images/${imgArray[randomNum]}")`;
    }, 8000);
  }
}
setRandomBackground();

// Toggle Menu
let toggle = document.querySelector("header .toggle");
let menu = document.querySelector("header ul");
toggle.onclick = function () {
  toggle.classList.toggle("close");
  menu.classList.toggle("go-dn");
  window.onscroll = () => {
    toggle.classList.remove("close");
    menu.classList.remove("go-dn");
  };
};

// Setting Box

// Gear
let gear = document.querySelector(".setting-box i");
gear.onclick = function () {
  gear.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("go-right");
};

// Color Settings
const liArray = Array.from(document.querySelectorAll(".colors li"));
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );

  // Remove Active Form All
  document.querySelectorAll(".colors li").forEach((ele) => {
    ele.classList.remove("active");

    // Add active To Tatget
    if (ele.dataset.color === window.localStorage.getItem("color")) {
      ele.classList.add("active");
    }
  });
}
liArray.forEach((li) => {
  li.addEventListener("click", (e) => {
    window.localStorage.setItem("color", e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    handleActive(e);
  });
});

// Fill Progress

let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .progress span");
window.onscroll = function () {
  let skillsOffset = skills.offsetTop;
  if (
    window.scrollY >
    skillsOffset + skills.offsetHeight - window.innerHeight
  ) {
    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  // Go Top
  let goTop = document.querySelector(".scroll-top");
  if (window.scrollY >= 600) {
    goTop.classList.remove("hide");
  } else {
    goTop.classList.add("hide");
  }
  goTop.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
};

// Gallery Box
let galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // Create The Image
    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    // Create The Title
    let title = document.createElement("span");
    title.append(document.createTextNode(img.alt));

    // Create Close Mark
    let close = document.createElement("span");
    close.append(document.createTextNode("X"));
    close.className = "close-mark";

    // Appendding
    popupBox.append(close);
    popupBox.append(title);
    popupBox.append(popupImage);
    document.body.append(popupBox);

    // Close The Popup Box
    close.addEventListener("click", () => {
      document.body.removeChild(popupBox);
      document.body.removeChild(overlay);
    });
  });
});

// Start Bullets
// Parent
let bulletsParent = document.querySelector(".bullets");

// Bullets
let bullets = document.querySelectorAll(".bullets .bullet");
// Options || Yes | No
let showBlulletsEle = document.querySelectorAll(".bullets-option button");

let localBulletsOpt = window.localStorage.getItem("bulle-option");

if (localBulletsOpt !== null) {
  if (localBulletsOpt === "true") {
    bulletsParent.classList.remove("hide");
  } else {
    bulletsParent.classList.add("hide");
  }
  showBlulletsEle.forEach((button) => {
    button.classList.remove("active");
  });
  if (localBulletsOpt === "true") {
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

// Show Bullets Option
showBlulletsEle.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActive(e);

    if (btn.dataset.bullet === "yes") {
      bulletsParent.classList.remove("hide");
      window.localStorage.setItem("bulle-option", true);
    } else {
      bulletsParent.classList.add("hide");
      window.localStorage.setItem("bulle-option", false);
    }
  });
});
goToTarget(bullets);
// End Bullets

// Reset All Options

let reset = document.querySelector(".reset button");
reset.onclick = () => {
  window.localStorage.removeItem("color");
  window.localStorage.removeItem("option");
  window.localStorage.removeItem("bulle-option");
  window.location.reload();
};
// Go To Target
function goToTarget(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
// Scroll To Target Link
let links = document.querySelectorAll("header ul li");
goToTarget(links);

// Handle Active
function handleActive(e) {
  // Remove Active Form All
  e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // Add active to target
  e.target.classList.add("active");
}
