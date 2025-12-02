var main=document.querySelector('main')

main.addEventListener('mousemove',function (){
    var bubble=document.createElement('div')
    var x= Math.floor(Math.random()*40)
    
    bubble.style.height=x+ 'px';
    bubble.style.width=x+ 'px';
    bubble.style.borderRadius='50%'
    bubble.style.backgroundColor = 'transparent'   
     bubble.style.boxShadow = `
        0 0 4px #00aaff,
        0 0 8px #00aaff,
        0 0 16px #00aaff`       
    var a1=Math.floor(Math.random()*100)
    var a2=Math.floor(Math.random()*100)
    bubble.style.position='absolute'
    bubble.style.top=a1 +'%'
    bubble.style.left=a2+'%'
    main.appendChild(bubble)
})