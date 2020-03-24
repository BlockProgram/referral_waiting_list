const activeItem = document.querySelector(".active-item");
const copyBtn = document.querySelector(".copy-btn");
const copiedMsg = document.querySelector(".copied-msg");
const yourInput = document.querySelector(".your-input");
const submitBtn = document.querySelector(".copy-btn");

// onclick function to COPY active Item
function copyToClipboard() {
  // Select the text (Select() only works for INPUT & TEXTAREA)
  activeItem.select();

  // Copy the selection to clipboard
  document.execCommand("copy");

  // Add Copied Element on screen
  copiedMsg.classList.add("displayed");

  setTimeout(() => {
    copiedMsg.classList.remove("displayed");
  }, 2000);
}

// submitRef() function : for SUBMIT BUTTON
function submitRef() {
  console.log(yourInput.value);
}
