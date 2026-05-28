window.getWeather = async function () {
  const input = document.getElementById("city");
  if (!input) return console.error('Input element with id "city" not found');

  const city = input.value.trim();

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  const apiKey = "e6e1ab2a441754bbe178534af8676948";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city,
  )}&appid=${apiKey}&units=metric`;

  const resultEl = document.getElementById("result");
  if (resultEl) resultEl.innerHTML = "Loading...";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const message = err.message || `Request failed (${response.status})`;
      if (resultEl) resultEl.innerHTML = message;
      console.error(message);
      return;
    }

    const data = await response.json();

    console.log(data);

    if (data && data.name && data.main && data.weather && data.weather[0]) {
      if (resultEl)
        resultEl.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
    } else {
      if (resultEl)
        resultEl.innerHTML = "City not found or incomplete data returned.";
    }
  } catch (error) {
    console.error(error);
    if (resultEl)
      resultEl.innerHTML = "An error occurred. Check console for details.";
  }
};
