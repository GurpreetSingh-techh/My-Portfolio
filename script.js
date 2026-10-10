document.addEventListener("DOMContentLoaded", function () {

```
// 1. Mobile navigation menu

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationItems = document.querySelectorAll("#nav-links a");

function closeMenu() {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

navigationItems.forEach(function (link) {

    link.addEventListener("click", function () {
        closeMenu();
    });

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});

window.addEventListener("resize", function () {

    if (window.innerWidth > 700) {
        closeMenu();
    }

});


// 2. Automatically update the copyright year

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 3. Reveal sections as the visitor scrolls

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .about-card, " +
    ".skill-card, .project-card, .timeline-item, " +
    ".interest-card, .contact-box"
);

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    document.body.classList.add("js-ready");

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

}


// 4. Highlight the current navigation section

const sections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                navigationItems.forEach(function (link) {

                    const matches =
                        link.getAttribute("href") ===
                        "#" + entry.target.id;

                    if (matches) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }

                });

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

}
```

});
