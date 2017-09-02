(function(){

    const host = 'https://weixin.jirengu.com'
    
    $.ajax(`${host}/weather/`)
    .done((information)=>{
       let weather = information.weather[0];
       let suggestions = weather.today.suggestion
       showSuggestion(suggestions)
    })

    function showSuggestion(suggestions){
        let carWashing = suggestions.car_washing.details
        let dressing = suggestions.dressing.details
        let preventionFlu  = suggestions.flu.details
        let sport = suggestions.sport.details
        let travel = suggestions.travel.details
        let skinProtection = suggestions.uv.details
        let array = [carWashing,dressing,preventionFlu,sport,travel,skinProtection]
        let items = document.querySelectorAll(".suggestion>li>span")
        items.forEach((item,index)=>{
            item.textContent = array[index]
        })
    }

})()