const collapseTrigger = document.querySelector("#collapse_icon");
const paymentBar = document.querySelector("#payment_bar");
const menuTrigger = document.querySelector("#profile_menu");
const menu = document.querySelector("#dropdown_menu_content");
const allMenuItems = menu.querySelectorAll('[role="menuitem"]');
// last part of the project.
const notCompletedIcon = document.querySelectorAll("#not-completed-icon");
const completedIcon = document.querySelectorAll("#completed-icon");
const loadingSpinnerIcon = document.querySelectorAll("#loading-spinner-icon");
const collapseContents = document.querySelector("#collapse-content");
const boxContainer = document.querySelector("#box-container");
const uncollapseContents = document.querySelector("#uncollapse-content");
const toggleContainer = document.querySelectorAll(".toggle-container");



collapseContents.addEventListener("click", function () {
  boxContainer.classList.add("box-container-inactive");
  collapseContents.style.display = "none";
  uncollapseContents.style.display = "block";
});

uncollapseContents.addEventListener("click", function () {
  boxContainer.classList.remove("box-container-inactive");
  uncollapseContents.style.display = "none";
  collapseContents.style.display = "block";
});


function SpiningIcon() {}
//To load the spinning icon from uncomplete to completed
notCompletedIcon.forEach(function (notCompletedIcon, index) {
  notCompletedIcon.addEventListener("click", function (event) {
    loadingSpinnerIcon[index].style.display = "block";
    event.currentTarget.style.display = "none";
    setTimeout(function () {
      loadingSpinnerIcon[index].style.display = "none";
      completedIcon[index].style.display = "block";
    }, 1500);
  });
});

//To load the spinning icon from completed to uncomplete
completedIcon.forEach(function (completedIcon, index) {
  completedIcon.addEventListener("click", function (event) {
    event.currentTarget.style.display = "none";
    notCompletedIcon[index].style.display = "block";
  });
});


function app() {
  function handleMenuEscapeKeypress(event) {
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  function handleMenuItemArrowKeyPress(event, menuItemIndex) {
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;
    const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
    const previousMenuItem = allMenuItems.item(menuItemIndex - 1);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();
        return;
      }
      nextMenuItem.focus();
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }

      previousMenuItem.focus();
    }
  }
  //  open_menu function
  function openMenu() {
    menuTrigger.ariaExpanded = "true";
    allMenuItems.item(0).focus();
    menu.addEventListener("keyup", handleMenuEscapeKeypress);

    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }

  // close_menu function
  function closeMenu() {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  function toggleMenu() {
    const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
    menu.classList.toggle("dropdown_content_active");
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  menuTrigger.addEventListener("click", toggleMenu);

  function collapsePayment() {
    collapseTrigger.addEventListener("click", function () {
      paymentBar.classList.toggle("payment_bar_inactive");
    });
  }
  collapsePayment();
}
app();
