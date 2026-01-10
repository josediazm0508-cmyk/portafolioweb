document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("year").textContent = new Date().getFullYear()

    const btnMenu = document.getElementById("btn_menu");
    const menu = document.getElementById("sectionsdiv");
    const overlay = document.getElementById("overlay");
    const menuLinks = menu.querySelectorAll("a");

    btnMenu.addEventListener("click", () => {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

})