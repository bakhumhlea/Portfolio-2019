// window
var pageCenterX;
var pageCenterY;
var currentWindowWidth;
var currentWindowHeight;
var windowWidthChange;

// Navbar
var navbar = document.getElementById("nav-items");
var navbarLeft = navbar.getBoundingClientRect().left;
var navbarRight = navbar.getBoundingClientRect().right;
var midNavbar;
var pathTo = [];
var underline = document.getElementById("underline-svg");
var navbarWidth = navbarRight - navbarLeft;
var underlinePath = document.getElementById("underline-path");

// About
var dashSvg = document.getElementById("dash");
var dash = document.getElementById("dash-path");

// Initial state
var pageState = {
  projectsActive : false,
  learnActive : false,
  aboutActive : false,
  contact : false
}

window.onload = function onloadNow(event) {
  currentWindowHeight = window.innerHeight;
  currentWindowWidth = window.innerWidth;

  navbarLeft = navbar.getBoundingClientRect().left;
  navbarRight = navbar.getBoundingClientRect().right;
  midNavbar = ((navbarRight - navbarLeft)/2 + navbarLeft)/window.innerWidth*100;

  pageCenterX = window.innerWidth/2;
  pageCenterY = window.innerHeight/2;

  // Navbar underline
  underline.setAttribute("width", `${navbarWidth}px`);
  underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);
}

window.onresize = function resize() {
  currentWindowHeight = window.innerHeight;
  currentWindowWidth = window.innerWidth;
  
  navbarLeft = navbar.getBoundingClientRect().left;
  navbarRight = navbar.getBoundingClientRect().right;
  midNavbar = ((navbarRight - navbarLeft)/2 + navbarLeft)/window.innerWidth*100;
};

var offsetCenterX = function(eventX, pageCenX, perspectiveIndex, positionOffsetX){
  return (eventX - pageCenX)/perspectiveIndex + positionOffsetX;
};
var offsetCenterY = function(eventY, pageCenY, perspectiveIndex, positionOffsetY){
  return (-(pageCenY - eventY))/perspectiveIndex + positionOffsetY;
};

var posX = document.getElementById("pos-x");
var posY = document.getElementById("pos-y");

var targetObject = document.getElementById("object-container");
var orbitOne = document.getElementById("orbit-1");
var orbitTwo = document.getElementById("orbit-2");
var orbitThree = document.getElementById("orbit-3");
var orbitFour = document.getElementById("orbit-4");
var orbitFive = document.getElementById("orbit-5");
var orbitSix = document.getElementById("orbit-6");
var orbitSeven = document.getElementById("orbit-7");
var orbitEight = document.getElementById("orbit-8");
var orbitNine = document.getElementById("orbit-9");
var orbitFront = document.getElementById("front");
var center = document.getElementById("center");

var polyOne = document.getElementById("polygon-1");
var polyFront = document.getElementById("polygon-front");

var pauseButton = document.getElementById("pause");
var pauseInfo = document.getElementById("pause-info");

var path = document.getElementById("timer-bar");

var timer;
var freezed = false;
var offX;
var offY

function handleMouseMove(event) {
  clearInterval(timer);
  pauseInfo.textContent = "click object to freeze";

  event = event || window.event;

  offX = 50 - (50*event.clientX)/(window.innerWidth/2);
  offY = 50 - (50*event.clientY)/(window.innerHeight/2);
  if (offX < -15) {
    offX = ((offX-(-15))/3)-15;
  }
  if (offX > 15) {
    offX = ((offX - 15)/3)+15;
  }
  if (offY < -12.5) {
    offY = ((offY-(-12.5))/4)-12.5;
  }
  if (offY > 12.5) {
    offY = ((offY - 12.5)/4)+12.5;
  }
  orbitOne.setAttribute("style", `left: ${50 - offX*1}%; top: ${50 - offY*1}%;`);
  orbitTwo.setAttribute("style", `left: ${50 - offX*3}%; top: ${50 - offY*3}%;`);
  orbitThree.setAttribute("style", `left: ${50 - offX*5}%; top: ${50 - offY*5}%;`);
  orbitFour.setAttribute("style", `left: ${50 - offX*7}%; top: ${50 - offY*7}%;`);
  orbitFive.setAttribute("style", `left: ${50 - offX*6}%; top: ${50 - offY*6}%;`);
  orbitSix.setAttribute("style", `left: ${50 - offX*4}%; top: ${50 - offY*4}%;`);
  orbitSeven.setAttribute("style", `left: ${50 - offX*5.5}%; top: ${50 - offY*5.5}%;`);
  orbitEight.setAttribute("style", `left: ${50 - offX*8}%; top: ${50 - offY*8}%;`);
  orbitNine.setAttribute("style", `left: ${50 - offX*(-1)}%; top: ${50 - offY*(-1)}%;`);

  polyOne.setAttribute("style", `left: ${50 - offX*5.5}%; top: ${50 - offY*5.5}%;`)
  polyFront.setAttribute("style", `left: ${50 - offX*9.5}%; top: ${50 - offY*9.5}%;`)

  orbitFront.setAttribute("style", `left: ${50 - offX*9}%; top: ${50 - offY*9}%;`);

  posX.textContent = `_${event.clientX}`;
  posY.textContent = `_${event.clientY}`;

  path.style.stroke = "rgb(97, 173, 235)";
  path.setAttribute("d", `M0 2 L0 2`);
}

window.onmousemove = function trigger() {
  if (-30 < offX < 30 && -30 < offY < 30) {
    showInfo();
  } else {
    hideInfo();
  }
  if (freezed) {
    return
  } else {
    handleMouseMove();
  }
}
function playAnimation() {
  hideInfo();
  var objectsArray = [
    orbitOne,
    orbitTwo,
    orbitThree,
    orbitFour,
    orbitFive,
    orbitSix,
    orbitSeven,
    orbitEight,
    orbitNine,
    polyOne,
    polyFront,
    orbitFront,
    center
  ];
  if (freezed) {
    return
  } else {
    objectsArray.forEach(element => {
      element.setAttribute("style", `left: 50%; top: 50%;`);
    });
    posX.textContent = "_000";
    posY.textContent = "_000";
  }
}
targetObject.onmouseleave = playAnimation;

function showInfo() {
  pauseInfo.style.transform = `translate(0,0)`;
  pauseInfo.style.opacity = 1;
};
function hideInfo() {
  console.log("hide");
  pauseInfo.style.transform = `translate(0,-5px)`;
  pauseInfo.style.opacity = 0;
};

function pauseAnimation() {
  var path = document.getElementById("timer-bar");
  var delay = 2000;
  var objectsArray = [
    orbitOne,
    orbitTwo,
    orbitThree,
    orbitFour,
    orbitFive,
    orbitSix,
    orbitSeven,
    orbitEight,
    orbitNine,
    polyOne,
    polyFront,
    orbitFront,
    center
  ];

  if (freezed) {
    path.setAttribute("d", `M0 2 L0 2`);
    pauseInfo.textContent = "click object to freeze";
    path.style.stroke = "rgb(97, 173, 235)";
    freezed = false;
    targetObject.onmousemove = null;
    objectsArray.forEach(element => {
      element.style.animationPlayState = "running";
    });
    hideInfo();
  } else {
    path.setAttribute("d", `M0 2 L80 2`);
    path.style.transitionDuration = `${delay/1000}s`;
    pauseInfo.textContent = "freezing";

    timer = setInterval(() => {
      path.style.stroke = "rgb(198, 230, 14)";
      pauseInfo.textContent = "freezed";
      targetObject.onmousemove = null;
      freezed = true;
      showInfo();
      this.handle = objectsArray.forEach(element => {
        element.style.animationPlayState = "paused";
      });
      clearInterval(timer);
    }, delay);
  }
}

targetObject.onclick = pauseAnimation;

var findNavItemBounding = () => {
  var positionsArray = [];
  for(var i = 0; i < navbar.childElementCount; i++) {
    var item = {
      left: navbar.children.item(i).getBoundingClientRect().left - navbarLeft,
      right: navbar.children.item(i).getBoundingClientRect().right - navbarLeft - 2
    }
    navbar.children.item(i).onmouseover = () => {
      underlinePath.setAttribute("d", `M${item.left - navbarLeft} 2 L${item.right - navbarLeft} 2`);
    }
    positionsArray.push(item);
  }
  return positionsArray;
}

pathTo = findNavItemBounding();

var ulProjects = function() {
  underlinePath.setAttribute("d", `M${pathTo[0].left} 2 L${pathTo[0].right} 2`);
};
var ulLearn = function() {
  underlinePath.setAttribute("d", `M${pathTo[1].left} 2 L${pathTo[1].right} 2`);
};
var ulAbout = function() {
  toArrow(true);
  underlinePath.setAttribute("d", `M${pathTo[2].left} 2 L${pathTo[2].right} 2`);
};
var ulContact = function() {
  underlinePath.setAttribute("d", `M${pathTo[3].left} 2 L${pathTo[3].right} 2`);
};

navbar.children.item(0).onmouseover = ulProjects;
navbar.children.item(1).onmouseover = ulLearn;
navbar.children.item(2).onmouseover = ulAbout;
navbar.children.item(3).onmouseover = ulContact;

var underlining = function() {
  if (pageState.aboutActive) {
    toggleCloseBtn();
    ulAbout();
  } else if (pageState.projectsActive) {
    ulProjects();
  } else {
    toggleCloseBtn();
    underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);
  }
  toArrow(false);
};

navbar.onmouseleave = underlining;

// About Me
var aboutLink = document.getElementById("about-link");
var aboutMe = document.getElementById("greeting");
var myName = document.getElementById("my-name");

var closeSign = document.getElementById("close-btn");
var xPathTop = document.getElementById("path-top");
var xPathMid = document.getElementById("path-mid");
var xPathBottom = document.getElementById("path-bottom");

var strings = document.getElementsByClassName("string");

var arrowHead = document.getElementById("arrow-head");
var arrowStick = document.getElementById("arrow-stick");

var moreBtn = document.getElementById("more-btn");

var toggleCloseBtn = function() {
  if (pageState.aboutActive) {
    xPathTop.setAttribute("d", `M5 5 L15 15`);
    xPathMid.setAttribute("d", `M10 10 L10 10`);
    xPathBottom.setAttribute("d", `M5 15 L15 5`);
  } else {
    xPathTop.setAttribute("d", `M5 10 L10 10`);
    xPathMid.setAttribute("d", `M10 10 L10 10`);
    xPathBottom.setAttribute("d", `M10 10 L15 10`);
  }
}

var toArrow = function(mouseEvent) {
  if (!pageState.aboutActive) {
    if (mouseEvent) {
      xPathTop.setAttribute("d", `M5 10 L10 15`);
      xPathMid.setAttribute("d", `M10 5 L10 15`);
      xPathBottom.setAttribute("d", `M10 15 L15 10`);
    } else {
      xPathTop.setAttribute("d", `M5 10 L10 10`);
      xPathMid.setAttribute("d", `M10 10 L10 10`);
      xPathBottom.setAttribute("d", `M10 10 L15 10`);
    }
  }
}
myName.onmouseover = function() {
  toArrow(true);
  ulAbout();
}
myName.onmouseleave = function() {
  toArrow(false);
  underlining();
}
var toggleMoreBtn = function(opacity) {
  moreBtn.style.opacity = opacity;
}
var openAboutMe = function() {
  pageState.aboutActive = true;
  if(window.innerHeight < 700) {
    aboutMe.style.height = "auto";
    aboutMe.style.overflowY = "scroll";
  } else {
    aboutMe.style.height = "100%";
  }

  targetObject.style.opacity = 0.2;
  targetObject.style.transform = `scale(1) translate(-50%, -50%)`;

  aboutMe.style.padding = "20px 20px;"
  aboutMe.style.backgroundColor = "rgb(255, 255, 255)";

  myName.style.top = "-22px";
  myName.style.opacity = 0;

  closeSign.style.cursor = "pointer";

  toggleMoreBtn(1);

  dash.setAttribute("d", `M5 10 L140 10`);

  for(var p = 0; p < strings.length; p++) {
    strings.item(p).style.bottom = "0px";
    strings.item(p).style.opacity = 1;
  }
  underlining();
}

var closeAboutMe = function() {
  pageState.aboutActive = false;
  
  targetObject.style.opacity = 1;
  targetObject.style.transform = `scale(1) translate(-50%, -50%)`;

  closeSign.style.cursor = "default";

  toggleMoreBtn(0);

  myName.style.left = "130px";
  myName.style.top = "0";
  myName.style.opacity = 1;

  dash.setAttribute("d", `M110 10 L140 10`);

  targetObject.style.left = "50vw";

  var timer = setInterval(() => {
    aboutMe.style.height = "60px";
    if(window.innerHeight < 700) {
      aboutMe.style.overflowY = "hidden";
    }
    clearInterval(timer);
  }, 400);
  for(var p = 0; p < strings.length; p++) {
    strings.item(p).style.bottom = "-2.5rem";
    strings.item(p).style.opacity = 0;
  }
  underlining();
}

var toggleAboutPage = function() {
  if (!pageState.aboutActive) {
    hidePage(pageState.projectsActive, closeProjects);
    hidePage(pageState.learnActive, null);
    hidePage(pageState.contactActive, null);
    openAboutMe();
  } else {
    closeAboutMe();
  }
}

myName.onclick = toggleAboutPage;
aboutLink.onclick = toggleAboutPage;
closeSign.onclick = toggleAboutPage;
