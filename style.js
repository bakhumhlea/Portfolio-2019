var pageCenterX;
var pageCenterY;

var navbar = document.getElementById("nav-items");
var navbarLeft = navbar.getBoundingClientRect().left;
var navbarRight = navbar.getBoundingClientRect().right;
var midNavbar;


window.onload = function onloadNow(event) {
  var vhValueText = document.getElementById("vh-value");
  var vwValueText = document.getElementById("vw-value");

  // vhValueText.innerHTML = window.innerHeight;
  // vwValueText.innerText = window.innerWidth;

  pageCenterX = window.innerWidth/2;
  pageCenterY = window.innerHeight/2;

  // console.log(`page center X:${pageCenterX} Y:${pageCenterY}`);
  
}

window.onresize = function resize() {
  navbarLeft = navbar.getBoundingClientRect().left;
  navbarRight = navbar.getBoundingClientRect().right;
  midNavbar = ((navbarRight - navbarLeft)/2 + navbarLeft)/window.innerWidth*100;
};

// var btn = document.getElementById("scroll-btn");
// btn.onclick = function scrollNow() {
//   console.log("Clicked");
//   window.scrollTo({
//     "behavior": "smooth",
//     "top": 2000,
//   });
// }
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

function handleMouseMove(event) {
  clearInterval(timer);
  pauseInfo.textContent = "click to freeze";

  event = event || window.event;

  var offX = 50 - (50*event.clientX)/(window.innerWidth/2);
  var offY = 50 - (50*event.clientY)/(window.innerHeight/2);

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

targetObject.onmouseover = function trigger() {
  showInfo();
  if (freezed) {
    return
  } else {
    targetObject.onmousemove = handleMouseMove;
  }
}

targetObject.onmouseleave = function removeEvent() {
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

function showInfo() {
  pauseInfo.style.transform = `translate(0,0)`;
  pauseInfo.style.opacity = 1;
};
function hideInfo() {
  pauseInfo.style.transform = `translate(0,-5px)`;
  pauseInfo.style.opacity = 0;
};

targetObject.onclick = function pauseAnimation() {
  var path = document.getElementById("timer-bar");
  var delay = 3000;
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
    pauseInfo.textContent = "click to freeze";
    path.style.stroke = "rgb(97, 173, 235)";
    freezed = false;
    targetObject.onmousemove = null;
    objectsArray.forEach(element => {
      element.style.animationPlayState = "running";
    });
    hideInfo();
  } else {
    path.setAttribute("d", `M0 2 L60 2`);
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

var pathTo = [];

var underline = document.getElementById("underline-svg");
var navbarWidth = navbarRight - navbarLeft;
underline.setAttribute("width", `${navbarWidth}px`);

var underlinePath = document.getElementById("underline-path");
window.onload = () => {
  underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);
}

for(var i = 0; i < navbar.childElementCount; i++) {
  var item = {
    left: navbar.children.item(i).getBoundingClientRect().left - navbarLeft,
    right: navbar.children.item(i).getBoundingClientRect().right - navbarLeft - 2
  }
  navbar.children.item(i).onmouseover = () => {
    underlinePath.setAttribute("d", `M${item.left - navbarLeft} 2 L${item.right - navbarLeft} 2`);
  }
  pathTo.push(item);
}

navbar.children.item(0).onmouseover = function() {
  underlinePath.setAttribute("d", `M${pathTo[0].left} 2 L${pathTo[0].right} 2`);
};
navbar.children.item(1).onmouseover = function() {
  underlinePath.setAttribute("d", `M${pathTo[1].left} 2 L${pathTo[1].right} 2`);
};

function ulAbout() {
  underlinePath.setAttribute("d", `M${pathTo[2].left} 2 L${pathTo[2].right} 2`);
};
navbar.children.item(2).onmouseover = ulAbout;

navbar.children.item(3).onmouseover = function() {
  underlinePath.setAttribute("d", `M${pathTo[3].left} 2 L${pathTo[3].right} 2`);
};

function hideUnderlinePath() {
  underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);
}

navbar.onmouseleave = () => {
  if (aboutActive) {
    ulAbout();
  } else {
    hideUnderlinePath();
  }
};

// About Me
var aboutActive = false;
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

var dash = document.getElementById("dash-path");

myName.onmouseover = function toArrow() {
  xPathTop.setAttribute("d", `M5 10 L10 15`);
  xPathMid.setAttribute("d", `M10 5 L10 15`);
  xPathBottom.setAttribute("d", `M10 15 L15 10`);
  underlinePath.setAttribute("d", `M${pathTo[2].left} 2 L${pathTo[2].right} 2`);
}
function resetPathOnmouseLeave() {
  initXbtn();
  underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);
};

myName.onmouseleave = resetPathOnmouseLeave;

function initXbtn() {
  xPathTop.setAttribute("d", `M5 10 L10 10`);
  xPathMid.setAttribute("d", `M10 10 L10 10`);
  xPathBottom.setAttribute("d", `M10 10 L15 10`);
}

function openAboutMe() {
  if(window.innerHeight < 660) {
    aboutMe.style.height = "auto";
  } else {
    aboutMe.style.height = "100%";
  }
  aboutActive = true;
  aboutMe.style.backgroundColor = "rgb(255, 255, 255)";

  myName.style.top = "-22px";
  myName.style.opacity = 0;
  myName.onmouseleave = null;

  closeSign.style.cursor = "pointer";

  xPathTop.setAttribute("d", `M5 5 L15 15`);
  xPathMid.setAttribute("d", `M10 10 L10 10`);
  xPathBottom.setAttribute("d", `M5 15 L15 5`);

  dash.setAttribute("d", `M0 10 L170 10`);

  underlinePath.setAttribute("d", `M${pathTo[2].left} 2 L${pathTo[2].right} 2`);

  for(var p = 0; p < strings.length; p++) {
    strings.item(p).style.bottom = "0px";
    strings.item(p).style.opacity = 1;
  }
}

myName.onclick = openAboutMe;

aboutLink.onclick = () => {
  if (!aboutActive) {
    openAboutMe();
    aboutActive = true;
    navbar.onmouseleave = null;
  } else {
    closeAboutMe();
    aboutActive = false;
    navbar.onmouseleave = hideUnderlinePath;
  }
};

function closeAboutMe() {
  var timer = setInterval(() => {
    var handle = aboutMe.style.height = "30px";
    clearInterval(timer);
  }, 400);

  aboutActive = false;

  underlinePath.setAttribute("d", `M${navbarWidth} 2 L${navbarWidth} 2`);

  closeSign.style.cursor = "default";

  myName.style.fontFamily = "Rajdhani";
  myName.style.fontSize = "inherit";
  myName.style.left = "130px";
  myName.style.top = "0";
  myName.style.opacity = 1;

  xPathTop.setAttribute("d", `M5 10 L10 10`);
  xPathBottom.setAttribute("d", `M10 10 L15 10`);

  dash.setAttribute("d", `M170 10 L170 10`);

  myName.onmouseleave = resetPathOnmouseLeave;

  targetObject.style.left = "50vw";

  for(var p = 0; p < strings.length; p++) {
    strings.item(p).style.bottom = "-2.5rem";
    strings.item(p).style.opacity = 0;
  }
}

closeSign.onclick = closeAboutMe;

var moreBtn = document.getElementById("more-btn");

moreBtn.onmouseover = function moreBtnFX() {

}
