let input = document.querySelector("input");

input.addEventListener("keyup", function (e) {
  if (e.key != "ArrowDown" && e.key != "ArrowUp" && e.key != "Enter") {
    search();
  }
});

let i = -1;
input.addEventListener("keydown", function (e) {
  if (e.key == "ArrowDown") {
    i++;
    if (i == results.children.length) {
      i = 0;
      results.children[results.children.length - 1].style.backgroundColor =
        "rgba(200, 200, 200, 0.6)";
      results.children[0].style.backgroundColor = "rgba(200, 200, 200, 1)";
    }
    if (results.children[i - 1]) {
      results.children[i - 1].style.backgroundColor =
        "rgba(200, 200, 200, 0.6)";
    }
    if (results.children[i]) {
      results.children[i].style.backgroundColor = "rgba(200, 200, 200, 1)";
    }
    if (i == results.children.length) {
      results.children[results.children.length - 1].style.backgroundColor =
        "rgba(200, 200, 200, 0.6)";
      i = 0;
    }
  }
  if (e.key == "ArrowUp") {
    i--;
    if (i == -1) {
      i = results.children.length - 1;
      results.children[0].style.backgroundColor = "rgba(200, 200, 200, 0.6)";
      results.children[results.children.length - 1].style.backgroundColor =
        "rgba(200, 200, 200, 1)";
    } else {
      if (results.children[i + 1]) {
        results.children[i + 1].style.backgroundColor =
          "rgba(200, 200, 200, 0.6)";
      }
      if (results.children[i]) {
        results.children[i].style.backgroundColor = "rgba(200, 200, 200, 1)";
      }
    }
  }
  if (e.key == "Enter") {
    searchState(results.children[i].textContent);
  }
  if (e.key != "ArrowUp" && e.key != "ArrowDown" && e.key != "Enter") {
    i = -1;
  }
});

function search() {
  results.textContent = "";

  let xhr = new XMLHttpRequest();

  if (input.value != "") {
    xhr.open("GET", `search.php?query=${input.value}`);
  } else {
    input.style.border = "1px solid green";
    return;
  }

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === xhr.DONE) {
      let data = xhr.responseText;
      formatData(data);
    }
  });

  xhr.send(null);
}

function formatData(data) {
  const responseArr = data.split("|");
  for (let city of responseArr) {
    let addCity = document.createElement("p");
    addCity.textContent = city;
    addCity.addEventListener("click", function (e) {
      searchState(e.target.textContent);
    });
    input.nextElementSibling.appendChild(addCity);
  }
  if (input.nextElementSibling.textContent == "404: No result found") {
    input.style.border = "1px solid red";
  } else {
    input.style.border = "1px solid blue";
  }
  return responseArr;
}

function searchState(inputData) {
  results.textContent = "LOADING PLEASE WAIT";
  const dataArr = inputData.split(" - ");
  let city = dataArr[0];
  let state = dataArr[1];

  let xhr = new XMLHttpRequest();

  if (input.value != "") {
    xhr.open("GET", `getZips.php?city=${city}&state=${state}`);
  } else {
    input.style.border = "1px solid green";
    return;
  }

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === xhr.DONE) {
      let data = xhr.responseText;
      data = JSON.parse(data);
      formatState(data);
    }
  });

  xhr.send(null);
}

function formatState(data) {
  results.textContent = "";
  data = data["zip_codes"];
  for (let zipcode of data) {
    let zip = document.createElement("p");
    zip.textContent = zipcode;
    input.nextElementSibling.appendChild(zip);
  }
}
