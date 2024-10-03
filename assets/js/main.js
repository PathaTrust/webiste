/**
 * Template Name: Impact
 * Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 80
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          console.log(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// Custom message modal functionality
const messageModal = document.getElementById("messageModal");
const closeMessageBtn = document.getElementsByClassName("close-message")[0];
const messageText = document.getElementById("messageText");

// Function to open the message modal
function showMessageModal(message) {
  messageText.textContent = message;
  messageModal.style.display = "block";
}

// Close the message modal
closeMessageBtn.onclick = function () {
  messageModal.style.display = "none";
};

// Close modal on click outside
window.onclick = function (event) {
  if (event.target == messageModal) {
    messageModal.style.display = "none";
  }
};

// Modal functionality
const modal = document.getElementById("volunteerModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
const loader = document.getElementById("loader"); // Loader element

// Function to disable scrolling and account for scrollbar
function disableScroll() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`; // Compensate for scrollbar width
}

// Function to enable scrolling and reset padding
function enableScroll() {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0"; // Reset padding
}
// Add inline styles for smooth transition
modal.style.transition = "opacity 1s ease-in-out"; // Smooth fade-in and fade-out
modal.style.opacity = 0; // Initial hidden state

window.onload = function () {
  setTimeout(() => {
    modal.style.display = "block"; // Set display to block
    setTimeout(() => {
      modal.style.opacity = 1; // Gradually change opacity to 1
    }, 10); // Small delay to ensure the transition applies smoothly
    disableScroll();
  }, 1500);
};

// Open the modal
btn.onclick = function () {
  modal.style.display = "block";
  disableScroll();
};

// Close the modal
span.onclick = function () {
  modal.style.display = "none";
  enableScroll();
};

// Close modal on click outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    enableScroll();
  }
};

// Google Sheets Integration
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxl4wUF9RtILn3GJB8453ujQi10OX9hZThkRVH_74VQNre9KbVfCOkO8XJpIEDTEnph/exec"; // Update with your script URL
const form = document.getElementById("volunteerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loader
  loader.style.display = "block";

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json", // Add Accept header
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Hide loader
      loader.style.display = "none";

      if (data.status === "success") {
        showMessageModal("Thank you for  showing Interest in Patha!"); // Use custom modal here
        form.reset(); // Optionally reset the form
        modal.style.display = "none"; // Close modal after successful submission
        enableScroll(); // Re-enable scrolling
      } else {
        throw new Error("Submission failed");
      }
    })
    .catch((error) => {
      // Hide loader
      loader.style.display = "none";
      console.error("Error:", error);
      showMessageModal("Error submitting form!"); // Use custom modal here
    });
});
