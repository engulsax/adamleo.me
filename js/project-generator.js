document.addEventListener("DOMContentLoaded", () => {
  loadJSON2((text) => {
    var json = JSON.parse(text);

    var sliderNav = document.getElementById("slider-nav");
    //var projectView = document.getElementById("slider-for");
    var i = 0;
    var projects = json["projects"];
    for (const project of projects) {
      cardSetup(project, sliderNav, document, i);
      i++;
    }
    setUpSlick();
    setUpModal(projects);
    setUpMarker();
  });
});

function setUpSlick() {
  $(".slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
}

function loadJSON2(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../data/projects.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

/* create cards */
function cardSetup(project, sliderNav, document, i) {
  var div = document.createElement("div");
  div.classList.add("project");

  var img = document.createElement("img");
  img.src = project["img"];
  img.alt = project["name"];
  div.append(img);

  var h3 = document.createElement("h3");
  h3.classList.add("font-raleway", "content");
  h3.innerText = project["name"];
  div.append(h3);

  var p = document.createElement("p");
  p.classList.add("font-poiret", "content");
  p.innerText = project["abstract"];
  div.append(p);

  var btn = document.createElement("button");
  btn.classList.add("primary", "center");
  btn.innerText = "More Info";
  btn.dataset.target = "#modal" + i;
  div.append(btn);

  //img.classList.add("id");
  //img.classList.add("project");
  sliderNav.appendChild(div);
}

/*<div class="project">
<img src="assets/earthrover_img.png">
<h3 class="font-raleway content">Earth Rover</h3>
<p class="font-poiret content">Internet connected robot car controlled with an Android app.</p>
<button id="modal01" class="primary center"> More Info </button>
</div>*/
/* MODAL */

/*   <div id="modal0" class="modal">
          <div class="modal-content">
            HEADER - SEE COMMENT ABOVE createHeader()
            <div class="modal-header-end"></div>
            <div class="modal-body" data-simplebar>


              DESC - SEE COMMENT ABOVE createDescription()

              VIDEO - SEE COMMENT ABOVE createVideo()

              DEMO - SEE COMMENT ABOVE createDemo()

            </div>
          </div>
        </div>
*/

function createModal(project, i) {
  var holder = document.getElementById("modal-holder");

  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal" + i;

  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  var header = createHeader(project, i);
  var desc = createDescription(project, i);
  var video = createVideo(project, i);
  var demo = createDemo(project, i);

  modalContent.append(header);

  modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.id = "modal-body-" + i;
  modalBody.append(desc);
  modalBody.append(video);
  modalBody.append(demo);
  modalContent.append(modalBody);

  modal.append(modalContent);
  holder.append(modal);

  new SimpleBar(document.getElementById("modal-body-" + i));

  setUpModalTabs(i);
}

/*
 <div class="modal-header">
              <span class="close" id="close0">&times;</span>
              <h2 class="horizontal-padding-small font-raleway "> </h2>
              <ul class="horizontal-padding-small tags">
                <li>
                  #C++
                </li>
                <li>
                  #Hardware
                </li>
              </ul>
              <nav class="horizontal-padding-small modal-links">
                <a id="link0-description" class="modal-link">Details</a>
                <a id="link0-video" class="modal-link">Video</a>
                <a id="link0-demo" class="modal-link">Demo</a>
                <div id="marker" class="marker"></div>
              </nav>
            </div>*/

function createHeader(project, i) {
  var header = document.createElement("div");
  header.classList.add("modal-header");

  var close = document.createElement("span");
  close.id = "close" + i;
  close.classList.add("close");
  close.innerHTML = "&times;";
  header.append(close);

  var h2 = document.createElement("h2");
  h2.classList.add("horizontal-padding-small", "font-raleway");
  h2.innerText = project["name"];
  header.append(h2);

  var ul = document.createElement("ul");
  ul.classList.add("horizontal-padding-small", "tags");
  for (var tag of project["tags"]) {
    var li = document.createElement("li");
    li.innerText = tag;
    ul.append(li);
  }
  header.append(ul);

  var nav = document.createElement("nav");
  nav.classList.add("horizontal-padding-small", "modal-links");

  var a1 = document.createElement("a");
  a1.classList.add("modal-link");
  a1.id = "link" + i + "-description";
  a1.innerText = "Details";
  nav.append(a1);

  var a2 = document.createElement("a");
  a2.classList.add("modal-link");
  a2.id = "link" + i + "-video";
  a2.innerText = "Video";
  nav.append(a2);

  var a3 = document.createElement("a");
  a3.classList.add("modal-link");
  a3.id = "link" + i + "-demo";
  a3.innerText = "Demo";
  nav.append(a3);

  var marker = document.createElement("div");
  marker.classList.add("marker");
  marker.id = "marker" + i;
  nav.append(marker);

  header.append(nav);

  return header;
}

/*
            <section id="modal0-description">
                <div
                  class="grid-x horizontal-padding-small horizontal-margin justify-child-text child-text-padding-right">
                  <div class="cell small-12 medium-6  ">
                    <h3 class="font-raleway small-h-size">What is it?</h3>
                    <p class="font-poiret"></p>
                  </div>
                  <div class="cell small-12 medium-6">
                    <h3 class="font-raleway small-h-size">How does it work?</h3>
                    <p class="font-poiret"></p>
                  </div>
                  <div class="cell small-12 medium-6">
                    <h3 class="font-raleway small-h-size">What did I learn?</h3>
                    <p class="font-poiret"></p>
                  </div>
                </div>
             </section>*/

function createDescription(project, i) {
  var section = document.createElement("section");
  section.id = "modal" + i + "-description";
  var div = document.createElement("div");
  div.classList.add(
    "grid-x",
    "horizontal-padding-small",
    "horizontal-margin",
    "justify-child-text",
    "child-text-padding-right"
  );
  

  var whatIsIt = document.createElement("div");
  whatIsIt.classList.add("cell", "small-12", "medium-6");
  var h31 = document.createElement("h3");
  h31.classList.add("font-raleway", "small-h-size");
  h31.innerText = "What Is It?";
  var p1 = document.createElement("p");
  p1.classList.add("font-poiret");
  p1.innerText = getTextFromFile(project["desc-is"])
  whatIsIt.append(h31);
  whatIsIt.append(p1);
  div.append(whatIsIt);

  var howDoesItWork = document.createElement("div");
  howDoesItWork.classList.add("cell", "small-12", "medium-6");
  var h32 = document.createElement("h3");
  h32.classList.add("font-raleway", "small-h-size");
  h32.innerText = "How Does It Work?";
  var p2 = document.createElement("p");
  p2.classList.add("font-poiret");
  p2.innerText = getTextFromFile(project["desc-how"])
  howDoesItWork.append(h32);
  howDoesItWork.append(p2);
  div.append(howDoesItWork);

  var whatDidILearn = document.createElement("div");
  whatDidILearn.classList.add("cell", "small-12", "medium-6");
  var h33 = document.createElement("h3");
  h33.classList.add("font-raleway", "small-h-size");
  h33.innerText = "What Did I Learn?";
  var p3 = document.createElement("p");
  p3.classList.add("font-poiret");
  p3.innerText = getTextFromFile(project["desc-learn"])
  whatDidILearn.append(h33);
  whatDidILearn.append(p3);
  div.append(whatDidILearn);

  section.append(div);

  if(project["read-more"]){
    var div2 = document.createElement("div");
    div2.classList.add(
      "grid-x",
      "horizontal-padding-small",
      "horizontal-margin",
      "justify-child-text",
      "child-text-padding-right"
    );

    var a = document.createElement("a");
    a.classList.add("button","primary" ,"center")
    a.innerText = "Read More"
    a.href = project["read-more"]
    div2.append(a)
    section.append(div2)

  }


  return section;
}

function createVideo(project, i) {

  var section = document.createElement("section");
  section.id = "modal" + i + "-video";

  if(project["video"]){

    var div = document.createElement("div");
    div.classList.add(
      "grid-x",
      "horizontal-padding-small",
      "horizontal-margin",
      "justify-child-text",
      "child-text-padding-right"
    );
  
    var div2 = document.createElement("div");
    div2.classList.add("container");
    var iframe = document.createElement("iframe");
    iframe.src = project["video"];
    iframe.classList.add("responsive-iframe");
    div2.append(iframe);
    div.append(div2);
    section.append(div);
  } else {
    section.innerHTML = `
    <h2 class="font-poiret medium-h-size center-text">Coming Soon</h2>
    <lottie-player src="anim/coming-soon.json" speed="1" autoplay loop  style="width: 25vw; height: auto; margin:auto;"></lottie-player>`
  }

  return section;
}

function createDemo(project, i) {
  var section = document.createElement("section");
  section.id = "modal" + i + "-demo";
  var div = document.createElement("div");
  div.classList.add(
    "grid-x",
    "horizontal-padding-small",
    "horizontal-margin",
    "justify-child-text",
    "child-text-padding-right"
  );

  section.append(div);
  return section;
}

function setUpModalTabs(i) {
  var descTab = document.getElementById("modal" + i + "-description");
  var descLink = document.getElementById("link" + i + "-description");

  var videoTab = document.getElementById("modal" + i + "-video");
  var videoLink = document.getElementById("link" + i + "-video");

  var demoTab = document.getElementById("modal" + i + "-demo");
  var demoLink = document.getElementById("link" + i + "-demo");

  var tabs = [descTab, videoTab, demoTab];

  hideAllTabs();
  descTab.style.display = "block";

  //Switch between tabs
  descLink.onclick = () => {
    hideAllTabs();
    descTab.style.display = "block";
  };

  videoLink.onclick = () => {
    hideAllTabs();
    videoTab.style.display = "block";
  };

  demoLink.onclick = () => {
    hideAllTabs();
    demoTab.style.display = "block";
  };

  function hideAllTabs() {
    for (tab of tabs) {
      tab.style.display = "none";
    }
  }
}

function setUpModal(projects) {
  /*Only works for as long as projects num is under 10 (which it will be)*/
  var i = 0;
  var modals = [];
  for (const project of projects) {
    createModal(project, i);

    let modal = document.getElementById("modal" + i);
    modals.push(modal);
    // Get the button that opens the modal
    let card = document.getElementById("slick-slide0" + i);
    // When the user clicks on the button, open the modal
    card.onclick = () => {
      modal.style.display = "block";
    };

    // Get the <span> element that closes the modal
    let span = document.getElementById("close" + i);

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      modal.style.display = "none";
    };
    i++;
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    for (let modal of modals) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  };
}

/* MARKER */

function setUpMarker() {
  let markers = document.getElementsByClassName("marker");
  let i = 0;

  for (let marker of markers) {
    let descLink = document.getElementById("link" + i + "-description");
    let videoLink = document.getElementById("link" + i + "-video");
    let demoLink = document.getElementById("link" + i + "-demo");
    let links = [descLink, videoLink, demoLink];

    let activeLink = links[0];
    activeLink = indicator(activeLink, marker);

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        activeLink = indicator(e.target, marker);
      });
    });

    window.addEventListener("resize", () => {
      activeLink = indicator(activeLink, marker);
    });
    i++;
  }
}

function indicator(e, marker) {
  marker.style.left = e.offsetLeft + "px";
  marker.style.width = e.offsetWidth + "px";
  return e;
}

function getTextFromFile(file)
{
    var allText = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}