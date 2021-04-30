let baseURL = "https://disease.sh/v3/covid-19/all"


fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        let donut_labels = ["Recovered", "Active", "Deaths"]
        let donut_nums = [data.recovered, data.active, data.deaths]
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
            '#96bb7c',
            '#fea82f',
            '#f44336',
          ],
          borderColor: [
            '#96bb7c',
            '#fea82f',
            '#f44336',
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
                    top: 20,
                    bottom: 30
                },
                font: {
                  weight: 'bold',
                  size: 20
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

