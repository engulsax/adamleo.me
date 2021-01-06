const userId = "user_oQFQpwzXSktsA1AtYx3Xh";
const serviceId = "service_it880yn";
const templateId = "template_0kpoal7";

var templateParams = {
  to_name: "Adam",
  from_name: "",
  from_email: "",
  message: "",
};

document.addEventListener("DOMContentLoaded", () => {

  emailjs.init(userId);

  var form = document.getElementById("contact-form");
  var sendBtn = document.getElementById("send-email");
  var helpText = document.getElementById("help-text");
  var name = document.getElementById("name")
  var email = document.getElementById("email")
  var message = document.getElementById("message")

  getTempleParamsFromCookie()
  addStoreCookieListner([name, email, message]);

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var status = form.checkValidity()
    form.reportValidity();
    if (status) {
      sendEmail(sendBtn, helpText);
    }
  });

});

function sendEmail(sendBtn, helpText) {

  sendBtn.classList.add("background-searching")
  sendBtn.innerText = "Sending..."
  setTemplateParams()

  emailjs.send(serviceId, templateId, templateParams, userId).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      sendBtn.classList.remove("background-searching")
      sendBtn.classList.add("background-sucess")
      sendBtn.innerText = "Sent!"
      helpText.innerHTML = "I will answer within 24 hours :)"
    },
    function (error) {
      console.log("FAILED...", error);
      sendBtn.classList.remove("background-searching")
      sendBtn.classList.add("background-fail")
      sendBtn.innerText = "Failed"
      helpText.innerText = "Could not send message due to server issue!"
    }
  );
}

function getTempleParamsFromCookie(){
  document.getElementById("name").value = getCookie("from_name")
  document.getElementById("email").value = getCookie("from_email")
   //Reverse new line conversion
  document.getElementById("message").value = getCookie("message").split('\\').join('\n');
 
}

function storeTemplateParamsInCookie(){
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
 
  //Need to split to keep new lines
  var message = document.getElementById("message").value.split('\n').join('\\');;

  document.cookie = `from_name=${name}`
  document.cookie = `from_email=${email}`
  document.cookie = `message=${message}`

}

function setTemplateParams(){
  templateParams.from_name = document.getElementById("name").value;
  templateParams.from_email = document.getElementById("email").value;
  templateParams.message = document.getElementById("message").value;
}

function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function addStoreCookieListner(thingsToStore){
  for(thing of thingsToStore){
    thing.addEventListener("input", () => {
      storeTemplateParamsInCookie()
    })
  }
}
