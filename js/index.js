(function(){
    const host = 'https://weixin.jirengu.com'
    const daytimeSeperator = 12
    const enterKey = 13
    const dayMaps ={
        "周一": "Mon",
        "周二": "Tue",
        "周三": "Wed",
        "周四": "Thu",
        "周五": "Fri",
        "周六": "Sat",
        "周日": "Sun",
    }
    const weekMaps = {
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday",
        "7": "Sunday",
    }
    $.ajax(`${host}/weather/`)
     .done((info)=>{
        console.log(info);
        let weather = info.weather[0];
        let myLocation = weather['city_name'];
        let localNode = document.getElementById('location');
        localNode.textContent = myLocation;
        showWeather(weather)
     })

    function formatTime(date){
        let currentHours = date.getHours()
        let currentMinutes = date.getMinutes()
        if(currentMinutes < 10){
            currentMinutes = '0' + currentMinutes;
        }
        let suffix = currentHours > daytimeSeperator ? 'pm' : 'am'
        return `${currentHours}:${currentMinutes} ${suffix}`
    }

    function formatDate(date){
        let currentDay = weekMaps[date.getDay()]
        let currentDate = date.getDate()
        return currentDates = `${currentDay} ${currentDate}`
    }
    function setupTime(){
        let currentTime = new Date()
        let timeNode = document.getElementById('currentTime')
        timeNode.textContent = formatTime(currentTime)
        let todayDate = document.getElementById('todayDate')
        todayDate.textContent = formatDate(currentTime)
        todayDate.appendChild(setUnit('th'))
        setTimeout(setupTime, 60 * 1000)
    }

    setupTime()

    // function getImgUrl(code) {
    //     return `http://weixin.jirengu.com/images/weather/code/${code}.png`;
    // }


    function setUnit(unit){
        let unitNode = document.createElement('sup')
        unitNode.textContent = unit
        return unitNode
    }
    function showWeather(weather) {
        let todayInformation = weather.now
        let todayTemperatureNode = document.getElementById('todayTemperature')
        todayTemperatureNode.textContent = todayInformation.temperature + '°'

        // let todayImg = document.getElementById('todayImg')
        // todayImg.src = getImgUrl(todayInformation.code)


        let todayWindNode = document.getElementById('todayWind')
        todayWindNode.textContent = parseInt(todayInformation['wind_speed']) + 'mph '

        let todayPm25Node = document.getElementById('todayPm25')
        let airQuality = todayInformation['air_quality']
        let city = airQuality['city']
        
        todayPm25Node.textContent = city['pm25'] + 'μg/m'
        todayPm25Node.appendChild(setUnit(3))
    

        let futures = weather.future
        let futureDates = document.querySelectorAll('.futureDate')
        // let futureImgs = document.querySelectorAll('.futureImg')
        let futureTemperatures = document.querySelectorAll('.futureTemperature')

        futureDates.forEach((futureDate,index) =>{
            let perDay = futures[index+4]
            futureDate.textContent = dayMaps[perDay.day]
            // let futureImg = getImgUrl(perDay.code1)
            let futureTemperature = futureTemperatures[index]
            futureTemperature.textContent = perDay.high + '°' + '~'+ perDay.low + '°'
        })
    }
})()