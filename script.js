
const apiKey = "707277c89f0344c898484019251506";
let selectedMood = "";

function selectMood(mood) {
  selectedMood = mood;
  document.querySelectorAll("#moodOptions button").forEach(btn => {
    const isActive = btn.textContent.includes(mood);
    btn.style.backgroundColor = isActive ? "#0288d1" : "";
    btn.style.color = isActive ? "white" : "";
  });
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const display = document.getElementById("weatherDisplay");

  if (!city) {
    display.innerHTML = `<p style="color:red;">Please enter a city.</p>`;
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found.");

    const data = await res.json();
    const { name } = data.location;
    const { temp_c, condition } = data.current;

    display.innerHTML = `
      <h3>${name}</h3>
      <p>${temp_c}°C – ${condition.text}</p>
      <img src="https:${condition.icon}" alt="weather icon" />
    `;
  } catch (err) {
    display.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function saveEntry() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherText = document.getElementById("weatherDisplay").textContent;

  if (!city || !weatherText || !selectedMood) {
    alert("Please check weather and select a mood first.");
    return;
  }


  const quotes = {
    "😊": "Keep smiling, it suits you!",
    "😴": "Even superheroes need naps.",
    "😡": "Pause. Breathe. Let it go.",
    "😢": "It's okay to feel this way. You're not alone."
  };
  if (selectedMood && quotes[selectedMood]) {
    alert(quotes[selectedMood]);
  }
  
  const entry = {
    date: new Date().toLocaleString(),
    city,
    weather: weatherText,
    mood: selectedMood,
    quote: quotes[selectedMood] || ""
  };
  

  const saved = JSON.parse(localStorage.getItem("moodcast") || "[]");
  saved.push(entry);
  localStorage.setItem("moodcast", JSON.stringify(saved));
  alert("Mood entry saved!");
  renderEntries();
}
document.getElementById("darkToggle").addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.checked);
  });
  
function renderEntries() {
  const list = document.getElementById("entryList");
  const saved = JSON.parse(localStorage.getItem("moodcast") || "[]");


  list.innerHTML = saved.map((e, i) => `
  <li>
    <strong>${e.date}</strong><br/>
    ${e.city} – ${e.weather}<br/>
    Mood: ${e.mood}<br/>
    <em>"${e.quote}"</em><br/>
    <button onclick="deleteEntry(${i})">Delete</button>
  </li>
`).join("");


 
}

renderEntries(); 
  function deleteEntry(index) {
    const saved = JSON.parse(localStorage.getItem("moodcast") || "[]");
    saved.splice(index, 1);
    localStorage.setItem("moodcast", JSON.stringify(saved));
    renderEntries();
  }
  document.addEventListener('DOMContentLoaded', () => {
    const bgVideo = document.getElementById('bgVideo');
    bgVideo.style.opacity = '0.7';
    setTimeout(() => {
      bgVideo.style.opacity = '0.7';
    }, 10);
  });
  
  