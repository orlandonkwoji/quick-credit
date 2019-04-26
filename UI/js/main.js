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
