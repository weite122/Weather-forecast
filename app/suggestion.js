let Suggestions = (function(){
    function _Suggestions(){
        this.getData()
    }
    
    _Suggestions.prototype.getData = function(){
        let _this = this
        const host = 'https://weixin.jirengu.com'
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `${host}/weather/`, true)
        xhr.onload = function(){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                let information = JSON.parse(xhr.responseText)
                let weather = information.weather[0]
                let suggestions = weather.today.suggestion
                _this.showSuggestion(suggestions)
            } 
        }
        xhr.onerror = function(){
            alert('获取数据失败')
        }
        xhr.send() 
    } 

    _Suggestions.prototype.showSuggestion = function (suggestions){
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
    return {
        init: function() {
            new _Suggestions()
        }
    }
})()

// Suggestions.init()
module.exports = Suggestions