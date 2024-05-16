document.addEventListener("DOMContentLoaded", function() {
    const toggles = document.querySelectorAll(".dropdown-toggle");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", function() {
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                this.classList.remove("active");
            } else {
                content.style.display = "block";
                this.classList.add("active");
            }
        });
    });
});