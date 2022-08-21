const menuButton = document.getElementById("toggle-menu");
const submenus = Array.from(document.querySelectorAll(".sub-menu"));

if (submenus.length !== 0) {
  submenus.forEach((submenu) => {
    submenu.addEventListener("click", (e) => {
      e.stopPropagation();
      submenu.classList.toggle("active");
      submenus.forEach((s) => {
        if (submenu.contains(s) && submenu !== s) s.classList.remove("active");
      });
    });
  });
}

if (menuButton) {
  menuButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!document.getElementById("main-menu").classList.contains("active")) {
      let overlay = document.createElement("div");
      overlay.id = "overlay";
      overlay.addEventListener("click", (ev) => {
        ev.stopPropagation();
        document.body.removeChild(document.getElementById("overlay"));
        menuButton.classList.toggle("active");
        document.getElementById("main-menu").classList.toggle("active");
      });
      document.body.insertBefore(overlay, document.querySelector("main"));
    } else {
      document.body.removeChild(document.getElementById("overlay"));
    }
    menuButton.classList.toggle("active");
    document.getElementById("main-menu").classList.toggle("active");
  });
}

const spoilersBtns = Array.from(document.querySelectorAll(".spoiler-button"));

if (spoilersBtns.length !== 0) {
  spoilersBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.classList.add("active");
      let content = e.target.parentNode.querySelector(".spoiler-content");
      if (!content.style.maxHeight) {
        content.style.maxHeight = content.scrollHeight ** 2 + "px";
        // TODO: change it ASAP
        setTimeout(() => (content.style.overflow = "visible"), 200);
      } else {
        e.target.classList.remove("active");
        content.style.overflow = "hidden";
        content.style.maxHeight = null;
      }
    });
  });
}
const toolTipsTriggers = Array.from(
  document.querySelectorAll(".tooltip-trigger")
);
if (toolTipsTriggers.length !== 0) {
  toolTipsTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", (e) => {
      const tooltip = e.target.parentNode.querySelector(".tooltip");
      const tooltipTail = e.target.parentNode.querySelector(".tooltip-tail");
      if (!tooltip.classList.contains("active")) {
        tooltip.style.left = e.clientX + "px";
        tooltip.style.top = e.target.scrollHeight + "30px";

        tooltipTail.style.left = e.clientX + "px";
        tooltipTail.style.bottom = tooltip.offsetHeight + 1 + "px";
        tooltip.classList.add("active");
        tooltipTail.classList.add("active");
      }

      tooltip.addEventListener("mouseleave", (e) => {
        tooltip.classList.remove("active");
        tooltipTail.classList.remove("active");
      });

      e.target.parentNode.addEventListener("mouseleave", (e) => {
        tooltip.classList.remove("active");
        tooltipTail.classList.remove("active");
      });
    });
  });
}

const sizeButton = document.getElementById("size");
if (sizeButton) {
  sizeButton.addEventListener("click", () => {
    document.querySelector(".main").classList.toggle("small");
    if (document.querySelector(".main").classList.contains("small")) {
      sizeButton.querySelector(".size-icon").src = "../icons/enlarge.png";
    } else {
      sizeButton.querySelector(".size-icon").src = "../icons/shrink.png";
    }
  });
}

const easyLevelButton = document.querySelector('.level-easy');
const normalLevelButton = document.querySelector('.level-normal');
const hardLevelButton = document.querySelector('.level-hard');
const normalElements = Array.from(document.querySelectorAll('.normal'));
const hardElements = Array.from(document.querySelectorAll('.hard'));

easyLevelButton.onclick = function() {
  if (localStorage.getItem('value') == 'easy'){
    localStorage.setItem('value', 'none');
    toNoneLevel();
    hardLevelButton.classList.add('active');
  }
  else {
    localStorage.setItem('value', 'easy'); 
    toEasyLevel();
  }
}

normalLevelButton.onclick = function() {
  if (localStorage.getItem('value') == 'normal'){
    localStorage.setItem('value', 'none');
    toNoneLevel();
    hardLevelButton.classList.add('active');
  }
  else {
    localStorage.setItem('value', 'normal');
    toNormalLevel();
  }
}

hardLevelButton.onclick = function() {
  localStorage.setItem('value', 'none');
  toNoneLevel();
  hardLevelButton.classList.add('active');
}

function toEasyLevel() {
  toNoneLevel();
  easyLevelButton.classList.add('active');
  normalElements.forEach((el) => el.classList.add('hide'));
  hardElements.forEach((el) => el.classList.add('hide'));
}

function toNormalLevel() {
  toNoneLevel();
  normalLevelButton.classList.add('active');
  hardElements.forEach((el) => el.classList.add('hide'));
}

function toNoneLevel() {
  normalElements.forEach((el) => el.classList.remove('hide'));
  hardElements.forEach((el) => el.classList.remove('hide'));
  easyLevelButton.classList.remove('active');
  normalLevelButton.classList.remove('active');
  hardLevelButton.classList.remove('active');
}

window.onload = function() {
  if (localStorage.getItem('value') == 'easy')
    toEasyLevel();
  else if (localStorage.getItem('value') == 'normal')
    toNormalLevel();
  else if(localStorage.getItem('value') == 'none')
  {
    toNoneLevel();
    hardLevelButton.classList.add('active');
  }
}