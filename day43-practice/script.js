let a= document.querySelector('#box');
let button=document.querySelector('button')

button.addEventListener(
    'click',function(){
        var a1=Math.floor(Math.random()*256)
        var a2=Math.floor(Math.random()*256)
        var a3=Math.floor(Math.random()*256)
        
        a.style.backgroundColor=`rgb(${a1},${a2},${a3})`
    }
)