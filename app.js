window.addEventListener('load',()=>{
    
    var dateTotal= new Date();
    var year=dateTotal.getUTCFullYear();
    var month=dateTotal.getUTCMonth()+1;
    var day=dateTotal.getUTCDate();
    var hours=dateTotal.getUTCHours()+1;
    var minutes=dateTotal.getUTCMinutes();
    var seconds=dateTotal.getUTCSeconds();
    document.getElementById("hours").innerHTML=hours-1;
    document.getElementById("minutes").innerHTML=minutes+"  ";
    document.getElementById("year").innerHTML=year;
    document.getElementById("month").innerHTML=month+"/";
    document.getElementById("day").innerHTML=day+"/";

    if (month<=9) {
        month="0"+month;
    }
    if (day<=9) {
        day="0"+day;
    }
    if (hours<=9) {
        hours="0"+hours;
    }
    if (minutes<=9) {
        minutes="0"+minutes;
    }
    if (seconds<=9) {
        seconds="0"+seconds;
    }
    
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const long=position.coords.longitude;
            const lat=position.coords.latitude;
            console.log(long);
            console.log(lat);
            const api=`https://data.climacell.co/v4/timelines?location=${lat},${long}&fields=temperature&fields=weatherCode&endTime=${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z&timesteps=30m&units=metric&apikey=xCR20A90FDy1YrVnjyemDTGOnUVE3Q0H`;
            console.log(api);
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data=>{
               var temperatureDegree=data.data.timelines[0].intervals[0].values.temperature;
               var weatherCode=data.data.timelines[0].intervals[0].values.weatherCode;
                document.getElementById("temperature-degree").innerHTML=`${temperatureDegree}°C`;
                console.log(data.data.timelines[0].intervals[0].values.temperature);
                console.log(data.data.timelines[0].intervals[0].values.weatherCode);
                var weatherSummary=`Unknown`;
                if (weatherCode==1000) {
                    var weatherSummary="Clear"
                }
                if (weatherCode==1001) {
                    var weatherSummary="Cloudy"
                }
                if (weatherCode==1100) {
                    var weatherSummary="Mostly Clear"
                }
                if (weatherCode==1101) {
                    var weatherSummary="Partly Cloudy"
                }
                if (weatherCode==1102) {
                    var weatherSummary="Mostly Cloudy"
                }
                if (weatherCode==2000) {
                    var weatherSummary="Fog"
                }
                if (weatherCode==2100) {
                    var weatherSummary="Light Fog"
                }
                if (weatherCode==3000) {
                    var weatherSummary="Light Wind"
                }
                if (weatherCode==3001) {
                    var weatherSummary="Wind"
                }
                if (weatherCode==3002) {
                    var weatherSummary="Strong Wind"
                }
                if (weatherCode==4000) {
                    var weatherSummary="Drizzle"
                }
                if (weatherCode==4001) {
                    var weatherSummary="Rain"
                }
                if (weatherCode==4200) {
                    var weatherSummary="Light Rain"
                }
                if (weatherCode==4201) {
                    var weatherSummary="Heavy Rain"
                }
                if (weatherCode==5000) {
                    var weatherSummary="Snow"
                }
                if (weatherCode==5001) {
                    var weatherSummary="Flurries"
                }
                if (weatherCode==5100) {
                    var weatherSummary="Light Snow"
                }
                if (weatherCode==5101) {
                    var weatherSummary="Heavy Snow"
                }
                if (weatherCode==6000) {
                    var weatherSummary="Freezing Drizzle"
                }
                if (weatherCode==6001) {
                    var weatherSummary="Freezing Rain"
                }
                if (weatherCode==6200) {
                    var weatherSummary="Light Freezing Rain"
                }
                if (weatherCode==6201) {
                    var weatherSummary="Heavy Freezing Rain"
                }
                if (weatherCode==7000) {
                    var weatherSummary="Ice Pellets"
                }
                if (weatherCode==7101) {
                    var weatherSummary="Heavy Ice Pellets"
                }
                if (weatherCode==7102) {
                    var weatherSummary="Light Ice Pellets"
                }
                if (weatherCode==8000) {
                    var weatherSummary="Thunderstorm"
                }
                console.log(weatherSummary);
                weatherSummary=weatherSummary.toLowerCase();
                document.getElementById("weather-description").innerHTML=`It's ${weatherSummary}`;
                
                var apikey = '573249108f444808919796317201cf36';

                var api_url = 'https://api.opencagedata.com/geocode/v1/json'

                var request_url = api_url
                    + '?'
                    + 'key=' + apikey
                    + '&q=' + encodeURIComponent(`${lat},${long}`)
                    + '&pretty=1'
                    + '&no_annotations=1';


                    var request = new XMLHttpRequest();
                    request.open('GET', request_url, true);

                    request.onload = function() {
                        var data = JSON.parse(request.responseText);
                        const locationFound=data.results[0].components.city;
                        console.log(locationFound);
                        document.getElementById("location-timezone").innerHTML=locationFound;

                     };

                    request.send();
                    /*var apikey = '573249108f444808919796317201cf36';
                    var latitude = lat;
                    var longitude =long;

                    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

                    var request_url = api_url
                        + '?'
                        + 'key=' + apikey
                        + '&q=' + encodeURIComponent(lat + ',' + long)
                        + '&pretty=1'
                        + '&no_annotations=1';

                    // see full list of required and optional parameters:
                    // https://opencagedata.com/api#forward

                    var request = new XMLHttpRequest();
                    request.open('GET', request_url, true);

                    request.onload = function() {
                        // see full list of possible response codes:
                        // https://opencagedata.com/api#codes

                        if (request.status === 200){ 
                        // Success!
                        var data = JSON.parse(request.responseText);
                        alert(data.results[0].formatted); // print the location

                        } else if (request.status <= 500){ 
                        // We reached our target server, but it returned an error
                                            
                        console.log("unable to geocode! Response code: " + request.status);
                        var data = JSON.parse(request.responseText);
                        console.log('error msg: ' + data.status.message);
                        } else {
                        console.log("server error");
                        }
                    };

                    request.onerror = function() {
                        // There was a connection error of some sort
                        console.log("unable to connect to server");        
                    };

                    request.send();  // make the request*/
                    
                
            } )
       })
        
    };
    
    });

