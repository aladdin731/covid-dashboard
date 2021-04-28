let time_bar_url = "https://disease.sh/v3/covid-19/vaccine/coverage/states/"

const time_state_list = [
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

const bar_date = document.getElementById("bar-date")
const time_bar_ctx = document.getElementById("vaccine-time-bar-chart").getContext("2d");

var states_situation;

function fetchBarData (){
    fetch(time_bar_url)
    .then(res => res.json())
    .then(data => {
        states_situation = data.filter(entry => time_state_list.includes(entry.state))
        createTimeBarChart(states_situation)
    })
}


let start_time_bar_btn = document.querySelector(".start-time-bar");

start_time_bar_btn.addEventListener("click", fetchBarData)


function createTimeBarChart(states_situation){
    let timelines = Object.keys(states_situation[0].timeline)
    let num_rows = timelines.length

    let labels;
    let res;
    let num;
    let states_vaccines;

    const run = (i) => {
        bar_date.innerText = timelines[i]
        states_vaccines = [];
        states_situation.forEach(entry => {
            num = Object.values(entry.timeline)[i]
            states_vaccines.push({state: `${entry.state}`, num_vaccines:parseInt(`${num}`)})
        })
        states_vaccines.sort((a, b) => (a.num_vaccines < b.num_vaccines) ? 1 : -1)
        states_vaccines = states_vaccines.slice(0, 6); 
        labels = [];
        res = [];
        states_vaccines.forEach(ele => {
            labels.push(ele.state);
            res.push(ele.num_vaccines);
        })
        timeBarChart(labels, res)
        if(i < num_rows - 1) {
            setTimeout(() => run(i+1), 200)
        }
    }
    run(0)
}




let time_bar_chart;
function timeBarChart(labels, res) {
  //  console.log("bar_top")
  if (time_bar_chart) {
    time_bar_chart.destroy();
  }
  
  time_bar_chart = new Chart(time_bar_ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
          label: "num_of_vaccine",
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
      animation:{
        duration: 0
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
          padding:1
      }
    },
  });
  // console.log("bar-bottom")
}