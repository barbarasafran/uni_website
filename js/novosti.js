const newsData = {
  1: {
    title: "WorldSkills Kazan 2019",
    img: "media/novost1.jpg",
    text: "Nakon godinu dana priprema za natjecanje WorldSkills Kazan 2019 na kojem je sudjelovalo 1300 natjecatelja iz cijelog svijeta, trud se itekako isplatio. Josip, student 3. godine preddiplomskog studija sistemskog inženjerstva osvojio je 12. mjesto u vještini IT Networks and System Administration te osvojio medalju izvrsnosti! Čestitke Josipu ali i njegovim/našim mentorima koji su ga pripremali za ovo natjecanje – voditelju studija sistemskog inženjerstva Silviju Papiću, voditelju katedre za operacijske sustave – Vedranu Dakiću i asistentu na studiju sistemskog inženjerstva – Jasminu Redžepagiću. Čestitke i našem studentu 3.godine preddiplomskog studija programskog inženjerstva Josipu Horvatu i mentoru voditelju katedre za programsko inženjerstvo - Goranu Đambiću na osvojenom 16.mjestu u vještini IT Software Solutions for Business."
  },
  2: {
    title: "Stipendijski natječaj",
    img: "media/novost2.jpg",
    text: "Nakon velikog broja prijava koje smo primili, detaljnom analizom i provjerom utvrdili smo dobitnike ovogodišnjeg stipendijskog natječaja za maturante! Stipendiju u vrijednosti od 10.000,00 kuna na potrošačkoj kartici dobivaju: Heidi Sokolovski iz Zagreba - za najbolji rezultat iz Matematike na A razini osvojila je stipendiju u iznosu od 10.000,00 kn. Tereza Žugaj iz Zagreba - za najbolji rezultat iz Matematike na B razini osvojila je stipendiju u iznosu od 10.000,00 kn. Dalija Romac iz Sinja - za najbolji rezultat iz Hrvatskog jezika na A razini te dodatna 204 boda za rezultat iz Matematike A i Engleskog jezika A osvojila je stipendiju u iznosu od 10.000,00 kn. Ella Milinović iz Zagreba - za najbolji rezultat iz Hrvatskog jezika na B razini osvojila je stipendiju u iznosu od 10.000,00 kn. Borna Skračić iz Zadra – za najbolji rezultat iz Engleskog jezika na A razini osvojio je stipendiju u iznosu od 10.000,00 kn. Lukas Božić iz Umaga - za najbolji rezultat iz Engleskog jezika na B razini osvojio je stipendiju u iznosu od 10.000,00 kn."
  },
  3: {
    title: "Algebra Junior ljetni kamp",
    img: "media/novost3.jpg",
    text: "Algebra Junior organizira edukativne i zabavne ljetne praznike za sve osnovnoškolce! I ove smo godine pripremili digitalne radionice za djecu čiji je fokus rješavanja raznih problema korištenjem tehnologije, multimedije, digitalnog dizajna i komunikacija te stvaranju sadržaja u svim multimedijskim i softverskim oblicima. Radionice se održavaju u sklopu Digitalnog ljetnog kampa u Crikvenici i Digitalne ljetne škole u Zagrebu kako bismo se družili, zabavljali i učili i na moru i na kontinentu! Na digitalnom kampu i u školi provodit će se dva različita programa koji su namijenjena djeci od 1. do 8. razreda. Ovisno o odabranom terminu, polaznici će prolaziti kroz 1. ili 2. program, a u slučaju pohađanja dvotjednih programa – oba. U prvom programu nađe nindže uče biti glazbeni menadžeri dok su u drugom novinari i kreatori informacija masovnih medija. Provjerite termine, cijene i lokacije škole i kampa na sljedećem linku."
  }
};

function openNews(id) {
  const news = newsData[id];

  document.getElementById("detail-title").textContent = news.title;
  document.getElementById("detail-img").src = news.img;
  document.getElementById("detail-text").textContent = news.text;

  document.getElementById("news-detail").classList.remove("hidden");
}

document.getElementById("close-detail").addEventListener("click", function () {
  document.getElementById("news-detail").classList.add("hidden");
});