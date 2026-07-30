document.addEventListener("DOMContentLoaded", function () {
  // PRIJAVA
  document
    .getElementById("btn-submit-login")
    .addEventListener("click", async function () {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const loginError = document.getElementById("login-error");

      loginError.classList.add("hidden");

      if (!username || !password) {
        loginError.textContent = "Ispunite sva polja.";
        loginError.classList.remove("hidden");
        return;
      }

      try {
        const response = await fetch(
          "https://www.fulek.com/data/api/user/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
          },
        );

        const data = await response.json();

        if (data.isSuccess && data.data.token) {
          localStorage.setItem("jwt", data.data.token);
          localStorage.setItem("username", username);
          azurirajNakonPrijave(username);
          document.getElementById("modal-login").classList.add("hidden");
        } else {
          loginError.textContent =
            data.message || "Pogrešno korisničko ime ili lozinka.";
          loginError.classList.remove("hidden");
        }
      } catch (err) {
        console.log(err);
        loginError.textContent = "Greška pri povezivanju s poslužiteljem.";
        loginError.classList.remove("hidden");
      }
    });

  // REGISTRACIJA
  document
    .getElementById("btn-submit-registracija")
    .addEventListener("click", async function () {
      const username = document.getElementById("reg-username").value.trim();
      const password = document.getElementById("reg-password").value.trim();
      const regError = document.getElementById("reg-error");
      const regUspjeh = document.getElementById("reg-uspjeh");

      regError.classList.add("hidden");
      regUspjeh.classList.add("hidden");

      if (!username || !password) {
        regError.textContent = "Ispunite sva polja.";
        regError.classList.remove("hidden");
        return;
      }

      try {
        const response = await fetch(
          "https://www.fulek.com/data/api/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
          },
        );

        const data = await response.json();

        if (response.ok && data.isSuccess) {
          regUspjeh.textContent = "Registracija uspješna! Možete se prijaviti.";
          regUspjeh.classList.remove("hidden");
          setTimeout(function () {
            document.getElementById("tab-prijava").click();
            document.getElementById("login-username").value = username;
          }, 2000);
        } else {
          regError.textContent = data.message || "Greška pri registraciji.";
          regError.classList.remove("hidden");
        }
      } catch (err) {
        regError.textContent = "Greška pri povezivanju s poslužiteljem.";
        regError.classList.remove("hidden");
      }
    });

  // provjeri token pri učitavanju stranice
  provjeriPrijavu();
});

function azurirajNakonPrijave(username) {
  const btnPrijava = document.getElementById("btn-prijava");
  btnPrijava.textContent = "Odjava";

  // ukloni stari event listener zamjenom elementa
  const noviBtn = btnPrijava.cloneNode(true);
  btnPrijava.parentNode.replaceChild(noviBtn, btnPrijava);

  noviBtn.addEventListener("click", function (e) {
    e.preventDefault();
    odjava();
  });

  ucitajKolegije();
}

function odjava() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  location.reload();
}

function provjeriPrijavu() {
  const token = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  if (token) {
    azurirajNakonPrijave(username);
  }
}
