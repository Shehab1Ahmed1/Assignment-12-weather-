var elementActive=document.querySelector("nav ul");
var elements=document.querySelectorAll("nav ul li a");
var findLocation=document.querySelector("div.find-location input.location-input");
var city=document.querySelector("div.Todays-weather p.City");
var date=document.querySelector("div.weather-today-container div.weather p.day");
var Temperature=document.querySelector("div.Temperature");
var Tomorrow=document.querySelector("div.Tomorrow-weather");
var linkFooter=document.querySelector("footer div.links");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var linkActive;
getCity();
elementActive.addEventListener("click",function(e){
        if(elementActive!=e.target){
                e.target.classList.add("active-link");
                linkActive=e.target;
        }
});
elementActive.addEventListener("click",function(e){
        for(let i=0;i<elements.length;i++){
                if(linkActive!=elements[i])
                elements[i].classList.remove("active-link");
        }});
linkFooter.addEventListener("click",function(e){  
        for(let i=0;i<linkFooter.children.length;i++){      
        if(e.target==linkFooter.children[i]){e.target.classList.add("footer_active-link");}
        else if(e.target==linkFooter.children[i].firstElementChild){e.target.parentElement.classList.add("footer_active-link");}
        else{linkFooter.children[i].classList.remove("footer_active-link")}
}});
async function getCity(){
        let DataResponse=await fetch("https://freeipapi.com/api/json");
        let ipResponse=await DataResponse.json();
        let res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1bac1be0d980478e85181744240910&q=${ipResponse.cityName}&days=3`);
        let response=await res.json();
        getData(response);
        getDataNext(response,Tomorrow,1);
        getDataNext(response,Tomorrow.nextElementSibling,2);
}
async function getResponse() {
        let res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1bac1be0d980478e85181744240910&q=${findLocation.value}&days=3`);
        let response=await res.json();
        getData(response);
        getDataNext(response,Tomorrow,1);
        getDataNext(response,Tomorrow.nextElementSibling,2);
}
function Directions(e){
        let direc="";
        for(let i=0;i<e.length;i++){
                if(e[i]=="E")
                        direc+="East ";
                if(e[i]=="W")
                        direc+="West ";
                if( e[i]=="N")
                        direc+="North ";
                if(e[i]=="S")
                        direc+="South ";
        }
        return direc;
}
function getDate(e){
        let dateToday=new Date(e.last_updated) ;
        let day=days[dateToday.getDay()];
        let month=months[dateToday.getMonth()];
        console.log(month)
        date.textContent=day;
        date.nextElementSibling.textContent=dateToday.getDate()+" "+month;
        Temperature.firstElementChild.firstElementChild.innerHTML=`${e.temp_c}<sup>o</sup>C`;
        Temperature.firstElementChild.lastElementChild.src=e.condition.icon;
        Temperature.firstElementChild.nextElementSibling.textContent=e.condition.text;
        Temperature.lastElementChild.children[0].children[1].textContent=e.precip_mm;
        Temperature.lastElementChild.children[1].children[1].textContent=e.wind_kph;
        Temperature.lastElementChild.children[2].children[1].textContent=e.humidity;
        Temperature.lastElementChild.children[3].children[1].textContent=Directions(e.wind_dir);
}
function getDateNext(e){
        let dateToday=new Date(e)
        let day=days[dateToday.getDay()];
        return day;
}
function getDataNext(response,element,index){
        element.firstElementChild.children[0].textContent=getDateNext(response.forecast.forecastday[index].date);
        element.firstElementChild.children[1].src=response.forecast.forecastday[index].day.condition.icon;
        element.firstElementChild.children[2].innerHTML=`${response.forecast.forecastday[index].day.maxtemp_c}<sup>o</sup>C`;
        element.firstElementChild.children[3].innerHTML=`${response.forecast.forecastday[index].day.mintemp_c}<sup>o</sup>`;
        element.firstElementChild.children[4].textContent=response.forecast.forecastday[index].day.condition.text;
}
function getData(response){
        city.textContent=response.location.name;
        getDate(response.current);
}
findLocation.nextElementSibling.addEventListener("click",function(){
        getResponse();
        findLocation.value="";});
findLocation.addEventListener("input",getResponse);

