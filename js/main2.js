const searchbox = document.getElementById("search-box");
  searchbox.addEventListener('keypress', setQuery);

  var refcity=document.getElementById("select-box");
  var button=document.getElementById("button");



  //podmínka nutná ke zpracování enteru

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      continu(searchbox.value);
    }
 
  }
// ochrana proti spatnemu zadani


button.onclick=function buton()
{
 
  var city=refcity.options[refcity.selectedIndex].text;
continu(city);       
}




function continu(city){
  
  
   console.log("input is:" + searchbox.value.length);
   if(searchbox.value.length>0&& refcity.value.length>1)
   {
   alert("Ke správné funkčnosti předpovědi počasí je potřeba použít pouze jeden způsob zadání města! Dojde k znovunačtení stránky.");
   window.location.replace(window.location.pathname + window.location.search + window.location.hash); //reload
  }
   else if(searchbox.value.length>city.length)
   {
  city=searchbox.value;
}
   else if(searchbox.value.length==0 && city=="-")
   {
      alert("Je potřeba zadat místo, pro které se počasí bude určovat!");
   }
   else
   {
      city=city;
   }

    
  
  
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=5bf9b93c8c2744ba8e4ddbab802d53ed&units=metric`;

  data_call(url);        
}



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

function get_data(feed){

  var date=feed.list[0].dt_txt;
  var choosen_city = document.getElementById('choosen_city');
  var mesto;
  var stat;
  var populace;
  var index2;

  mesto= feed.city.name;
  stat=feed.city.country;
  populace=feed.city.population;
  choosen_city.innerHTML="Předpověd počasí pro "+mesto+","+stat+" s počtem obyvatel "+populace+" osob je:";


  
      date=feed.list[0].dt_txt;
        var den=feed.list[0].dt_txt.substr(8, 2);
        var mesic=feed.list[0].dt_txt.substr(6, 1);
        var months = ["","Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec",
        "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
        for(index2=0;index2<=mesic;index2++)
        {
          if(mesic==index2){
          mesic=months[index2];}
        }

        var rok=feed.list[0].dt_txt.substr(0, 4);



    

        var  icons=feed.list[0].weather[0].icon;

     

    


document.getElementById('icons').innerHTML= "<img src='img/"+icons+".png'>";
document.getElementById('datum').innerText=den+"."+mesic+"."+rok;
document.getElementById('teplota').innerText= `${Math.round(feed.list[0].main.temp)}`;
document.getElementById('minmax').innerText=`${feed.list[0].main.temp_min}/${feed.list[0].main.temp_max} °C` ;
document.getElementById('vitr').innerText= `${feed.list[0].wind.speed} m/s`;






}