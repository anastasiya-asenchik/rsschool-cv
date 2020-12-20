import { sendRequest } from "./assets/request.js";
let today = new Date(),
  dat = today.getDate(),
  month = today.getMonth(),
  year = today.getFullYear();
// const requestURL = "https://coronavirus-19-api.herokuapp.com/all";
const requestURL = "https://coronavirus-19-api.herokuapp.com/countries";

// const bnt = document.querySelector('.country'
// const bnt2 = document.querySelector('.country2')

const table = document.querySelector(".table");
const tableCountry = document.querySelector(".table__country");
const globalCasesNumb = document.querySelector(".cases_numb");
const globalDeathsNumb = document.querySelector(".deaths_numb");
const globalCoveredNumb = document.querySelector(".recovered_numb");

export function getInfo () {sendRequest("GET", requestURL)
  .then((data) => {
    if (table.classList.contains("today")) {
      tableCountry.textContent = ` Сегодня ${dat}.${month + 1}.${year} года:`;
      globalCasesNumb.textContent = data[0].todayCases;
      globalDeathsNumb.textContent = data[0].todayDeaths;
      globalCoveredNumb.textContent = data[0].recovered;
    } else {
      tableCountry.textContent = `За весь период во всем мире`;
      globalCasesNumb.textContent = data[0].cases;
      globalDeathsNumb.textContent = data[0].deaths;
      globalCoveredNumb.textContent = data[0].recovered;
    }
  })
  .catch((err) => console.log(err));}

const btnAll = document.querySelector(".btn__nav_all");
const btnToday = document.querySelector(".btn__nav_today");

btnAll.addEventListener("click", () => {
    table.classList.remove("today");
    table.classList.add("all");
    getInfo()

    
});
btnToday.addEventListener("click", () => {
    table.classList.add("today");
    table.classList.remove("all");
    getInfo()
});
