const cardPastcontainer = document.querySelector("#eventsDate");
cardPastcontainer.innerHTML = filterPastCardsHTML(data);
  
function filterPastCardsHTML(data) {
    let cardsHTML = "";
    const events = data.events;
    const length = events.length;
    const currentDate = data.currentDate;
    
    for (let i = 0; i < length; i++) {
      const event = events[i];
      const eventDate = event.date;
      if(eventDate >= currentDate){
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
    }
    return cardsHTML;
  }