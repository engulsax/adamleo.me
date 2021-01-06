document.addEventListener("DOMContentLoaded", () => {
  $(document).foundation();
  loadJSON((text) => {
    var json = JSON.parse(text);

    var desc = document.getElementById("desc");
    desc.innerText =  getTextFromFile(json["about"])
    desc.classList.add("text-p-size");

    var skillList = document.getElementById("skill-list");
    for (var skill of json["skills"]) {
      var li = document.createElement("li");
      var img = document.createElement("img");
      img.src = skill["img"];
      img.alt = skill["name"];
      li.appendChild(img);
      skillList.appendChild(li);
    }

    var socialList = document.getElementById("social-list");
    for (var media of json["socialMedia"]) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      var img = document.createElement("img");

      img.src = media["img"];
      img.alt = media["name"];
      a.append(img);
      a.href = media["link"];

      li.appendChild(a);
      socialList.appendChild(li);
    }
  });
});

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../data/about-me.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
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