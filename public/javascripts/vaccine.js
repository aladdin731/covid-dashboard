let url = "https://disease.sh/v3/covid-19/vaccine/coverage/states/"

const state_list = [
"Alabama",
 "Alaska",
 "Arizona",
 "Arkansas",
 "California",
 "Colorado",
 "Connecticut",
 "Delaware",
 "Florida",
 "Georgia",
 "Hawaii",
 "Idaho",
 "Illinois",
 "Indiana",
 "Iowa",
 "Kansas",
 "Kentucky",
 "Louisiana",
 "Maine",
 "Maryland",
 "Massachusetts",
 "Michigan",
 "Minnesota",
 "Mississippi",
 "Missouri",
 "Montana",
 "Nebraska",
 "Nevada",
 "New Hampshire",
 "New Jersey",
 "New Mexico",
 "New York State",
 "North Carolina",
 "North Dakota",
 "Ohio",
 "Oklahoma",
 "Oregon",
 "Pennsylvania",
 "Rhode Island",
 "South Carolina",
 "South Dakota",
 "Tennessee",
 "Texas",
 "Utah",
 "Vermont",
 "Virginia",
 "Washington",
 "West Virginia",
 "Wisconsin",
 "Wyoming"]


const bar_ctx = document.getElementById("vaccine-bar-chart").getContext("2d");

function createVaccineBarChart() {

  fetch(url)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          let states_situation = data.filter(entry => state_list.includes(entry.state))
          let states_vaccines = []; // {california: 1000, alaska:2000}
          states_situation.forEach(entry => {
              let num = Object.values(entry.timeline)[Object.keys(entry).length - 1]
              states_vaccines.push({state: `${entry.state}`, num_vaccines:parseInt(`${num}`)})
          })
          states_vaccines.sort((a, b) => (a.num_vaccines < b.num_vaccines) ? 1 : -1)
          // first 6 states with the highest number of vaccines
          states_vaccines = states_vaccines.slice(0, 6); 
          console.log(states_vaccines)
          let labels = [];
          let res = [];
          states_vaccines.forEach(ele => {
              labels.push(ele.state);
              res.push(ele.num_vaccines);
          })
          creatBarChart(labels, res);
      })
}

createVaccineBarChart()


let bar_chart;
function creatBarChart(labels, res) {
  if (bar_chart) {
    bar_chart.destroy();
  }

  bar_chart = new Chart(bar_ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
          label: "num_vaccine",
          data: res,
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
          padding:1
      }
    },
  });
}
