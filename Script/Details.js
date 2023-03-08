const params = new URLSearchParams(document.location.search)
const id = params.get("id")

const cards = data.events.filter(event => event._id == id)

const container = document.getElementById("container-detail");
let html = "";

html += `<div class="card" style="width: 30rem;">
<div class="card-body">
      <img src="${cards[0].image}" class="card-img-top" alt="${cards[0].name}">
      <h2>${cards[0].name}</h2>
      <p><b>Price: </b><span>${cards[0].price}</span></p>
      <p><b>Category: </b><span>${cards[0].category}</span></p>
      <p><b>Date: </b><span>${cards[0].date}</span></p>
      <p><b>Place: </b><span>${cards[0].place}</span></p>
      <p><b>Capacity: </b><span>${cards[0].capacity}</span></p>
      <p><b>Description: </b><span>${cards[0].description}</span></p>
</div>
</div>`;
container.innerHTML = html