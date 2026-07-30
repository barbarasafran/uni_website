const text = "Budi izvrstan u onome što voliš.";
const speed = 100;

let i = 0;
const element = document.getElementById("typewriter");

function typeWriter() {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        element.style.borderRight = "none";
    }
}

window.addEventListener("load", typeWriter);