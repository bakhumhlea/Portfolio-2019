var projectsLink = document.getElementById("projects-link");
var projectsPage = document.getElementById("projects-page");
var projectDisplay = document.getElementById("project-display");
projectsLink.onclick = toggleProjectsPage;

var openProjects = function() {
  pageState.projectsActive = true;
  projectsPage.style.opacity = 1;
  projectsPage.style.width = "100%";
  targetObject.style.top = `9vh`;
  targetObject.style.left = `50vw`;
  targetObject.style.transform = `scale(0.2) translate(-50%, -50%)`;
  ulProjects();
}
var closeProjects = function() {
  pageState.projectsActive = false;
  projectsPage.style.opacity = 0;
  projectsPage.style.width = "0px";
  targetObject.style.top = `50vh`;
  targetObject.style.left = `50vw`;
  targetObject.style.transform = `scale(1) translate(-50%, -50%)`;
  underlining();
}

function hidePage(pagestate, callback) {
  pagestate = false;
  if (callback) {
    callback();
  }
}

function toggleProjectsPage() {
  if (!pageState.projectsActive) {
    hidePage(pageState.aboutActive, closeAboutMe);
    hidePage(pageState.learnActive, null);
    hidePage(pageState.contactActive, null);
    openProjects();
    console.log(pageState.aboutActive? "about open":"about close");
  } else {
    closeProjects();
  }
}