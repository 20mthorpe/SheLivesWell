document.addEventListener("DOMContentLoaded", function() {
    var toggles = document.querySelectorAll(".dropdown-toggle");
    toggles.forEach(function(toggle) {
        toggle.addEventListener("click", function() {
            var content = this.nextElementSibling;
            content.classList.toggle("show");
        });
    });
});

console.log("dropdown.js loaded")