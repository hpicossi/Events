let urlApi = "./Script/amazing_1.json";

const cardcontainer = document.querySelector("#AllCards");
const categoriesconteiner = document.querySelector("#categories");

async function getEventsCards() {
  const response = await fetch(urlApi);
  const json = await response.json();

  const events = json.events;
  const Dates = json.currentDate;
  
  const arrayPast = events.filter(event => event.date < Dates)
  const arrayUp = events.filter(event => event.date > Dates)

  function allCardsHTML(events) {
    // if(events.length == 0){
    //   return cardcontainer.innerHTML = `<p>Hola</p>`
    // }
    let cardsHTML = "";
    events.forEach(event => {
      cardsHTML += `
        <div class="card " style="width: 16rem;">
          <div class="card-body">
            <h6 class="card-title" style="width: 16rem;">${event.name}</h6>
            <img src="${event.image}" class="card-img-top" alt="..." style="width: 14rem; height: 12rem;">       
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

  function filterEvents(events){
    let eventsP = [];   
    let eventsU = [];

    events.forEach(event => {
      if(event.date < Dates){
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
  cardcontainer.innerHTML = filterEvents(events);

  const searchFilter = document.getElementById("searchInput");
  let searchF = "";//serchF es lo que escribo en el input
  searchFilter.addEventListener("keyup",(event)=>{
    searchF = event.target.value;
    filter();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const searchFilter = document.getElementById("searchInput");
    let searchF = ""; //serchF es lo que escribo en el input
    searchFilter.addEventListener("keyup", (event) => {
      searchF = event.target.value;
      filter();
    });
  });


  function filter(){ 
    
    let datafilter = []; // en este array se van a guardar los eventos que coincidia con searchF
    let CBMarcados = obtenerCheckBoxsMarcados(events);

    if (searchF != "" && CBMarcados.length <= 0) {
      cardcontainer.innerHTML = "";
      datafilter.push(...events.filter((event)=>event.name.toLowerCase().includes(searchF.trim().toLowerCase()))
      );  
      cardcontainer.innerHTML = filterEvents(datafilter);
      
    }
    if (searchF == "" && CBMarcados.length <= 0) {
      cardcontainer.innerHTML = "";
      datafilter.push(...events)
      cardcontainer.innerHTML = filterEvents(events);

    }
    if (searchF != "" && CBMarcados.length > 0) {
      cardcontainer.innerHTML = "";
      var dataFilterAux = [];
      dataFilterAux.push(...events.filter((event)=>event.name.toLowerCase().includes(searchF.trim().toLowerCase())));
      CBMarcados.forEach(categoria => {
        datafilter.push(dataFilterAux.filter((event)=>event.category.toLowerCase().includes(categoria.trim().toLowerCase())));
        cardcontainer.innerHTML = filterEvents(datafilter[0]);
      });
  
    }
    if (searchF == "" && CBMarcados.length > 0) {
      cardcontainer.innerHTML = "";
      CBMarcados.forEach(categoria => {
        datafilter.push(...events.filter((event)=>event.category.toLowerCase().includes(categoria.trim().toLowerCase())));
        cardcontainer.innerHTML = filterEvents(datafilter);
      });

    }
    
  }
  

  function obtenerCheckBoxsMarcados() {
    let listaCategorias = obtenerCategorias(events);
    let listaCategoriasSeleccionadas = [];

    listaCategorias.forEach(categoria => {
      var containerCB = document.getElementById(categoria);
      if(containerCB.checked) {
        listaCategoriasSeleccionadas.push(categoria)
      }
    });
    return listaCategoriasSeleccionadas;
  }

  function obtenerCategorias(events) {
    const data = [];
    events.forEach(event => {
      data.push(event.category);
    });

    const dataArr = new Set(data);

    let categorias = [...dataArr];

    return categorias;
  }

  function allCheckBoxs(events) {
    let listCheckBoxs = "";
    let listaCategorias = obtenerCategorias(events);
    listaCategorias.forEach(categoria => {
      listCheckBoxs += `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${categoria}">
        <label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
      </div>
      `;
    });
    return listCheckBoxs;
  }

  function filterCategories(categoria) {
    let datafilter = []; // en este array se van a guardar los eventos que coincidia con searchF

    let CBMarcados = obtenerCheckBoxsMarcados(data.events);

    if (CBMarcados.length > 0) {
      CBMarcados.forEach(categoria => {
        datafilter.push(...dataEvents.filter((event)=>event.category.toLowerCase().includes(categoria.trim().toLowerCase())));
        cardcontainer.innerHTML = allCardsHTML(datafilter);
      });
    }
    else {
      datafilter.push(...dataEvents)
      cardcontainer.innerHTML = allCardsHTML(dataEvents);
    }
  }
categoriesconteiner.innerHTML = allCheckBoxs(events);

let listaCategorias = obtenerCategorias(events);
listaCategorias.forEach(categoria => {
    let eventoCB = document.getElementById(categoria);
    eventoCB.addEventListener("click",(event,) => {
      var CBCategoria = event.target.value
    
      filter();
    });
})
}
getEventsCards();