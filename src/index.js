import * as Help from './helper.js';
import * as DOM from './DOM.js';
let searchButton = document.querySelector('.btn-outline-success');
let units = document.querySelector('#convert-units-btn');
const deg = 1;
units.addEventListener('click', (event) => {
  let unit = units.textContent == 'F°' ? 'C°' : 'F°';
  let param = unit == 'F°' ? 1 : 0;
  units.textContent = unit;
  DOM.convertTemp(param);
});

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  let search = document.querySelector('input').value;
  try {
    const data = await Help.getWeatherData(search);
    console.log(data);
    DOM.updateModal(data, deg);
  } catch (error) {
    if (error.name == 'Invalid Input') {
      window.alert(error.message);
    } else {
      window.alert('City Not Found, Please Try Again');
    }
  }
});
