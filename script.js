let form = document.querySelector("#form");
let searchBtn = document.querySelector("#searchbar");
let guide = document.querySelector("#guide");
//button function
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchValue = document.querySelector("#search-value").value;
  console.log(searchValue);
  guide.style.display = "none";
  weatherFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      searchValue
    )}&APPID=0669bf55b3185db6c2121ca312d78147`
  );
});
async function weatherFetch(url) {
  try {
    let req = await fetch(url);
    let res = await req.json();
    console.log(res);
    let city = document.querySelector("#city");
    let cityName = res.name;
    if (cityName) {
      city.textContent = res.name;
    } else {
      city.textContent = "City not Found";
    }
    let temp = document.querySelector("#temp");
    let celsius = res.main.temp - 275;
    let twoDigit = celsius.toString().slice(0, 2);
    if (celsius) {
      temp.innerHTML = `${twoDigit}<sup>o</sup>C`;
    }else{
      temp.textContent="City Not Found";
    let climate = document.querySelector("#climate");
    let weatherArray = res.weather;
    let resultMain = weatherArray.map((value) => {
      return `${value.description}`;
    });
    climate.textContent = resultMain.join(" ");
    let picture = document.querySelector("#picture");
    let pictureString = resultMain.join(" ");
    console.log(pictureString);
    if (pictureString.startsWith("c")) {
      picture.innerHTML = `<img src="images/clouds.png">`;
    } else if (pictureString.startsWith("m")) {
      picture.innerHTML = `<img src="images/mist.png"class="mb-3">`;
    } else if (pictureString.startsWith("b")) {
      picture.innerHTML = `<img src="images/icons8-clouds-64.png">`;
    } else if (pictureString.startsWith("o")) {
      picture.innerHTML = `<img src="images/sc.png"class="mb-3">`;
    } else if (pictureString.startsWith("s")) {
      picture.innerHTML = `<img src="images/sun.png"class="mb-3">`;
    } else if (pictureString.startsWith("l")) {
      picture.innerHTML = `<img src="images/rain.png"class="mb-3">`;
    } else if (pictureString.startsWith("r")) {
      picture.innerHTML = `<img src="images/rain.png"class="mb-3">`;
    } else {
      picture.innerHTML = `<img src="images/sc.png"class="mb-3">`;
    }
    //date
    let date = document.querySelector("#date");
    const dateData = new Date();
    let dat = `Date:${dateData.getDate()}-${
      dateData.getMonth() + 1
    }-${dateData.getFullYear()}`;
    console.log(dat);
    date.innerHTML = `<p class="fa-solid fa-calendar-days">: ${dat}</p>`;
    //wind
    let wind = document.querySelector("#wind-speed");
    let windSpeed = res.wind.speed;
    wind.innerHTML = `<p class="fa-solid fa-wind">Wind-Speed:${windSpeed}Km/hr</p>`;
  } catch (error) {
    console.log("error");
    let comman = document.querySelectorAll(".comman");
    for (let invalid of comman) {
      invalid.style.display = "none";
      let errorMsg = document.querySelector("#error-msg");
      errorMsg.textContent = "City Not Found";
    }
  }
}
