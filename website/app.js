const apiKey = "&appid=[API_Key]&units=imperial";
const apiUrl = "http://localhost:8000/";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const zipCodeElement = document.getElementById("zip");
const feelingsElement = document.getElementById("feelings");

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", onGenerate);

function onGenerate() {
  const zipCode = zipCodeElement.value;

  getWeather(baseURL, zipCode, apiKey)
    .then(function (userData) {
      postData("/get-data", {
        date: newDate,
        temp: userData.main.temp,
        content: feelingsElement.value,
      });
    })
    .then(function (newData) {
      updateUI();
    });
}

const getWeather = async (baseURL, zipCode, apiKey) => {
  const response = await fetch(baseURL + zipCode + apiKey);
  try {
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await request.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/data");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
