(function(){
    let currentPage = 1
    let perPageCount = 9
    $.ajax({
        url: 'https://platform.sina.com.cn/slide/album_tech',
        dataType: 'jsonp',
        jsonp: "jsoncallback",
        data: {
            app_key: '1271687855',
            num: perPageCount,
            page: currentPage
        }
    }).done(function (ret) {
        if (ret && ret.status && ret.status.code === "0") {
            // console.log(ret.data)
            let items = ret.data
            showNews(items)
        } else {
            console.log('get error data')
        }
    })

    function showNews(items) {
        let newsUrls = []
        let newsNames = []
        items.forEach((item,index)=>{
           newsUrls.push(item.url)
           newsNames.push(item.name)
        })
        let newsitems = document.createElement("ul")
        newsitems.classList.add("news")
        for(let i = 0;i< newsUrls.length; i++){
            let newsitem = document.createElement("li")
            let newslink = document.createElement("a")
            newslink.href = newsUrls[i]
            newslink.textContent = newsNames[i]
            newsitem.appendChild(newslink)
            newsitems.appendChild(newsitem)
        }
        let newsContent = document.getElementById('newsContent')
        newsContent.appendChild(newsitems)
    }
})()