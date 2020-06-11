const activeItem = document.querySelector(".active-item");
const copyBtn = document.querySelector(".copy-btn");
const copiedMsg = document.querySelector(".copied-msg");
const yourInput = document.querySelector(".your-input");
const submitBtn = document.querySelector(".submit-btn");
const listContainer = document.querySelector(".list-container");
const clearListBtn = document.querySelector(".clear-list");

// Date Parameters
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let hh = String(today.getHours()).padStart(2, "0");
let min = String(today.getMinutes()).padStart(2, "0");
let yyyy = today.getFullYear();

today = `${mm}/${dd}/${yyyy} ${hh}:${min}`;

if (localStorage.getItem("reflinks") == null) {
  submitBtn.style.display = "block";
}

// Onclick Function to COPY active Item
function copyToClipboard() {
  // Select the text (Select() only works for INPUT & TEXTAREA)
  activeItem.select();

  // Copy the selection to clipboard
  document.execCommand("copy");

  // Add Copied Element on screen
  copiedMsg.classList.add("active-displayed");

  setTimeout(() => {
    copiedMsg.classList.add("unactive-displayed");
  }, 2000);
}

// LocalStorage Conditions
const localStorageLinks = JSON.parse(localStorage.getItem("reflinks"));

let referralLinks =
  localStorage.getItem("reflinks") !== null ? localStorageLinks : [];

// Print to List LocalStorage Elements
function printLocalStorage() {
  // Calculate fixed index

  if (referralLinks !== null) {
    referralLinks.forEach((link) => {
      const newDiv = document.createElement("div");
      const date = link.date;
      const rank = referralLinks.indexOf(link) + 1;

      newDiv.innerHTML = `<p class="rank">${rank}</p>
      <p id="${rank}" class="list-item">${link.refCode}</p>
      <p class="date-added">${date}</p>`;

      newDiv.classList.add("list-item");
      listContainer.appendChild(newDiv);
    });
  }
}

printLocalStorage();

// Set CURRENT REFERRAL to 1st List Item, if any
function updateCurrentLink() {
  if (localStorage.length !== 0) {
    let variable = JSON.parse(localStorage.getItem("reflinks"));
    activeItem.innerText = variable[0].refCode;
  } else {
    activeItem.innerText = "";
  }
}

// PUSH Submitted Link to WAITING LIST
function submitRef() {
  const newDiv = document.createElement("div");

  // Formatted element for Local Storage
  const link = {
    index: referralLinks.length,
    refCode: yourInput.value,
    date: today,
  };

  if (yourInput.value.length !== 3) {
    alert("Enter a valid input (3 characters)");
  } else {
    newDiv.innerHTML = `<p class="rank">${link.index + 1}</p>
  <p id="${link.index + 1}">${yourInput.value}</p>
  <p class="date-added">${today}</p>`;

    newDiv.classList.add("list-item");
    listContainer.appendChild(newDiv);

    submitBtn.classList.add("clicked");
    yourInput.value = "";
    referralLinks.push(link);
    localStorage.setItem("reflinks", JSON.stringify(referralLinks));

    updateCurrentLink();

    // Equivalent to CLICK EVENT LISTENER + CLICK SUBMIT EVENT LISTENER.
    if (copiedMsg.classList.contains("active-displayed")) {
      copiedMsg.classList.remove("active-displayed");

      switchRanksList();
    }
    window.location.reload();
  }
}

updateCurrentLink();

// When a CODE is copied and used, move it from #1 to #last inside Waiting List. (On SUBMIT click, your code is second-to-last)
function switchRanksList() {
  if (referralLinks.length >= 2) {
    // Remove 1st link
    let temp = referralLinks.shift();
    referralLinks.push(temp);
    localStorage.setItem("reflinks", JSON.stringify(referralLinks));

    // Push Initial Current Link
    listContainer.innerHTML = "";
    printLocalStorage();
    updateCurrentLink();
  }
}

// EVENT LISTENERS

// Clear List BUTTON
clearListBtn.addEventListener("click", () => {
  referralLinks = [];
  localStorage.clear();
  listContainer.innerHTML = "";
  activeItem.innerHTML = "";
});

copyBtn.addEventListener("click", () => {
  submitBtn.style.display = "block";
});
