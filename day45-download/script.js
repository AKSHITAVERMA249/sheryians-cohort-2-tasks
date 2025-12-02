var grow=0;
var download= document.querySelector('button');
var p_bar=document.querySelector('#progress_bar')
var h1=document.querySelector('h1')

download.addEventListener('click',function(){
    var int=setInterval(function(){
        grow++;
        h1.innerHTML=grow+'%';
        p_bar.style.width=grow+'%'
    },50);
    setTimeout(function(){
        clearInterval(int)
        download.innerHTML='Downloaded'
        download.style.opacity=0.5
        download.style.pointerEvents='none'
    },5000);
})