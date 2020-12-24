import "./assets/style.scss";
import { sendRequest } from "./request.js";
import { addSpaces } from "./addSpaces.js";

const requestURLGlobal = "https://coronavirus-19-api.herokuapp.com/countries";
const requestURL =
  "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&sort=cases&allowNull=true";
const requestURLState =
  "https://disease.sh/v3/covid-19/states?sort=cases&yesterday=true&allowNull=true";
const nameGlobalCases = document.querySelector(".name-container"),
  countryCasesContainer = document.querySelector(".country-cases-container"),
  casesAmount = document.querySelector(".cases-amount"),
  deathsAmount = document.querySelector(".deaths-amount"),
  blockContent = document.querySelector(".block-content"),
  blockContentState = document.querySelector(".block-content-state"),
  globalDeaths = document.querySelector(".global-deaths"),
  btnGlobal = document.querySelector(".global"),
  btnToday = document.querySelector(".today"),
  btnGlobal100k = document.querySelector(".global100"),
  btnToday100k = document.querySelector(".today100")

function getInfo() {
  sendRequest("GET", requestURLGlobal)
    .then((data) => {
      casesAmount.textContent = addSpaces(` ${data[0].cases}`);
      deathsAmount.textContent = addSpaces(` ${data[0].deaths}`);
      btnToday.addEventListener("click", () => {
        casesAmount.textContent = addSpaces(` ${data[0].todayCases}`);
      deathsAmount.textContent = addSpaces(` ${data[0].todayDeaths}`);
      })
      btnGlobal.addEventListener("click", () => {
        casesAmount.textContent = addSpaces(` ${data[0].cases}`);
        deathsAmount.textContent = addSpaces(` ${data[0].deaths}`);
      })
    })
    .catch((err) => console.log(err));
}

function getInfoCountry() {
  sendRequest("GET", requestURL)
    .then((data) => {
      data.forEach((element) => {
        //CountryTable
        const countryContainer = document.createElement("div");
        const country = document.createElement("div");
        const countryCaseAmount = document.createElement("span");
        const countryName = document.createElement("span");
        const countryFlag = document.createElement("span");
        //SecondTable
        const blockContentRow = document.createElement("div");
        const countryDeathsAmount = document.createElement("span");
        const secondTableCountryName = document.createElement("span");

        //CountryTable
        countryContainer.classList.add("country-container");
        country.classList.add("country");
        countryCaseAmount.classList.add(
          "cases-amount",
          "country-cases__amount"
        );
        countryName.classList.add("country-name");
        countryFlag.classList.add("country-flag");
        //SecondTable
        blockContentRow.classList.add("block-content-row");
        countryDeathsAmount.classList.add("country-deaths__amount");
        secondTableCountryName.classList.add("second-table__country-name");
        //CountryTable
        countryCaseAmount.textContent = addSpaces(`${element.cases}`);
        countryName.textContent = `${element.country}`;
        countryFlag.innerHTML = `<img src="${element.countryInfo.flag}" alt="${element.country}">`;
        //SecondTable
        countryDeathsAmount.textContent = `${addSpaces(
          `${element.deaths}`
        )} deaths`;

        secondTableCountryName.textContent = `${element.country}`;
        //CountryTable
        countryCasesContainer.append(countryContainer);
        countryContainer.append(country);
        country.append(countryCaseAmount);
        country.append(countryFlag);
        country.append(countryName);
        blockContent.append(blockContentRow);
        blockContentRow.append(countryDeathsAmount);
        blockContentRow.append(secondTableCountryName);

        countryContainer.addEventListener("click", (e) => {
          casesAmount.textContent = `${element.cases}`;
          deathsAmount.textContent = `${element.deaths}`;
          globalDeaths.textContent =
            `Global Deaths` + ` ${element.country}`.toUpperCase();
          nameGlobalCases.textContent =
            `Global Cases` + ` ${element.country}`.toUpperCase();
        });
        
   btnToday.addEventListener("click", () => {
    countryCaseAmount.textContent = addSpaces(`${element.todayCases}`);
          globalDeaths.textContent =
            `Today Deaths`;
          nameGlobalCases.textContent =
            `Today Cases` ;
            countryDeathsAmount.textContent = `${addSpaces(
              `${element.todayDeaths}`
            )} deaths`;
        });
        btnGlobal.addEventListener("click", () => { 
          countryCaseAmount.textContent = addSpaces(`${element.cases}`);
               
                globalDeaths.textContent =
                  `Global  Deaths`;
                nameGlobalCases.textContent =
                  `Global Cases` ;
                  countryDeathsAmount.textContent = `${addSpaces(
                    `${element.deaths}`
                  )} deaths`;
        
              });
              btnGlobal100k.addEventListener("click", () => {
                countryCaseAmount.textContent = addSpaces(Math.round((`${element.cases}`/`${element.population}`* 100000)));
                        countryDeathsAmount.textContent = `${addSpaces(Math.round((`${element.deaths}`/`${element.population}`* 100000)))} deaths`;
                 
                    });
                    btnToday100k.addEventListener("click", () => {
                      countryCaseAmount.textContent = addSpaces(Math.round((`${element.todayCases}`/`${element.population}`* 100000)));
                              countryDeathsAmount.textContent = `${addSpaces(Math.round((`${element.todayDeaths}`/`${element.population}`* 100000)))} deaths`;
                       
                          });
      });
      
    })

    .catch((err) => console.log(err));
}
function getInfoState() {
  sendRequest("GET", requestURLState)
    .then((data) => {
      data.forEach((element) => {
        const blockContentRowState = document.createElement("div");
        const countryDeathsAmountState = document.createElement("span");
        const countryRecoveredAmountState = document.createElement("span");
        const secondTableStateName = document.createElement("span");

        //SecondTable
        blockContentRowState.classList.add("block-content-row-state");
        countryDeathsAmountState.classList.add("country-deaths__amount-state");
        secondTableStateName.classList.add("second-table__state-name");
        countryRecoveredAmountState.classList.add(
          "country-recovered__amount-state"
        );

        //StateTable

        //SecondTable
        countryDeathsAmountState.textContent = `${addSpaces(
          `${element.deaths}`
        )} deaths`;
        countryRecoveredAmountState.textContent = `${addSpaces(
          `${element.recovered}`
        )} recovered`;
        secondTableStateName.textContent = `${element.state}`;
        //StateTable
        blockContentState.append(blockContentRowState);
        blockContentRowState.append(countryDeathsAmountState);

        blockContentRowState.append(countryRecoveredAmountState);
        blockContentRowState.append(secondTableStateName);
      });
    })

    .catch((err) => console.log(err));
}

getInfoCountry();
getInfo();
getInfoState();
