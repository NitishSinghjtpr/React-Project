⚛️ 1. React Basics Used in This Project
✔ useState Hook

किसी भी data को store और update करने के लिए use होता है।

Component दोबारा re-render होता है जब state बदलती है।

Example:

const [city, setCity] = useState("");

✔ Props

Parent component से child को data भेजने के लिए।

जैसे updateInfo function WeatherApp से SearchBox में props के रूप में भेजा गया है।

🌦️ 2. WeatherApp.jsx – Main Component
क्या करता है?

पूरे weather data को state में रखता है।

SearchBox से नया data लेकर InfoBox को भेजता है।

Concepts Used:

useState
Weather details store होते हैं:

const [weatherInfo, setWeatherInfo] = useState({
  city:"Delhi",
  ...
});


updateInfo Function
SearchBox से मिलने वाला new weather data update करता है।

let updateInfo = (newInfo) => {
  setWeatherInfo(newInfo);
};


Child Components

<SearchBox updateInfo={updateInfo} />

<InfoBox info={weatherInfo} />

🔍 3. SearchBox.jsx – City Input + API Call
इसका काम:

✔ User से city input लेना
✔ Weather API को call करना
✔ Result को WeatherApp में वापस भेजना

🚀 API Call Logic
OpenWeather API URL:
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

API क्यों?

रियल टाइम तापमान, humidity, min-max temp, description लिया जाता है।

getWeatherInfo Function:
let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
let jsonResponse = await response.json();

Result बनाने का कारण:

API se JSON बहुत बड़ा होता है

इसलिए हम सिर्फ ज़रूरी चीजें extract करके object बनाते हैं:

let result = {
  city: jsonResponse.name,
  temp: jsonResponse.main.temp,
  tempMin: jsonResponse.main.temp_min,
  tempMax: jsonResponse.main.temp_max,
  humidity: jsonResponse.main.humidity,
  feelsLike: jsonResponse.main.feels_like,
  weather: jsonResponse.weather[0].description,
};

✏️ Form Handling
handleChange

input field में जो text लिखा जा रहा है उसे state में डालता है।

handleSubmit

form submit होने पर API call करता है

newInfo को parent (WeatherApp) में भेजता है।

🎨 Material UI Components Used
TextField

Beautiful input box:

<TextField label="City Name" variant="outlined" required />

Button

Styled submit button:

<Button variant="contained" type="submit">Search</Button>

📄 4. InfoBox.jsx – Weather Display Card
इसका काम:

✔ WeatherApp से आने वाले weather info को card में show करना

क्यों card use किया?

UI clean, modern और readable बनाने के लिए।

🎨 Material UI Components Used
Card

Container box बनाता है।

CardMedia

Image दिखाने के लिए:

<CardMedia image={IMG} sx={{height:140}} />

CardContent + Typography

Text को सुंदर तरीके से show करने के लिए:

<Typography variant="h5">{info.city}</Typography>

📷 Why image used?

UI को attractive बनाने के लिए background weather-style image लगाया गया है।

📦 5. App.jsx – Entry Point
काम:

सिर्फ WeatherApp को render करता है:

<WeatherApp />

🧠 Key Concepts Summary (For Quick Revision)
Concept	Why Used
useState	Value store/update करने के लिए (UI re-render)।
Props	Child component को data/function भेजने के लिए।
Async-Await	API call को smooth तरीके से handle करने के लिए।
fetch()	Weather API से data लेने के लिए।
Material UI	सुंदर और ready-made UI elements के लिए।
State Lifting (updateInfo)	Child → Parent data भेजने के लिए।
🚀 How the App Works (Flow)
User enters City → SearchBox → API Call
API returns Data → updateInfo() → WeatherApp State Update
WeatherApp sends New Data → InfoBox → UI Updates Automatically

🎯 Important Mistakes Fixed

❌ textAline:"center"
✔ सही: textAlign:"center"