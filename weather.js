const weatherform = document.querySelector(".weatherForm");
const cityinput = document.querySelector(".entercity");
const card = document.querySelector(".card");
const apikey = "f04ee43003b216949ecce2fd9beaa0a1";

weatherform.addEventListener("submit",async event=>{

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
                const weatherdata = await getweatherdata(city);
                displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter city");
    }
});

async function getweatherdata(city){
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

        const response = await fetch(api);

        if(!response.ok){
            throw new Error("Could not fetch data");
        }
        return response.json();
}

function displayweatherinfo(data){
    const {name : city, 
           main:{temp,humidity},
           weather:[{description,id}]}=data;

        card.textContent = "";
        card.style.display = "flex";

        const citydisplay = document.createElement("h1");
        const temperaturedisplay = document.createElement("p");
        const humiditydisplay = document.createElement("p");
        const descdisplay = document.createElement("p");
        const weatheremoji = document.createElement("p");

        citydisplay.textContent = city;
        temperaturedisplay.textContent=`${((temp-273.15)*(9/5)+32).toFixed(2)}° F`;
        humiditydisplay.textContent=`Humidity: ${humidity}%`;
        descdisplay.textContent=description;
        weatheremoji.textContent=getweatheremoji(id);

        citydisplay.classList.add("citydisplay");
        temperaturedisplay.classList.add("temperaturedisplay");
        humiditydisplay.classList.add("humiditydisplay");
        descdisplay.classList.add("descdisplay");
        weatheremoji.classList.add("weatheremoji");

        card.appendChild(citydisplay);
        card.appendChild(temperaturedisplay);
        card.appendChild(humiditydisplay);
        card.appendChild(descdisplay);
        card.appendChild(weatheremoji);
}
function getweatheremoji(weatherID){
    switch(true){
        case(weatherID >= 200 && weatherID <300):
            return "⛈️";
        case(weatherID >= 300 && weatherID <400):
            return "☔";
        case(weatherID >= 500 && weatherID <600):
            return "🌧️";
        case(weatherID >= 600 && weatherID <700):
            return "❄️";
        case(weatherID >= 700 && weatherID <800):
            return "🌇";
        case(weatherID === 800):
            return "☀️";
        case(weatherID >= 800 && weatherID <810):
            return "☁️";    

        default:
            return "🤔";
    }
}
function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent= message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}

