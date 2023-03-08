const cardcontainer = document.querySelector("#AllCards");
const dataEvents = data.events;

function allCardsHTML(data) {
  let cardsHTML = "";
  data.forEach(event => {
    cardsHTML += `
      <div class="card" style="width: 14rem;">
        <div class="card-body">
          <h4 class="card-title">${event.name}</h4>
          <img src="${event.image}" class="card-img-top" alt="...">       
          <p class="card-text">${event.description}</p>         
          <p class="card-text">Date: ${event.date}</p>
          <h5>Price:$ ${event.price}</h5>
          <a href="./Details.html?id=${event._id}" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `;
  });
  return cardsHTML;
}

function filterEvents(data){
  let eventsP = [];   
  let eventsU = [];  

  data.events.forEach(event => {
    if(event.date < data.currentDate){
      eventsP.push(event) //7 cards pasadas.
    }else{
      eventsU.push(event) //7 cards futuras.
    } 
    });
    if(document.title === "Past Events" && eventsP.length > 0){
      return allCardsHTML(eventsP)
    }else if(document.title === "Upcoming Events" && eventsU.length > 0){
      return allCardsHTML(eventsU)
    }
}

const searchFilter = document.getElementById("searchInput");
let searchF = "";//serchF es lo que escribo en el input
searchFilter.addEventListener("keyup",(event)=>{
  searchF = event.target.value;
  
  // console.log(searchF);
  filter();
});

// const checkcekFilter = document.getElementById("searchInput");
// let searchF = "";//serchF es lo que escribo en el input
// searchFilter.addEventListener("keyup",(event)=>{
//   searchF = event.target.value;
  
//   console.log(searchF);
//   filter();
// });

function filter(){ 
  let datafilter = []; // en este array se van a guardar los eventos que coincidia con searchF

  if(searchF !== ""){
    datafilter.push(...dataEvents.filter((event)=>event.name.toLowerCase().includes(searchF.trim().toLowerCase()))
    );  
    cardcontainer.innerHTML = allCardsHTML(datafilter);
  }
   else{
     datafilter.push(...dataEvents)
     cardcontainer.innerHTML = allCardsHTML(dataEvents);
   }
}