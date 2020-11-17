document.addEventListener("DOMContentLoaded", () => {
  loadJSON2((text) => {
    var json = JSON.parse(text);

    var sliderNav = document.getElementById("slider-nav");
    var projectView = document.getElementById("slider-for");

    for (var project of json["projects"]) {
      navSetup(project, sliderNav, document);
      projectSetup(project, projectView, document);
    }

    setUpSlick();
  });
});

function setUpSlick() {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  });

  $(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

function navSetup(project, sliderNav, document) {
  var img = document.createElement("img");
  img.src = project["img"];
  img.alt = project["name"];
  img.classList.add("project");
  sliderNav.appendChild(img);
}

function projectSetup(project, projectView, document) {
  var div = document.createElement("div");

  div.classList.add("card")

  var h2 = document.createElement("h2");
  h2.innerText = project["name"];
  h2.classList.add("smallmedium-h-size", "font-raleway");
  div.append(h2);

  var ul = document.createElement("ul")
  ul.classList.add("tags")
  for(var tag of project["tags"]){
    var li = document.createElement("li")
    li.innerText = tag
    li.classList.add("tags")
    ul.append(li)
  }
  div.append(ul)

  var p = document.createElement("p");
  p.classList.add("font-poiret", "text-p-size");
  p.innerText = project["desc"];
  div.append(p);


  var div2 = document.createElement("div");
  div2.classList.add("container")
  var iframe = document.createElement("iframe")
  iframe.src = project["video"]
  iframe.classList.add("responsive-iframe")
  div2.append(iframe)
  div.append(div2)



  projectView.appendChild(div);
}
