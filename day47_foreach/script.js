const trump_cards=[
  {
    "name": "Blaze King",
    "image": "https://i.pinimg.com/1200x/8b/58/31/8b5831cf138cd8d031b640f63460b936.jpg",
    "power": 95,
    "weight": "90 kg",
    "about": "Blaze King commands furious flames and dominates battles with raw fire power. He is fearless and aggressive in combat."
  },
  {
    "name": "Aqua Queen",
    "image": "https://i.pinimg.com/736x/9f/95/9e/9f959e16bd9a1bd0470d1986dc547682.jpg",
    "power": 88,
    "weight": "65 kg",
    "about": "Aqua Queen has absolute control over water and ice. She fights with elegance, intelligence, and calm confidence."
  },
  {
    "name": "Thunder Lord",
    "image": "https://i.pinimg.com/736x/4c/67/12/4c67124b220b31d68e174c4a21535c69.jpg",
    "power": 92,
    "weight": "85 kg",
    "about": "Thunder Lord unleashes devastating lightning strikes. His speed and reflexes make him nearly impossible to counter."
  },
  {
    "name": "Shadow Reaper",
    "image": "https://i.pinimg.com/736x/d4/26/06/d42606422a71b5209d612bebb62836a5.jpg",
    "power": 90,
    "weight": "70 kg",
    "about": "Shadow Reaper moves unseen in darkness. He relies on stealth, precision, and psychological warfare."
  },
  {
    "name": "Iron Titan",
    "image": "https://i.pinimg.com/736x/4f/6b/1a/4f6b1a9f00377ce020b02eaaa5e2f4b2.jpg",
    "power": 85,
    "weight": "120 kg",
    "about": "Iron Titan is built like a fortress. His immense strength and durability make him an unbreakable warrior."
  },
  {
    "name": "Wind Phantom",
    "image": "https://i.pinimg.com/736x/35/05/de/3505de7fa9d7db8d44eebf294576852a.jpg",
    "power": 87,
    "weight": "68 kg",
    "about": "Wind Phantom controls air currents and moves at extreme speed. He strikes before enemies can react."
  },
  {
    "name": "Earth Guardian",
    "image": "https://i.pinimg.com/736x/74/84/b3/7484b3eddba4b95c8ac5891d685d062a.jpg",
    "power": 91,
    "weight": "110 kg",
    "about": "Earth Guardian commands rock and soil. Slow but unstoppable, he overwhelms opponents with sheer force."
  },
  {
    "name": "Cosmic Ace",
    "image": "https://i.pinimg.com/736x/03/ad/a9/03ada957288d4bcc8eb28377ec557ab5.jpg",
    "power": 99,
    "weight": "78 kg",
    "about": "Cosmic Ace bends space and time itself. He is the ultimate trump card, used only in the most critical moments."
  }
];

var sum=''
trump_cards.forEach(function(elem){
    sum= sum + `<div class='card'>
            <img src="${elem.image}" alt="">
            <h1>${elem.name}</h1>
            <h2>Power:${elem.power}</h2>
            <h2>Weight:${elem.weight}</h2>
            <p>${elem.about}</p>
        </div>`
})
var main= document.querySelector('main')
main.innerHTML=sum