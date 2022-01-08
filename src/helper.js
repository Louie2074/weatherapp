const apikey = process.env.API_KEY;
function kelvinToFahr(num) {
  return Math.round((num - 273.15) * 1.8 + 32);
}
function kelvinToCel(num) {
  return Math.round(num - 273.15);
}

function tempConversion(num, deg = 0) {
  if (deg == 0) {
    return Math.round((num - 32) / 1.8);
  } else {
    return Math.round(num * 1.8 + 32);
  }
}
function error(name, msg) {
  throw {
    name: name,
    message: msg,
  };
}

function processData(data) {
  const weather = {
    name: data.name,
    country: data.sys.country,
    desc: data.weather[0].description,
    feelsLike: [
      kelvinToCel(data.main.feels_like),
      kelvinToFahr(data.main.feels_like),
    ],
    temp: [kelvinToCel(data.main.temp), kelvinToFahr(data.main.temp)],
    temp_max: [
      kelvinToCel(data.main.temp_max),
      kelvinToFahr(data.main.temp_max),
    ],
    temp_min: [
      kelvinToCel(data.main.temp_min),
      kelvinToFahr(data.main.temp_min),
    ],
    humidity: data.main.humidity,
    pressure: data.main.pressure,
  };

  return weather;
}

function parse(str) {
  let full = str.split(',');
  if (full.length > 2 || (full.length > 1 && full[1].length == 0)) {
    error('Invalid Input', 'Please use the format City, Country');
  }
  for (let i = 0; i < full.length; i++) {
    full[i] = full[i].trim();
  }
  return full;
}
async function getWeatherData(location) {
  const loc = parse(location);
  const params =
    loc.length == 1
      ? `q=${loc}&appid=${apikey}`
      : `q=${loc[0]},${loc[1]}&appid=${apikey}`;

  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`
  );
  const data = await result.json();

  return processData(data);
}

export { kelvinToFahr, kelvinToCel, parse, getWeatherData, tempConversion };
