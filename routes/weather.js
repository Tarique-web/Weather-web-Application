const { response } = require('express');
const request = require('request');

module.exports = (router) => {

    router
        .post("/weather", (req, res) => {

            const cityName = req.body.City;
            const API_Keys = process.env.API_KEYS
            const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?&access_token=${MAPBOX_TOKEN}`

            request({ url, json: true }, (error, { body }) => {
                if (body.features.length === 0) {
                    console.log({ "error": 'Unable to search location. Try another search!' })
                } else {

                    var latittude = body.features[0].center[1]
                    var longitude = body.features[0].center[0]
                    var location = body.features[0].place_name

                    console.log(location);


                    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latittude}&lon=${longitude}&appid=${API_Keys}&units=metric`
                    request(url, (err, response, body) => {

                        const objData = JSON.parse(body);
                        const arrData = [objData];

                        const Description = arrData[0].weather[0].description;
                        const icon = arrData[0].weather[0].icon;
                        const temp = arrData[0].main.temp;
                        const feels_like = arrData[0].main.feels_like;
                        const wind = arrData[0].wind.speed;

                        var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                        var DATE = new Date();
                        var day = weekday[DATE.getDay()];


                        var months = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "July",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                        ];

                        var month = months[DATE.getMonth()]
                        var date = DATE.getDate();

                        var currentDate = `${day}, ${date}${month}`
                        function formatAMPM(date) {
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            var strTime = `${hours}:${minutes}${ampm}`;
                            return strTime;
                        }

                        const Time = (formatAMPM(new Date));
                        
                        const currentDateTime = `${currentDate} ${Time}`
                        console.log(currentDateTime);

                        res.render("home", { location, Description, icon, temp, feels_like, currentDateTime })



                    })
                }


            })
        })

}