const cardcontainer = document.querySelector("#AllCards");

//printCards 

function allCardsHTML(data) {
    let cardsHTML = "";
    const events = data;
    const length = events.length;
  
    for (let i = 0; i < length; i++) {
      const event = events[i];
      cardsHTML += `
        <div class="card" style="width: 14rem;">
          <div class="card-body">
            <h4 class="card-title">${event.name}</h4>
            <img src="${event.image}" class="card-img-top" alt="...">       
            <h5 class="card-title">${event.category}</h5>
            <p class="card-text">${event.description}</p>
            <p class="card-text">Place: ${event.place}</p>
            <p class="card-text">Capacity: ${event.capacity}</p>
            <p class="card-text">Date: ${event.date}</p>
            <h5>Price:$ ${event.price}</h5>
          </div>
        </div>
      `;
    }
    return cardsHTML;
  }

//error
// const categorizeEvent = document.querySelector("#eventsDate");
// categorizeEvent.innerHTML = filterEventsDate(data);

 console.log(data);

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


// function filterEventsDate(data) { 
//   console.log(data);
//     let eventsP = [];   
//     let eventsU = [];  
//     const currentDate = data.currentDate;

//     data.events.forEach(event => {
//       const eventDate = event.date;
//       console.log(eventDate);
//       if (eventDate < currentDate) { 
//         eventsP = allCardsHTML(data)
//         // console.log(allCardsHTML(data)); 
//          return eventsP
//       } else {  
//        console.log('bghywfte');
//       }
//     });
//   }

//checkboxes y search
