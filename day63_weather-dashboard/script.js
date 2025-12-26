async function getWeather(city){
    try{
        let apikey=`b3d2ee6e33fa06edffb28f25ca902cfb`;
    let raw= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    );
    if(!raw.ok){
        throw new Error("city not found or something went wrong.");
    }
    let real= await raw.json();
    if(real.main.temp-273.15<0){
        console.warn(`Too cold out there...${real.main.temp}°C`)
    }else if(real.main.temp-273.15>32){
        console.warn(`Too hot out there...${real.main.temp}°C`)
    }
    else{console.log(real);
    }
    }
    catch(err){
        console.log(err.message);
    }
}
getWeather("rajasthan");