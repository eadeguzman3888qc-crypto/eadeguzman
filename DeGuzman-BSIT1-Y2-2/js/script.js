// This script adds a simple intersection observer to fade in sections as you scroll down
document.addEventListener("DOMContentLoaded", function() {
    
    // Select all sections we want to fade in
    const sections = document.querySelectorAll("section");

    // Configure the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Triggers when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                // Stop observing once it has faded in
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply initial styles and start observing
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        sectionObserver.observe(section);
    });
});