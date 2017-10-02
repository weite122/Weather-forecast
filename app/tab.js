let Tab = (function(){
    function _Tab(){
        this.init()
        this.bind()
    }
    _Tab.prototype.init = function(){
        this.titleContainer = document.querySelector('.titleContainer')
        this.titleList = document.querySelectorAll('.titleContainer>li')
        this.contentList = document.querySelectorAll('.tabContent>li')
    }

    _Tab.prototype.bind = function(){
        var _this = this
        this.titleContainer.addEventListener('click',function(e){
            let clickNode = e.target
            if(clickNode.tagName.toLowerCase() === 'li'){
                for(let i = 0;i < _this.titleList.length;i++){
                    _this.titleList[i].classList.remove('active')
                }
            clickNode.classList.add('active')
            let index = [].indexOf.call(_this.titleList,clickNode)
            for(let i = 0;i < _this.contentList.length;i++){
                _this.contentList[i].classList.remove('active')
            }
            _this.contentList[index].classList.add('active')
            }
        })

    }
    return {
        init: function() {
            new  _Tab()
        }
    }
})()

// Tab.init()
module.exports = Tab