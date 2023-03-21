let urlApi = "./Script/amazing_1.json";
const pastEventPercentages = document.querySelector("#data1");
const upEventPercentages = document.querySelector("#data2");
const maxCapacityEvent = document.querySelector("#data3");

async function getEventsWithAttendance() {
  const response = await fetch(urlApi);
  const json = await response.json();

  const events = json.events;
  const Dates = json.currentDate; 

  const arrayPast = events.filter(event => event.date < Dates)
  const arrayUp = events.filter(event => event.date > Dates)

  function listWithAllPercentages(){
    const percentagesList = [];
    arrayPast.forEach((event) => {    
      const attendancePercentage = (event.assistance / event.capacity) * 100;
      percentagesList.push({percentage: attendancePercentage, event: event.name});
    });
     
    percentagesList.sort((a, b) => {
      return b.percentage - a.percentage;
    });

    //devuelve el primer elemento del arreglo ya ordenado por sus porcentaje
    const firstPercentage = percentagesList.shift();
     pastEventPercentages.innerHTML = `<td> ${firstPercentage.event} (${firstPercentage.percentage}) </td>`

    //devuelve el ultimo elemento del arreglo ya ordenado por sus porcentaje
    const lastPercentage = percentagesList.pop();
    upEventPercentages.innerHTML = `<td> ${lastPercentage.event} (${lastPercentage.percentage}) </td>`

    printTable(dataTable(arrayUp), "upcoming")
    printTable(dataTable(arrayPast), "past")
    
  }
  listWithAllPercentages();

  function capacityAllMaxEvent(){
    const percentagesList = [];
    const greaterCapacityList = [];
    let greaterCapacity = 0;
    arrayPast.forEach((event) => {
      if(greaterCapacity < (event.capacity)){
        greaterCapacity = event.capacity;
        greaterCapacityList.push({capacityMax: greaterCapacity, event: event.name});
      }       
    });

     //devuelve el ultimo elemento del arreglo ya ordenado por sus capacidad
     const maxCapacity = greaterCapacityList.pop();
     maxCapacityEvent.innerHTML = `<td> ${maxCapacity.event} (${maxCapacity.capacityMax}) </td>`
  }
  capacityAllMaxEvent();

  function dataTable(arr) {
    let categories = Array.from(new Set(arr.map(a => a.category)));
    let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
      let calculate = eventCat.reduce((acc, event) => {
        acc.category = event.category;
        acc.revenues += event.price * (event.assistance || event.estimate);
        acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
        return acc
      }, {
        category: "",
        revenues: 0,
        attendance: 0
      })
      calculate.attendance = calculate.attendance / eventCat.length
      return calculate
    })
    return result;
  }
  
  function printTable(arr, idTag) {
    const upcomingTable = document.getElementById(idTag)
    let html = arr.map(events => {
      return `
        <tr>
                <td>${events.category}</td>
                <td>$${events.revenues}</td>
                <td>${events.attendance.toFixed(2)}%</td>
            </tr>
        `
    })
    upcomingTable.innerHTML = html.join("")
  }
}
getEventsWithAttendance();
