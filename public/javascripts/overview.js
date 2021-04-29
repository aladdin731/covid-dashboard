let baseURL = "https://disease.sh/v3/covid-19/all"

let totalCases = document.querySelector(".total-cases")
let activeCases = document.querySelector(".active-cases")
let recoveredCases = document.querySelector(".recovered-cases")
let deaths = document.querySelector(".deaths")
let todayIncreasedCases = document.querySelector(".today-increse-cases")
let todayRecoveredCases = document.querySelector(".today-recovered-cases")
let todayDeathCases = document.querySelector(".today-death-cases")

fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        todayIncreasedCases.innerText = data.todayCases
        todayRecoveredCases.innerText = data.todayRecovered 
        todayDeathCases.innerText = data.todayDeaths 
        let donut_labels = ["Recovered", "Deaths", "Active"]
        let donut_nums = [data.recovered, data.deaths, data.active]
        updateDonutChart(donut_labels, donut_nums)
    })

const dctx = document.getElementById("donut-chart").getContext("2d");

let donut_chart;
function updateDonutChart(donut_labels, donut_nums) {
  if (donut_chart) {
    donut_chart.destroy();
  }

  donut_chart = new Chart(dctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "cases",
          data: donut_nums,
          fill: false,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
          borderWidth: 1,
          hoverOffset: 3
        },
      ],
      labels: donut_labels,
    },
    options: {
      plugins: {
            title: {
                display: true,
                text: 'Distribution of Accumulated Cases',
                padding: {
                    top: 10,
                    bottom: 30
                },
                font: {
                  weight: 'bold',
                  size: 25
                },
            }
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
          padding:1
      },
    },
  });
}

