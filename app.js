const collapseTrigger = document.querySelector("#collapse_icon");
const paymentBar = document.querySelector("#payment_bar");
function app() {
  const menuTrigger = document.querySelector("#profile_menu");
  const menu = document.querySelector("#dropdown_menu_content");
  const allMenuItems = menu.querySelectorAll('[role="menuitem"]');

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
