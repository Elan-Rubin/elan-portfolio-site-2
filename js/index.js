//

let zIndex = 1;

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt
    .querySelector(".window-header")
    .addEventListener("mousedown", dragMouseDown);
  elmnt
    .querySelector(".window-header")
    .addEventListener("touchstart", dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("touchend", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("touchmove", elementDrag);

    elmnt.style.zIndex = ++zIndex;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - (e.clientX || e.touches[0].clientX);
    pos2 = pos4 - (e.clientY || e.touches[0].clientY);
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;

    var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    var maxX = window.innerWidth - elmnt.offsetWidth;
    var maxY = window.innerHeight - elmnt.offsetHeight;

    newTop = Math.max(0, Math.min(newTop, maxY));
    newLeft = Math.max(0, Math.min(newLeft, maxX));

    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("touchend", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("touchmove", elementDrag);
  }
}

// function setupWindowControls(window) {
//   const minimizeBtn = window.querySelector(".minimize-btn");
//   const maximizeBtn = window.querySelector(".maximize-btn");
//   const closeBtn = window.querySelector(".close-btn");
//   const content = window.querySelector(".window-content");

//   minimizeBtn.addEventListener("click", function () {
//     this.style.animation = "bounce 0.3s";
//     setTimeout(() => (this.style.animation = ""), 300);
//   });

//   maximizeBtn.addEventListener("click", function () {
//     this.style.animation = "bounce 0.3s";
//     setTimeout(() => (this.style.animation = ""), 300);
//   });

//   closeBtn.addEventListener("click", function () {
//     this.style.animation = "bounce 0.3s";
//     setTimeout(() => (this.style.animation = ""), 300);
//   });
// }

function animateTyping(element, text, speed) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", function () {
  var windows = document.getElementsByClassName("window");
  for (var i = 0; i < windows.length; i++) {
    dragElement(windows[i]);
    setupWindowControls(windows[i]);
    windows[i].style.zIndex = ++zIndex;
  }

  const notepadContent = document.getElementById("notepadContent");
  const notepadText =
    "Hello!\nMy name is Elan Rubin, and I'm a computer science student at Drexel University.\nMy interests lie in the intersection between technology and art.";
  animateTyping(notepadContent, notepadText, 25);
});

function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  const display = document.getElementById("display");
  display.value = "I ❤ elanrubin.com";
  display.classList.add("flash");

  let flashCount = 0;
  const flashInterval = setInterval(() => {
    flashCount++;
    if (flashCount >= 1) {
      clearInterval(flashInterval);
      display.classList.remove("flash");
      setTimeout(clearDisplay, 500);
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider'); // Select the slider container
    const slides = document.querySelectorAll('.slider img'); // Select all slides (images)
    const slideCount = slides.length; // Number of slides
    const interval = 2000; // Time for each slide transition in milliseconds (3 seconds)

    let currentIndex = 0; // Index of the current slide
    let startX = 0; // Starting x coordinate for touch
    let endX = 0; // Ending x coordinate for touch

    function goToSlide(index) {
        const offset = slides[0].clientWidth * index; // Calculate the offset based on slide width
        slider.style.transform = `translateX(-${offset}px)`; // Apply the translation to show the correct slide
        currentIndex = index; // Update the current slide index
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount; // Move to the next slide, wrap around if needed
        goToSlide(currentIndex); // Show the next slide
    }

    function previousSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Move to the previous slide, wrap around if needed
        goToSlide(currentIndex); // Show the previous slide
    }

    // Automatically transition to the next slide every few seconds
    setInterval(nextSlide, interval);

    // Optional: Add click event listeners for navigation dots
    const navLinks = document.querySelectorAll('.slider-nav a'); // Select all navigation dots
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            goToSlide(index); // Show the slide corresponding to the clicked dot
        });
    });

    // Swipe handling
    slider.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX; // Store the starting x coordinate
    });

    slider.addEventListener('touchend', function (event) {
        endX = event.changedTouches[0].clientX; // Store the ending x coordinate
        const diffX = endX - startX; // Calculate the difference
        if (Math.abs(diffX) > 50) { // If the swipe is significant
            if (diffX > 0) {
                previousSlide(); // Swipe right, go to the previous slide
            } else {
                nextSlide(); // Swipe left, go to the next slide
            }
        }
    });
});

//app icon code

document.addEventListener("DOMContentLoaded", function () {
  const appIcons = document.querySelectorAll(".app-icon");
  appIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.getAttribute("href");
      if (url.startsWith("mailto:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    });
  });
});

//update the time and volume

function updateTime() {
  try {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const timeString = `${hours}:${minutes} ${ampm}`;
    document.getElementById("timeDisplay").textContent = timeString;
  } catch (error) {
    console.error("issue with updating time", error);
  }
}

// Store window states
let windowStates = {
    'Slideshow': true,
    'Calculator': true,
    'Notepad': true,
    'Playlist': true
};

function createTerminal() {
    // const terminal = document.createElement('div');
    // terminal.className = 'window terminal';
    // terminal.style.position = 'fixed';
    // terminal.style.top = '1rem';
    // terminal.style.left = '1rem';
    // terminal.style.width = '15rem';
    // terminal.style.zIndex = '1000';

    // terminal.innerHTML = `
    //     <div class="window-header">
    //         <div class="window-title">Terminal</div>
    //     </div>
    //     <div class="window-content terminal-content">
    //         <ul class="terminal-list">
    //             ${Object.keys(windowStates).map(name => 
    //                 `<li class="terminal-item">
    //                     <span class="status-dot ${windowStates[name] ? 'active' : ''}"></span>
    //                     ${name}
    //                 </li>`
    //             ).join('')}
    //         </ul>
    //     </div>
    // `;

    // document.getElementById('desktopSection').appendChild(terminal);
    // dragElement(terminal);

    // // Add click handlers for terminal items
    // const items = terminal.querySelectorAll('.terminal-item');
    // items.forEach(item => {
    //     item.addEventListener('click', () => {
    //         const windowName = item.textContent.trim();
    //         toggleWindow(windowName);
    //     });
    // });
}

function toggleWindow(windowName) {
    const windowElement = findWindowByTitle(windowName);
    if (windowElement) {
        windowStates[windowName] = !windowStates[windowName];
        if (windowStates[windowName]) {
            windowElement.style.display = 'block';
            windowElement.style.animation = 'openWindow 0.3s';
        } else {
            windowElement.style.animation = 'closeWindow 0.3s';
            setTimeout(() => {
                windowElement.style.display = 'none';
            }, 280);
        }
        updateTerminalList();
    }
}

function findWindowByTitle(title) {
    const windows = document.getElementsByClassName('window');
    for (let window of windows) {
        const titleElement = window.querySelector('.window-title');
        if (titleElement && titleElement.textContent.trim() === title) {
            return window;
        }
    }
    return null;
}

// Update window controls to include visibility toggle
function setupWindowControls(window) {
    
    const minimizeBtn = window.querySelector('.minimize-btn');
    const maximizeBtn = window.querySelector('.maximize-btn');
    const closeBtn = window.querySelector('.close-btn');
    const windowTitle = window.querySelector('.window-title').textContent.trim();

    minimizeBtn.addEventListener('click', function() {
        this.style.animation = 'bounce 0.3s';
        setTimeout(() => this.style.animation = '', 300);
    });

    maximizeBtn.addEventListener('click', function() {
        this.style.animation = 'bounce 0.3s';
        setTimeout(() => this.style.animation = '', 300);
    });

    closeBtn.addEventListener('click', function() {
        this.style.animation = 'bounce 0.3s';
        setTimeout(() => {
            this.style.animation = '';
            toggleWindow(windowTitle);
        }, 300);
    });
}

function updateTerminalList() {
    const terminalList = document.querySelector('.terminal-list');
    if (!terminalList) return;

    terminalList.innerHTML = Object.keys(windowStates).map(name => `
        <li class="terminal-item">
            <span class="status-dot ${windowStates[name] ? 'active' : ''}"></span>
            ${name}
        </li>
    `).join('');

    // Reattach click handlers
    const items = terminalList.querySelectorAll('.terminal-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const windowName = item.textContent.trim();
            toggleWindow(windowName);
        });
    });
}

// Initialize terminal when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     createTerminal();
// });

// Update time every second
setInterval(updateTime, 1000);

// Initial time update
document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  updateTerminalList();
});
//sometiemes this doesnt work