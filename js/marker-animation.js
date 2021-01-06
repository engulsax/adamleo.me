/*document.addEventListener("DOMContentLoaded", () => {
  let markers = document.getElementsByClassName("marker");
  console.log(markers);
  let i = 0;

  function indicator(e, marker) {
    activeMarker = e;
    marker.style.left = e.offsetLeft + "px";
    marker.style.width = e.offsetWidth + "px";
  }

  for (let marker of markers) {
    let descLink = document.getElementById("link" + i + "-description");
    let videoLink = document.getElementById("link" + i + "-video");
    let demoLink = document.getElementById("link" + i + "-demo");
    let items = [descLink, videoLink, demoLink];

    let activeMarker = items[0];
    indicator(activeMarker, marker);

    items.forEach((link) => {
      link.addEventListener("click", (e) => {
        indicator(e.target, marker);
      });
    });

    window.addEventListener("resize", () => {
      indicator(activeMarker, marker);
    });
    i++;
  }
});*/
