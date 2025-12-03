const para= document.querySelector('p')
const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const text=para.innerText
const h1= document.querySelector('h1')
const hi= h1.innerText
let iteration1=0;
let iteration2=0;
function randomText(){
    
    const str= text.split("").map((char,index)=>{
        if(index<iteration1){
            return char
        }
        return characters.split("")[Math.floor(Math.random()*52)]
    }).join("")
    para.innerText=str
    iteration1+=0.2
}
para.addEventListener('mouseenter',function(){
setInterval(randomText,50)
iteration1=0;
})
function randomText1(){
    
    const str= hi.split("").map((char,index)=>{
        if(index<iteration2){
            return char
        }
        return characters.split("")[Math.floor(Math.random()*52)]
    }).join("")
    h1.innerText=str
    iteration2+=0.2
}
h1.addEventListener('mouseenter',function(){
    setInterval(randomText1,50)
    iteration2=0
})
