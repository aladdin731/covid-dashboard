let baseURL = "https://disease.sh/v3/covid-19/all"

let totalCases = document.querySelector(".total-cases")
let activeCases = document.querySelector(".active-cases")
let recoveredCases = document.querySelector(".recovered-cases")
let deaths = document.querySelector(".deaths")
let testCases = document.querySelector(".test-cases")
let todayIncreasedCases = document.querySelector(".today-increse-cases")
let todayRecoveredCases = document.querySelector(".today-recovered-cases")
let todayDeathCases = document.querySelector(".today-death-cases")
let affectedCountries = document.querySelector(".affected-countries")

fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        totalCases.innerText = data.cases
        activeCases.innerText = data.active
        recoveredCases.innerText = data.recovered
        deaths.innerText = data.deaths
        testCases.innerText = data.tests
        todayIncreasedCases.innerText = data.todayCases
        todayRecoveredCases.innerText = data.todayRecovered 
        todayDeathCases.innerText = data.todayDeaths 
        affectedCountries.innerText = data.affectedCountries
    })

