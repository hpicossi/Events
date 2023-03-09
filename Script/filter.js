cardcontainer.innerHTML = filterEvents(data);

categoriesconteiner.innerHTML = allCheckBoxs(data.events)

let listaCategorias = obtenerCategorias(data.events);
listaCategorias.forEach(categoria => {
    let eventoCB = document.getElementById(categoria);
    eventoCB.addEventListener("click",(event,) => {
      var CBCategoria = event.target.value
    
      filter();
    });
})


