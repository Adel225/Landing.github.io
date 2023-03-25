// check if there is local storage color option 

let mainColor = localStorage.getItem("color_option"); 


if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    // check for active class
    removeActiveClassFromAllLis();
}

let backgroundOption = true;
let backgroundInterval;

// check if there is random background item
let backgroundLocalItem = localStorage.getItem("background_option");
let yes = document.querySelector(".yes");
let no = document.querySelector(".no");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll(".yes-and-no span").forEach(element => {
        element.classList.remove("active");
    });
    // add active class to sellected element
    if (backgroundLocalItem === "true") {
        yes.classList.add("active");
    } else {
        no.classList.add("active");
    }
}

// open color setings

let gear = document.querySelector(".toggle-settings .gear");
let settingBox = document.querySelector(".setting-box");

gear.onclick = function () {
    settingBox.classList.toggle("open");
}

// switch colors

const colorsLi = document.querySelectorAll(".color-list li");

colorsLi.forEach (li => {
    li.addEventListener("click" , (e) => {
        // set color on root 
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        // set color on local storag
        localStorage.setItem('color_option' , e.target.dataset.color);
        // remove active class from all children
        handleActivity(e);
    });
});

// switch background option

const randomBackground = document.querySelectorAll(".yes-and-no span");

randomBackground.forEach (span => {
    span.addEventListener("click" , (e) => {
        // remove active class from all
        handleActivity(e);
        
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeBG();
            localStorage.setItem("background-option" , true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option" , false);
        }
    });
});

// switch background image
let landingPage = document.querySelector(".landing-page");
let images = ["01.jpeg" , "02.jpeg" , "03.jpeg" , "04.jpeg" ,"05.jpeg"];


function randomizeBG() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * images.length);
            landingPage.style.backgroundImage = 'url("images/'+ images[randomNum] +'")';
        }, 1000);
    }
}

function removeActiveClassFromAllLis() {
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        // add active class on element with data color == local storage item
        if (element.dataset.color === mainColor) {
            element.classList.add('active');
        }
    });
}

// select skills sellector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // skill offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // outer heigth
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHieght = this.innerHeight;
    // window scroll top
    let windowScrollTop = this.pageYOffset;
    
    // this.console.log(skillsOuterHeight);    560
    // this.console.log(windowHieght);       647 
    // this.console.log(skillsOffsetTop);  1000 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHieght)) {
        let allSkills = document.querySelectorAll(".skills-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// create pop up for the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click" , (e) => {
        // create overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // craete heading
            let imgHeading = document.createElement("h3");
            let headingText = document.createTextNode(img.alt);
            imgHeading.appendChild(headingText);
            popupBox.appendChild(imgHeading);
        }

        // create image
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        // add image to popup box
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        // create close span
        let closeBtn = document.createElement("span");
        let closeBtnText = document.createTextNode("X");
        closeBtn.appendChild(closeBtnText);
        closeBtn.className = "closeBtn";
        popupBox.appendChild(closeBtn);
    });
});

document.addEventListener("click" , (e) => {
    if (e.target.className == "closeBtn") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links 
let allLinks = document.querySelectorAll(".links a");

function scrollToPage (elements) {
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToPage(allBullets);
scrollToPage(allLinks);

// handle active states
function handleActivity (e) {
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // add active class on target li
    e.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'yes') {
        bulletsContainer.style.display = "block";
        document.querySelector(".option-box .bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".option-box .bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click" , (e) => {
        handleActivity(e);
        if (span.dataset.display === "yes") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "yes");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "no");
        }
    });
});

//  reset btn
document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    window.location.reload();
}

// toggle menue 

let menuebtn = document.querySelector(".toggle-menue");
let tlinks = document.querySelector(".links");

menuebtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    tlinks.classList.toggle("open");
}

tlinks.onclick = function (e) {
    e.stopPropagation();
}

// click anywhere outside menue btn
document.addEventListener("click" , (e) => {
    if (e.target !== menuebtn && e.target !== tlinks) {
        if (menuebtn.classList.contains("active") && tlinks.classList.contains("open")) {
            menuebtn.classList.remove("active");
            tlinks.classList.remove("open");
        }
    }
});

