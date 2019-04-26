const openSidemenu = () => {
  sideMenu.style.display = "block";
  menuBtn.removeEventListener("click", openSidemenu);
  menuBtn.addEventListener("click", closeSidemenu);
};
const closeSidemenu = () => {
  sideMenu.style.display = "none";
  menuBtn.removeEventListener("click", closeSidemenu);
  menuBtn.addEventListener("click", openSidemenu);
};

const windowResize = () => {
  if (window.innerWidth <= 768) {
    menuBtn.addEventListener("click", openSidemenu);
    closeBtn.addEventListener("click", closeSidemenu);
  } else {
    menuBtn.removeEventListener("click", openSidemenu);
    closeBtn.removeEventListener("click", closeSidemenu);
    sideMenu.style.display = "none";
  }
};

const repaidLoans = () => {
  allButton.classList.remove("loanButtonHighlight");
  pendingButton.classList.remove("loanButtonHighlight");
  currentButton.classList.remove("loanButtonHighlight");
  repaidButton.classList.add("loanButtonHighlight");

  /* More relevant codes */
};

const currentLoans = () => {
  allButton.classList.remove("loanButtonHighlight");
  pendingButton.classList.remove("loanButtonHighlight");
  currentButton.classList.add("loanButtonHighlight");
  repaidButton.classList.remove("loanButtonHighlight");

  /* More relevant codes */
};

const pendingLoans = () => {
  allButton.classList.remove("loanButtonHighlight");
  pendingButton.classList.add("loanButtonHighlight");
  currentButton.classList.remove("loanButtonHighlight");
  repaidButton.classList.remove("loanButtonHighlight");

  /* More relevant codes */
};

const allLoans = () => {
  allButton.classList.add("loanButtonHighlight");
  pendingButton.classList.remove("loanButtonHighlight");
  currentButton.classList.remove("loanButtonHighlight");
  repaidButton.classList.remove("loanButtonHighlight");

  /* More relevant codes */
};

const specLoan = event => {
  const id = event.target.parentNode.children[0].childNodes[0];
  window.location.href = `singleLoanView.html`;
};

const tdList = document.getElementsByTagName("td");
for (i = 0; i < tdList.length; i++) {
  tdList[i].onclick = specLoan;
}

/**
 * sends a request to the specified url from a form. This will change
 * the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  const form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

const verifiedCust = () => {
  allCust.classList.remove("loanButtonHighlight");
  verCust.classList.add("loanButtonHighlight");
  unverCust.classList.remove("loanButtonHighlight");

  /* More relevant codes */
};

const allCustomers = () => {
  allCust.classList.add("loanButtonHighlight");
  verCust.classList.remove("loanButtonHighlight");
  unverCust.classList.remove("loanButtonHighlight");

  /* More relevant codes */
};

const unverifiedCust = () => {
  allCust.classList.remove("loanButtonHighlight");
  verCust.classList.remove("loanButtonHighlight");
  unverCust.classList.add("loanButtonHighlight");

  /* More relevant codes */
};
