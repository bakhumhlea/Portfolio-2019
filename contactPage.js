var contactLink = document.getElementById("contact-link");

contactLink.onclick = toggleContactPage;

var openContact = function() {
  pageState.contactActive = true;
  ulContact();
}
var closeContact = function() {
  pageState.contactActive = false;
  underlining();
}

function hidePage(pagestate, callback) {
  pagestate = false;
  if (callback) {
    callback();
  }
}

function toggleContactPage() {
  if (!pageState.contactActive) {
    hidePage(pageState.aboutActive, closeAboutMe);
    hidePage(pageState.learnActive, null);
    hidePage(pageState.contactActive, null);
    openContact();
    console.log(pageState.aboutActive? "about open":"about close");
  } else {
    closeContact();
  }
}