let LoadNews = (function(){
    function _LoadNews(){
        this.init()
        this.getData()
    }

    _LoadNews.prototype.init = function(){
        this.currentPage = 1
        this.perPageCount = 9
    }
    _LoadNews.prototype.getData = function(){
        let _this = this
        $.ajax({
            url: 'https://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            data: {
                app_key: '1271687855',
                num: _this.perPageCount,
                page: _this.currentPage
            }
        }).done(function (ret) {
            if (ret && ret.status && ret.status.code === "0") {
                let items = ret.data
                _this.showNews(items)

            } else {
                console.log('get error data')
            }
        })
    }


    _LoadNews.prototype.showNews = function (items) {
        let _this = this
        let newsUrls = items.map((i) => i.url)
        let newsNames = items.map((i) => i.name)

        _this.newsitems = document.createElement("ul")
        _this.newsitems.classList.add("news")
        for(let i = 0;i< newsUrls.length; i++){
            _this.newsitem = document.createElement("li")
            _this.newslink = document.createElement("a")
            _this.newslink.href = newsUrls[i]
            _this.newslink.textContent = newsNames[i]
            _this.newsitem.appendChild(_this.newslink)
            _this.newsitems.appendChild(_this.newsitem)
        }
        _this.newsContent = document.getElementById('newsContent')
        _this.newsContent.appendChild(_this.newsitems)
    }
    return {
        init: function() {
            new _LoadNews()
        }
    }
})()
LoadNews.init()
// module.exports = LoadNews