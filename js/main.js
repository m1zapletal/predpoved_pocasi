//man zadání
const searchbox = document.getElementById("search-box");
  searchbox.addEventListener('keypress', setQuery);

//možnosti
  var refcity=document.getElementById("select-box");
  //tlačítko hledat
  var button=document.getElementById("button");



  //podmínka nutná ke zpracování enteru

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      continu(searchbox.value);
    }
 
  }

//funkce potřebná pro funkčnost tlačítka hledat, po stisknutí předá hodnotu volby fci continu
button.onclick=function buton()
{
 
  var city=refcity.options[refcity.selectedIndex].text;
continu(city);       
}



//slouží ke kkontrole a zpracování vstupu
function continu(city){
  
//použity obě zadávání
   if(searchbox.value.length>0&& refcity.value.length>1)
   {
   alert("Ke správné funkčnosti předpovědi počasí je potřeba použít pouze jeden způsob zadání města! Dojde k znovunačtení stránky.");
   window.location.replace(window.location.pathname + window.location.search + window.location.hash); //reload
  }
  //pokud je nějáká hodnota zadáná manuálně
   else if(searchbox.value.length>city.length)
   {
  city=searchbox.value;
}
//nic nezadáno
   else if(searchbox.value.length==0 && city=="-")
   {
      alert("Je potřeba zadat místo, pro které se počasí bude určovat!");
   }
   //pokud je vybraná možnost
   else
   {
      city=city;
   }

    
  
  
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=5bf9b93c8c2744ba8e4ddbab802d53ed&units=metric`;

  data_call(url);        
}




//funkce vytvářející požadavek o data
function data_call(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           var feed =  this.responseText;
          feed=JSON.parse(feed);
          console.log(feed);
          get_data(feed);                             
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }


//funkce zpracovávající přijaté informace 
function get_data(feed){

  var date=feed.list[0].dt_txt;
  var choosen_city = document.getElementById('choosen_city');
  var mesto;
  var stat;
  var populace;
  var index;
  var index2;




  var position=1;
  for (index = 0; index < feed.list.length; ++index) {
      date=feed.list[index].dt_txt;

        var den=feed.list[index].dt_txt.substr(8, 2);
        var mesic=feed.list[index].dt_txt.substr(6, 1);
        var months = ["","Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec",
        "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
        for(index2=0;index2<=mesic;index2++)
        {
          if(mesic==index2){
          mesic=months[index2];}
        }

        var rok=feed.list[index].dt_txt.substr(0, 4);



        mesto= feed.city.name;
        stat=feed.city.country;
        populace=feed.city.population;
        choosen_city.innerHTML="Předpověd počasí pro "+mesto+","+stat+" s počtem obyvatel "+populace+" osob je:";


        var  icons=feed.list[index].weather[0].icon;

     


document.getElementById('icons'+position).innerHTML= "<img src='img/"+icons+".png'>";//přiřazení ikony
document.getElementById('denn'+position).innerText= den+"."+mesic+"."+rok;//zobrazení datumu
document.getElementById('tepp'+position).innerText= `${Math.round(feed.list[index].main.temp)}`;//zobrazení teploty v celém čísle
document.getElementById('time'+position).innerText= `${feed.list[index].dt_txt.substr(10, 9)}`;//zobrazení času předpovědi
document.getElementById('temp'+position).innerText= `${feed.list[index].main.temp_min}/${feed.list[index].main.temp_max} °C`;//minimální a max teplota
document.getElementById('spee'+position).innerText= `${feed.list[index].wind.speed} m/s`;//rychlost vítru

        position++; 
      }        
   
  
  position=0; 

}