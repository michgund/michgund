let cities;
let sortedArr = [];

function loadCities() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "./city.list.json");

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === xhr.DONE) {
      cities = JSON.parse(xhr.responseText);
      sortCities(cities);
    }
  });

  xhr.send(null);
  return cities;
}

function sortCities(cities) {
  cities.sort(function (a, b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  });
  cities.forEach((object) => {
    sortedArr.push(object.name);
  });
  return sortedArr;
}

loadCities();

let input = document.querySelector("input");

function search() {
  let j = 0;
  results.innerHTML = "";
  let searched = input.value;
  if (input.value != "") {
    for (i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i].substr(0, searched.length).toLowerCase() == searched.toLowerCase()) {
        // Avoid duplicates
        if (sortedArr[i].toLowerCase() != sortedArr[i + 1].toLowerCase()) {
          let addCity = document.createElement("p");
          addCity.textContent = sortedArr[i];
          addCity.addEventListener("click", () => {
            getInfo(addCity.textContent);
          });
          input.nextElementSibling.appendChild(addCity);
          j++;
          if (j == 5) {
            return;
          }
        }
      }
    }
  } else {
    input.style.border = "1px solid green";
    return;
  }
}

input.addEventListener("keyup", function (e) {
  if (e.key != "ArrowDown" && e.key != "ArrowUp" && e.key != "Enter") {
    search();
  }
});

let a = -1;
input.addEventListener("keydown", function (e) {
  if (e.key == "ArrowDown") {
    a++;
    if (a == results.children.length) {
      a = 0;
      results.children[results.children.length - 1].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
      results.children[0].style.backgroundColor = "rgba(200, 200, 200, 1)";
    }
    if (results.children[a - 1]) {
      results.children[a - 1].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
    }
    if (results.children[a]) {
      results.children[a].style.backgroundColor = "rgba(200, 200, 200, 1)";
    }
    if (i == results.children.length) {
      results.children[results.children.length - 1].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
      a = 0;
    }
  }
  if (e.key == "ArrowUp") {
    a--;
    if (a == -1) {
      a = results.children.length - 1;
      results.children[0].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
      results.children[results.children.length - 1].style.backgroundColor = "rgba(200, 200, 200, 1)";
    } else {
      if (results.children[a + 1]) {
        results.children[a + 1].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
      }
      if (results.children[a]) {
        results.children[a].style.backgroundColor = "rgba(200, 200, 200, 1)";
      }
    }
  }
  if (e.key == "Enter") {
    getInfo(results.children[a].textContent);
    results.innerHTML = "";
  }
  if (e.key != "ArrowUp" && e.key != "ArrowDown" && e.key != "Enter") {
    a = -1;
  }
});

let btn = document.querySelector("button");

function weekDay(day) {
  switch (day) {
    case 0:
      return (day = "Sunday");
    case 1:
      return (day = "Monday");
    case 2:
      return (day = "Tuesday");
    case 3:
      return (day = "Wednesday");
    case 4:
      return (day = "Thursday");
    case 5:
      return (day = "Friday");
    case 6:
      return (day = "Saturday");
    case 7:
      return (day = "Sunday");
    case 8:
      return (day = "Monday");
    case 9:
      return (day = "Tuesday");
    case 10:
      return (day = "Wednesday");
  }
}

function getInfo(data) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=8c0d6a6e3c285afa92b0398479b3ce9e&units=metric`);

  xhr.addEventListener("readystatechange", function () {
    console.log(xhr.readyState);
    if (xhr.readyState === xhr.DONE) {
      console.log("DONE");
      let data = JSON.parse(xhr.responseText);
      console.log(data);
      formatData(data);
    }
  });

  xhr.send(null);
}

const date = new Date();
const day = date.getDay();

let city = document.createElement("h1");
let today = document.createElement("h2");
today.textContent = weekDay(day);
let temp = document.createElement("h3");

function formatData(data) {
  // Delete current content
  container.innerHTML = "";
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("id", "content");
  container.appendChild(contentDiv);

  // Initiate counter for days
  let dayCount = 0;

  // Add dynamic background
  let bg = data.list[0].weather[0].id.toString();
  bg = generateBackground(bg);
  content.style.backgroundImage = `url(${bg[0]})`;
  content.style.color = `${bg[1]}`;

  // if (document.querySelector("#future")) {
  //   console.log(contentDiv.nextElementSibling);
  //   contentDiv.nextElementSibling.innerHTML = "";
  // }

  const centerDiv = document.createElement("div");
  centerDiv.setAttribute("id", "center");
  // Add city name
  city.textContent = `The wonderful city of ${data.city.name}`;
  contentDiv.appendChild(city);
  centerDiv.appendChild(today);

  // Add img
  let weatherPic = document.createElement("img");
  let icon = data.list[0].weather[0].icon;

  // Add weather description
  let description = document.createElement("h3");
  description.textContent = data.list[0].weather[0].description;
  weatherPic.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  weatherPic.setAttribute("alt", `Icon of ${description}`);
  centerDiv.appendChild(weatherPic);

  // Add temperature
  temp.textContent = `${data.list[0].main.temp.toFixed(0)}°`;
  centerDiv.appendChild(temp);
  centerDiv.appendChild(description);
  let middleDiv = document.createElement("div");
  middleDiv.setAttribute("id", "middle");
  middleDiv.appendChild(centerDiv);
  contentDiv.appendChild(middleDiv);
  // Add the extra info (wind, pressure, cloudiness, huMUDity)
  // Wind, pressure goes to the left
  let leftDiv = document.createElement("div");
  leftDiv.setAttribute("id", "left");
  let wind = document.createElement("h4");
  wind.textContent = `Wind: ${data.list[0].wind.speed.toFixed(0)} m/s`;
  leftDiv.appendChild(wind);
  let humidity = document.createElement("h4");
  humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
  leftDiv.appendChild(humidity);
  middleDiv.insertBefore(leftDiv, centerDiv);

  // Cloudiness, humidity goes to the right
  let rightDiv = document.createElement("div");
  rightDiv.setAttribute("id", "right");
  let pressure = document.createElement("h4");
  pressure.textContent = `Pressure: ${data.list[0].main.pressure} hPa`;
  rightDiv.appendChild(pressure);
  let cloudiness = document.createElement("h4");
  cloudiness.textContent = `Cloudiness: ${data.list[0].clouds.all}%`;
  rightDiv.appendChild(cloudiness);
  middleDiv.appendChild(rightDiv);

  //
  let future = document.createElement("div");
  future.setAttribute("id", "future");
  container.appendChild(future);
  // 8 is because the data is in 3 hour increments
  // so 8 * 3hours = 24hours to get the next day
  for (let i = 8; i < data.list.length; i += 8) {
    dayCount++;
    let another = document.createElement("div");
    another.classList.add("another");
    let bg = data.list[i].weather[0].id.toString();
    bg = generateBackground(bg);
    another.style.backgroundImage = `url(${bg[0]})`;
    another.style.color = `${bg[1]}`;
    let tom = document.createElement("p");
    tom.textContent = weekDay(day + dayCount);
    another.appendChild(tom);
    let moreWeatherPic = document.createElement("img");
    let moreIcon = data.list[i].weather[0].icon;
    moreWeatherPic.setAttribute("src", `http://openweathermap.org/img/wn/${moreIcon}@2x.png`);
    another.appendChild(moreWeatherPic);
    let moreTemp = document.createElement("p");
    moreTemp.textContent = `${data.list[i].main.temp.toFixed(0)}°`;
    another.appendChild(moreTemp);
    let moreDisc = document.createElement("p");
    moreDisc.textContent = `${data.list[i].weather[0].description}`;
    another.appendChild(moreDisc);
    future.appendChild(another);
  }
}

function generateBackground(bg) {
  if (bg[0] == 2 || bg[0] == 3 || bg[0] == 5 || bg[0] == 6 || bg[0] == 7) {
    return ["./rain.png", "black"];
  } else if (bg[0] == 8 && bg[2] == 0) {
    return ["./sun.png", "blue"];
  } else {
    return ["./cloud.png", "coral"];
  }
}
