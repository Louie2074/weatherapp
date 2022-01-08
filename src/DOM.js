import * as Help from './helper.js';

let result_temp = document.querySelector('#result-temp');
let result_place = document.querySelector('#result-place');
let desc = document.querySelector('#result-weather');
let feeling = document.querySelector('#result-feeling');
let humidity = document.querySelector('#result-humidity');
let pressure = document.querySelector('#result-pressure');
let minTemp = document.querySelector('#result-mintemp');
let maxTemp = document.querySelector('#result-maxtemp');
const temps = [result_temp, feeling, minTemp, maxTemp];

function convertTemp(param) {
  temps.forEach((temp) => {
    let conv = Help.tempConversion(parseInt(temp.textContent), param);
    temp.textContent = `${conv}°`;
  });
}

function updateModal(data, deg = 1) {
  result_temp.textContent = `${data.temp[deg]}°`;
  result_place.textContent = `${data.name}, ${data.country}`;
  feeling.textContent = `${data.feelsLike[deg]}°`;
  desc.textContent = data.desc
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  humidity.textContent = `${data.humidity}`;
  pressure.textContent = `${data.pressure}`;
  minTemp.textContent = `${data.temp_min[deg]}°`;
  maxTemp.textContent = `${data.temp_max[deg]}°`;
}
export { updateModal, convertTemp };
