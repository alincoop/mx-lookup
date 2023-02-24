const form = document.getElementById("form");
const output = document.getElementById("output");

const statuscard = document.getElementById("status");
const googlecard = document.getElementById("google");
const microsoftcard = document.getElementById("microsoft");
const othercard = document.getElementById("other");

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    let domain = document.getElementById("domain");
    if (domain.value == "") {
      invalidInput();
    } else {
      clearOutput();
      callDns(domain);
    }
  },
  true
);

function callDns(domain) {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/dnslookup?domain=" + domain.value,
    headers: { "X-Api-Key": "VSXklFKf5YVTjaQ2nop34A==kWvYOhxISJjK8oGJ" },
    contentType: "application/json",
    success: function (result) {
      let google = false;
      let microsoft = false;
      let other = false;
      console.log(domain.value);
      for (object of result) {
        if (object.record_type == "MX" && object.value.includes("google")) {
          google = true;
          googlecard.style.display = "block";
          statuscard.style.display = "none";
        } else if (
          object.record_type == "MX" &&
          object.value.includes("outlook")
        ) {
          microsoft = true;
          microsoftcard.style.display = "block";
          statuscard.style.display = "none";
        } else if (object.record_type == "MX") {
          other = true;
          othercard.style.display = "block";
          statuscard.style.display = "none";
        } else {
          statuscard.innerHTML = "No results found";
        }
      }
      console.log("Google=" + google);
      console.log("Microsoft=" + microsoft);
      console.log("Other=" + other);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

function invalidInput() {
  console.clear();
  console.log("No domain provided");
  statuscard.innerHTML = "Enter a domain";
  statuscard.style.display = "block";
}

function clearOutput() {
  console.clear();
  googlecard.style.display = "none";
  microsoftcard.style.display = "none";
  othercard.style.display = "none";

  statuscard.innerHTML = "<img src='loading.gif' alt='Loading...'>";
  statuscard.style.display = "block";
}
