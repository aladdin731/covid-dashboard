let URL = "https://api.covid19api.com/total/country/usa/status/confirmed"



fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
    })