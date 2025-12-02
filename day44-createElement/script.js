var btn = document.querySelector('button')
var main = document.querySelector('main')

btn.addEventListener('click', function () {
    var div = document.createElement('div')

    var c1 = Math.floor(Math.random() * 256)
    var c2 = Math.floor(Math.random() * 256)
    var c3 = Math.floor(Math.random() * 256)
    var x= Math.random()*100
    var y= Math.random()*100

    div.style.height = '50px'
    div.style.width = '50px'
    div.style.margin = '10px'
    div.style.top= x+'%'
    div.style.left= y+ '%'
    div.style.position='absolute'
    div.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`

    main.appendChild(div)
})
