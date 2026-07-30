document.addEventListener("DOMContentLoaded", function () {
  const btnPrijava = document.getElementById("btn-prijava");
  const modalLogin = document.getElementById("modal-login");
  const modalClose = document.getElementById("custom-modal-close");

  // otvori modal
  btnPrijava.addEventListener("click", function (e) {
    e.preventDefault();
    modalLogin.classList.remove("hidden");
  });

  // zatvori modal klikom na X
  modalClose.addEventListener("click", function () {
    modalLogin.classList.add("hidden");
  });

  // zatvori modal klikom izvan
  window.addEventListener("click", function (e) {
    if (e.target === modalLogin) {
      modalLogin.classList.add("hidden");
    }
  });

  // tab prijava
  document.getElementById("tab-prijava").addEventListener("click", function () {
    document.getElementById("forma-prijava").classList.remove("hidden");
    document.getElementById("forma-registracija").classList.add("hidden");
    this.classList.add("aktivan");
    document.getElementById("tab-registracija").classList.remove("aktivan");
  });

  // tab registracija
  document
    .getElementById("tab-registracija")
    .addEventListener("click", function () {
      document.getElementById("forma-registracija").classList.remove("hidden");
      document.getElementById("forma-prijava").classList.add("hidden");
      this.classList.add("aktivan");
      document.getElementById("tab-prijava").classList.remove("aktivan");
    });
});
