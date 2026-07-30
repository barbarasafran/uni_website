document.addEventListener('DOMContentLoaded', function() {

  // AOS animacije
  AOS.init({
    duration: 800,
    once: true
  });

  // Fancybox galerija
  Fancybox.bind('[data-fancybox="galerija"]', {});

  // Hamburger meni
  document.getElementById('hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('otvoreno');
  });

});