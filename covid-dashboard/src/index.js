import "./assets/style.scss";
import { sendRequest } from "./assets/request.js";
//Актуальная дата
let today = new Date(),
  dat = today.getDate(),
  month = today.getMonth(),
  year = today.getFullYear();
//API URL
const requestURL = "https://coronavirus-19-api.herokuapp.com/countries";

const table = document.querySelector(".table");
const columnRec = document.querySelector(".recov")
const tableCountry = document.querySelector(".table__country");
const globalCasesNumb = document.querySelector(".cases_numb");
const globalDeathsNumb = document.querySelector(".deaths_numb");
const globalCoveredNumb = document.querySelector(".recovered_numb");

const btnAll = document.querySelector(".btn__nav_all");
const btnToday = document.querySelector(".btn__nav_today");

function getInfo() {
  sendRequest("GET", requestURL)
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
    .catch((err) => console.log(err));
}

btnAll.addEventListener("click", () => {
  table.classList.remove("today");
  table.classList.add("all");
  columnRec.classList.remove("hidden");
  getInfo();
});
btnToday.addEventListener("click", () => {
  table.classList.add("today");
  table.classList.remove("all");
  columnRec.classList.add("hidden");
  getInfo();
});
