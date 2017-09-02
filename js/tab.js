(function(){
    let titleContainer = document.querySelector('.titleContainer')
    let titleList = document.querySelectorAll('.titleContainer>li')
    let contentList = document.querySelectorAll('.tabContent>li')

    titleContainer.addEventListener('click',function(e){
        let clickNode = e.target
        if(clickNode.tagName.toLowerCase() === 'li'){
            for(let i = 0;i < titleList.length;i++){
                titleList[i].classList.remove('active')
            }
        clickNode.classList.add('active')
        let index = [].indexOf.call(titleList,clickNode)
        for(let i = 0;i < contentList.length;i++){
            contentList[i].classList.remove('active')
        }
        contentList[index].classList.add('active')
    }
    })
})()