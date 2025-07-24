async function setBackground(city) {
  const unsplashKey = 'rHiXpRmdXBgDPXY2WV3NzeG6lOZ3LhFhqg1rzurdjyg'; 
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const imageUrl = data.results[0].urls.full;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundColor = '#f0f0f0';
    }
  } catch (error) {
    console.log("Unsplash Error:", error);
  }
}




async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '68deabd02eae2123b6d5068cd0bb09d1'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("City:", city);
  console.log("API URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 

    if (data.cod === 200) {
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>🌥 Weather: ${data.weather[0].main}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weatherResult').innerHTML = result;
    } else {
      document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
    }
    setBackground(city);
  } catch (error) {
    console.log("Error:", error);
    document.getElementById('weatherResult').innerHTML = "<p>Error fetching data.</p>";
  }
}

const toggleModeBtn = document.getElementById("toggleModeBtn");
const weatherContainer = document.getElementById("weatherContainer");

let isFloating = false;

toggleModeBtn.addEventListener("click", () => {
  isFloating = !isFloating;

  if (isFloating) {
    weatherContainer.classList.add("floating");
    toggleModeBtn.textContent = "🔳"; // switch to fullscreen icon
  } else {
    weatherContainer.classList.remove("floating");
    toggleModeBtn.textContent = "🔲"; // switch to floating icon
  }
});


// Drag functionality
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

weatherContainer.addEventListener("mousedown", (e) => {
  if (!isFloating) return;

  isDragging = true;
  offsetX = e.clientX - weatherContainer.getBoundingClientRect().left;
  offsetY = e.clientY - weatherContainer.getBoundingClientRect().top;

  weatherContainer.style.cursor = "move";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !isFloating) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  weatherContainer.style.left = x + "px";
  weatherContainer.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  weatherContainer.style.cursor = "default";
});
