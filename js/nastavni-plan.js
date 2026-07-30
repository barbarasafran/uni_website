let sviKolegiji = [];
let odabraniKolegiji = [];
let oznaceniKolegijId = null;

async function ucitajKolegije() {
  const token = localStorage.getItem("jwt");

  if (!token) return;

  try {
    const response = await fetch(
      "https://www.fulek.com/data/api/supit/curriculum-list/hr",
      {
        headers: { Authorization: "Bearer " + token },
      },
    );

    const data = await response.json();
    sviKolegiji = data.data;

    document.getElementById("curriculum-poruka").classList.add("hidden");
    prikaziCurriculum();
  } catch (err) {
    document.getElementById("curriculum-content").innerHTML =
      "<p>Greška pri učitavanju kolegija.</p>";
  }
}

function prikaziCurriculum() {
  document.getElementById("curriculum-content").innerHTML = `
    <div id="autocomplete-wrapper">
      <input type="text" id="search-kolegij" placeholder="Klikni ili upiši za pretragu...">
      <button id="btn-dodaj">Dodaj</button>
      <ul id="autocomplete-lista"></ul>
    </div>
    <table id="tablica-kolegija">
      <thead>
        <tr>
          <th>Naziv</th>
          <th>ECTS</th>
          <th>Sati</th>
          <th>Ukloni</th>
        </tr>
      </thead>
      <tbody id="tablica-body"></tbody>
      <tfoot>
        <tr>
          <td><strong>Ukupno</strong></td>
          <td id="ukupno-ects">0</td>
          <td id="ukupno-sati">0</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  `;

  const input = document.getElementById("search-kolegij");
  const btnDodaj = document.getElementById("btn-dodaj");

  // prikaži sve kad klikneš na input
  input.addEventListener("focus", function () {
    prikaziListu("");
  });

  // filtriraj dok tipkaš
  input.addEventListener("input", function () {
    oznaceniKolegijId = null;
    prikaziListu(this.value);
  });

  // Enter dodaje označeni ili prvi kolegij
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      dodajOznaceni();
    }
  });

  // gumb Dodaj
  btnDodaj.addEventListener("click", function () {
    dodajOznaceni();
  });

  // sakrij listu kad klikneš izvan
  document.addEventListener("click", function (e) {
    const wrapper = document.getElementById("autocomplete-wrapper");
    if (wrapper && !wrapper.contains(e.target)) {
      document.getElementById("autocomplete-lista").innerHTML = "";
    }
  });
}

function prikaziListu(upit) {
  const lista = document.getElementById("autocomplete-lista");
  lista.innerHTML = "";

  const filtrirani = sviKolegiji
    .filter((k) => k.kolegij.toLowerCase().includes(upit.toLowerCase()))
    .sort((a, b) => a.kolegij.localeCompare(b.kolegij));

  if (filtrirani.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nema rezultata";
    li.style.color = "#999";
    li.style.cursor = "default";
    lista.appendChild(li);
    return;
  }

  filtrirani.slice(0, 10).forEach(function (kolegij) {
    const li = document.createElement("li");
    li.textContent = kolegij.kolegij;
    li.dataset.id = kolegij.id;

    li.addEventListener("mousedown", function (e) {
      e.preventDefault(); // spriječi blur na inputu
      oznaceniKolegijId = kolegij.id;
      document.getElementById("search-kolegij").value = kolegij.kolegij;
      lista.innerHTML = "";
    });

    lista.appendChild(li);
  });
}

function dodajOznaceni() {
  if (oznaceniKolegijId) {
    odaberiKolegij(oznaceniKolegijId);
    oznaceniKolegijId = null;
    document.getElementById("search-kolegij").value = "";
    return;
  }

  // ako ništa nije označeno, uzmi prvi iz liste
  const lista = document.getElementById("autocomplete-lista");
  const prvi = lista.querySelector("li");
  if (prvi && prvi.dataset.id) {
    odaberiKolegij(parseInt(prvi.dataset.id));
    document.getElementById("search-kolegij").value = "";
    lista.innerHTML = "";
  }
}

async function odaberiKolegij(id) {
  if (odabraniKolegiji.find((k) => k.id === id)) return;

  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(
      "https://www.fulek.com/data/api/supit/get-curriculum/" + id,
      {
        headers: { Authorization: "Bearer " + token },
      },
    );

    const kolegij = await response.json();
    odabraniKolegiji.push(kolegij);
    osvjeziTablicu();
  } catch (err) {
    console.error("Greška pri dohvatu kolegija:", err);
  }
}

function osvjeziTablicu() {
  const tbody = document.getElementById("tablica-body");
  tbody.innerHTML = "";

  let ukupnoEcts = 0;
  let ukupnoSati = 0;

  odabraniKolegiji.forEach(function (kolegij) {
    const data = kolegij.data;

    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      data.kolegij +
      "</td>" +
      "<td>" +
      (data.ects || 0) +
      "</td>" +
      "<td>" +
      (data.sati || 0) +
      "</td>" +
      '<td><button onclick="ukloniKolegij(' +
      data.id +
      ')">X</button></td>';
    tbody.appendChild(tr);

    ukupnoEcts += data.ects || 0;
    ukupnoSati += data.sati || 0;
  });

  document.getElementById("ukupno-ects").textContent = ukupnoEcts;
  document.getElementById("ukupno-sati").textContent = ukupnoSati;
}

function ukloniKolegij(id) {
  odabraniKolegiji = odabraniKolegiji.filter(function (k) {
    return k.data.id !== id;
  });
  osvjeziTablicu();
}
