/* =========================================================
   COZY CASTLE
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNav =
    document.getElementById("mobileNav");


mobileMenuButton.addEventListener("click", () => {

    mobileNav.classList.toggle("open");


    const icon =
        mobileMenuButton.querySelector("i");


    if (mobileNav.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* CLOSE MOBILE MENU AFTER CLICKING LINK */

const mobileLinks =
    mobileNav.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("open");


        const icon =
            mobileMenuButton.querySelector("i");


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



/* =========================================================
   HEADER BACKGROUND ON SCROLL
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");


function updateHeader() {

    if (window.scrollY > 50) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);


updateHeader();



/* =========================================================
   MENU FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");


const menuCards =
    document.querySelectorAll(".menu-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        /* REMOVE ACTIVE FROM ALL */

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });


        /* ADD ACTIVE TO CLICKED BUTTON */

        button.classList.add("active");


        /* GET SELECTED CATEGORY */

        const selectedCategory =
            button.dataset.filter;


        /* SHOW / HIDE CARDS */

        menuCards.forEach(card => {


            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});



/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   GALLERY SLIDER
========================================================= */

const galleryTrack =
    document.getElementById("galleryTrack");


const gallerySlides =
    document.querySelectorAll(".gallery-slide");


const previousButton =
    document.getElementById("galleryPrev");


const nextButton =
    document.getElementById("galleryNext");


const sliderDots =
    document.querySelectorAll(".slider-dot");


let currentSlide = 0;


/* =========================================================
   CHANGE SLIDE
========================================================= */

function showSlide(index) {


    /* LOOP BACK TO FIRST */

    if (index >= gallerySlides.length) {

        currentSlide = 0;

    }


    /* LOOP TO LAST */

    else if (index < 0) {

        currentSlide =
            gallerySlides.length - 1;

    }


    else {

        currentSlide = index;

    }


    /* MOVE SLIDER */

    galleryTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    /* UPDATE DOTS */

    sliderDots.forEach(dot => {

        dot.classList.remove("active");

    });


    sliderDots[currentSlide]
        .classList.add("active");

}


/* =========================================================
   NEXT BUTTON
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        showSlide(currentSlide + 1);

    }
);



/* =========================================================
   PREVIOUS BUTTON
========================================================= */

previousButton.addEventListener(
    "click",
    () => {

        showSlide(currentSlide - 1);

    }
);



/* =========================================================
   DOT BUTTONS
========================================================= */

sliderDots.forEach(dot => {

    dot.addEventListener(
        "click",
        () => {

            const slideNumber =
                Number(dot.dataset.slide);

            showSlide(slideNumber);

        }
    );

});



/* =========================================================
   AUTOMATIC SLIDE
========================================================= */

let galleryTimer =
    setInterval(() => {

        showSlide(currentSlide + 1);

    }, 5000);



/* =========================================================
   PAUSE AUTO SLIDE WHEN MOUSE IS OVER GALLERY
========================================================= */

const gallerySlider =
    document.querySelector(".gallery-slider");


gallerySlider.addEventListener(
    "mouseenter",
    () => {

        clearInterval(galleryTimer);

    }
);


gallerySlider.addEventListener(
    "mouseleave",
    () => {

        galleryTimer =
            setInterval(() => {

                showSlide(currentSlide + 1);

            }, 5000);

    }
);



/* =========================================================
   TOUCH / SWIPE SUPPORT FOR MOBILE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


gallerySlider.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


gallerySlider.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* SWIPE LEFT */

    if (difference > 50) {

        showSlide(currentSlide + 1);

    }


    /* SWIPE RIGHT */

    if (difference < -50) {

        showSlide(currentSlide - 1);

    }

}



/* =========================================================
   INITIAL SLIDE
========================================================= */

showSlide(0);

/* ================================
   BACK TO TOP
================================ */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});