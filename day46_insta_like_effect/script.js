var image= document.querySelector('img')
var heart=document.querySelector('i')
image.addEventListener('dblclick',function(){
    heart.style.color='red'
    heart.style.transform=' translate(-50%,-50%) scale(1) rotate(0)'

    setTimeout(function(){
        heart.style.color='transparent'
    },2000)
})