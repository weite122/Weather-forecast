(function(){
    const host = 'https://weixin.jirengu.com'
    const daytimeSeperator = 12
    const enterKey = 13//判断是否为回车键
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

    const weatherMaps = {
        "晴": "#icon-sun",
        "多云": "#icon-cloudy",
        "晴间多云": "#icon-partlyCloudy",
        "大部多云": "#icon-partlyCloudy",
        "阴": "#icon-overcast",
        "阵雨": "#icon-heavenRain",
        "雷阵雨": "#icon-strongStorms",
        "雷阵雨伴有冰雹": "#icon-strongStorms",
        "小雨": "#icon-lightRain",
        "中雨": "#icon-lightRain",
        "大雨": "#icon-heavenRain",
        "暴雨": "#icon-heavenRain",
        "大暴雨": "#icon-heavenRain",
        "特大暴雨": "#icon-heavenRain",
        "冻雨": "#icon-hail",
        "雨夹雪": "#icon-rainhail",
        "阵雪": "#icon-lightsnow",
        "小雪": "#icon-lightsnow",
        "中雪": "#icon-snow",
        "大雪": "#icon-snow",
        "暴雪": "#icon-snow",
        "浮尘": "#icon-Duststorm",
        "扬沙": "#icon-Duststorm",
        "沙尘暴": "#icon-Duststorm",
        "强沙尘暴": "#icon-Duststorm",
        "雾": "#icon-fog",
        "霾": "#icon-haze",
        "风": "#icon-windy",
        "大风": "#icon-tornado",
        "飓风": "#icon-tornado",
        "热带风暴": "#icon-tornado",
        "龙卷风": "#icon-tornado",
        "冷": "#icon-overcast",
        "热": "#icon-taiyang",
    }


   
    $.ajax(`${host}/weather/`)
     .done((information)=>{
        let weather = information.weather[0];
        showLocation(weather)
        showWeather(weather)
     }).fail(function(){
            alert('API抽风,请过5分钟再来╮(╯▽╰)╭')
     })

    function showLocation(weather){
        let myLocation = weather['city_name'];
        let localNode = document.getElementById('location');
        localNode.textContent = myLocation;
    }

    document.addEventListener('keydown',(event)=>{
        if(event.keyCode === enterKey){
            let inputNode = document.getElementById('inputCity')
            let userInput = inputNode.value
            $.ajax(`${host}/weather/cityid?location=${userInput}`)
            .done((res) => {
                let matchedCity = res.results[0];
                let cityId = matchedCity.id;
                $.ajax(`${host}/weather/now?cityid=${cityId}`)
                    .done((weatherInformation) => {
                        let weather = weatherInformation.weather[0];
                        showWeather(weather)
                        showLocation(weather)
                  })
             })
        }
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

    function setUnit(unit){
        let unitNode = document.createElement('sup')
        unitNode.textContent = unit
        return unitNode
    }
    function showWeather(weather) {
        let todayInformation = weather.now
        let todayTemperatureNode = document.getElementById('todayTemperature')
        todayTemperatureNode.textContent = todayInformation.temperature + '°'
        let todayWindNode = document.getElementById('todayWind')
        todayWindNode.textContent = ~~(todayInformation['wind_speed']) + 'mph '
        let todayPm25Node = document.getElementById('todayPm25')
        let airQuality = todayInformation['air_quality']
        let city = airQuality['city']
        todayPm25Node.textContent = city['pm25'] + 'μg/m'
        todayPm25Node.appendChild(setUnit(3))


        let todayWeatherNode = document.querySelector('.todayweatherIcon >use')
        let weatherIcon = todayInformation['text']
        todayWeatherNode.href.baseVal = weatherMaps[weatherIcon]



        let futures = weather.future
        let futureDates = document.querySelectorAll('.futureDate')
        let futureTemperatures = document.querySelectorAll('.futureTemperature')
        let futureWeathers = document.querySelectorAll('.weatherIcon > use')
        futureDates.forEach((futureDate,index) =>{
            let perDay = futures[index+4]
            futureDate.textContent = dayMaps[perDay.day]
            let futureTemperature = futureTemperatures[index]
            futureTemperature.textContent = perDay.high + '°' + '~'+ perDay.low + '°'
            let futureWeather =  futureWeathers[index]
            let matches = perDay.text.match("^(([\\u4e00-\\u9fa5]+)/)([\\u4e00-\\u9fa5]+)")[2]
            // console.log(matches)
            futureWeather.href.baseVal = weatherMaps[matches]
        })
    }

})()