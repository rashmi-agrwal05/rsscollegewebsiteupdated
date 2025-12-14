// Desktop Image Slider (Hero Slider)
(function () {
    const sliderInner = document.querySelector(".slider-inner");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-slider");
    const nextBtn = document.querySelector(".next-slider");

    if (!sliderInner || slides.length === 0) return;

    let index = 0;
    const total = slides.length;

    function updateSlider() {
        sliderInner.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % total;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        updateSlider(); 
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    setInterval(nextSlide, 4000);
})();

// Mobile Overlay Dropdown Accordion
(function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    dropdownButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const content = this.nextElementSibling;
            if (!content) return;

            // Close others
            document.querySelectorAll(".dropdown-content-mobile").forEach(dc => {
                if (dc !== content) {
                    dc.style.maxHeight = null;
                }
            });

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
})();

//Close Mobile Menu After Clicking Any Link
(function () {
    const mobileMenuToggle = document.getElementById("menu-toggle");
    const mobileLinks = document.querySelectorAll(".overlay-content a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenuToggle) {
                mobileMenuToggle.checked = false;
            }
        });
    });
})();

// Gallery Image Click → Simple Lightbox (Optional but Clean)
(function () {
    const galleryImages = document.querySelectorAll("#gallery img");

    if (galleryImages.length === 0) return;

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0,0,0,0.85)";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.zIndex = "5000";

            const image = document.createElement("img");
            image.src = img.src;
            image.style.maxWidth = "90%";
            image.style.maxHeight = "90%";
            image.style.borderRadius = "10px";
            image.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";

            overlay.appendChild(image);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => {
                overlay.remove();
            });
        });
    });
})();


//Smooth Scroll for Internal Links (Safe)

(function () {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
})();
/* =====================================
   GALLERY SLIDER FUNCTIONALITY
===================================== */

(function () {
    const track = document.querySelector(".gallery-track");
    const prevBtn = document.querySelector(".gallery-btn.prev");
    const nextBtn = document.querySelector(".gallery-btn.next");
    const viewport = document.querySelector(".gallery-viewport");

    if (!track || !prevBtn || !nextBtn || !viewport) return;

    const images = track.querySelectorAll("img");
    let currentIndex = 0;

    function getImageWidth() {
        return images[0].offsetWidth + 20; // image width + gap
    }

    function updateSlider() {
        const imageWidth = getImageWidth();
        track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        const visibleImages = Math.floor(viewport.offsetWidth / getImageWidth());

        if (currentIndex < images.length - visibleImages) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener("resize", updateSlider);
})();
