document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a.smooth-transition");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            const href = this.getAttribute("href");

            document.body.style.opacity = 0; 
            setTimeout(() => {
                window.location.href = href; 
            }, 300); 
        });
    });
});
