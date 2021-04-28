import "https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js"

const mapbox_token = "pk.eyJ1IjoiYWxhZGRpbjczMSIsImEiOiJja255NWh2ejcwMTcxMnZwZXdtZ2ltZTd4In0.wW4BQ5TLWj8qHa3GF48BCA"

let baseURL = "https://disease.sh/v3/covid-19/jhucsse"

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom:1.5,
    center: [0,20]
});

const getColorFromInfectedCount = count => {
    if(count >= 10000) {
        return "#ff9292"
    }else if (count >= 5000) {
        return "#bbf1fa"
    }else {
        return "#ffdcdc"
    }
}


fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        // data is an array here
        console.log(data)
        var situation = document.getElementById('situation');
        data.filter(ele => ele.country && (ele.county || ele.province)).forEach(ele => {
            const {coordinates, stats, country, county, province} = ele 
            const area = county || province
            var marker = new mapboxgl.Marker({
                color: getColorFromInfectedCount(stats.confirmed),
                })
                .setLngLat([coordinates.longitude, coordinates.latitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + "country: " + country +'</h3><h3>'  + "area: " + area +'</h3><h3>' + "confimed: " + stats.confirmed +'</h3><h3>' +  "deaths: " + stats.deaths +'</h3>')
                )
                .addTo(map);
            
        })
        
    })

