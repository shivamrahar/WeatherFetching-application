let weather = {
    apiKey: "0883a83c97609902898b8f1b586c186e",
    
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey 
          /* https://api.openweathermap.org/data/2.5/weather?q=+denver+&units=&appid=0883a83c97609902898b8f1b586c186e */
      )

        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp} = data.main;
      const { temp_min } = data.main;
      const {temp_max}=data.main;

      document.querySelector(".city").innerText = "Weather in " + name;
      ///background
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";

      document.querySelector(".description").innerText = description;

       /*       current temp */
      document.querySelector(".temp").innerText = temp + "°C";

       /* max temp  */
      document.querySelector(".max").innerText =
        "Max-Temp: " + temp_max + "°C";
        
        /* min temp */
      document.querySelector(".min").innerText =
        "Min-Temp: " + temp_min + "°C";
        
      document.querySelector(".weather").classList.remove("loading");

      ///////// To get the image of particular city 
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    ////////
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
 ///////search button
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  ///////search bar
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  /////default weather
  weather.fetchWeather("denver");