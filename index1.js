let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      // Clear the previous results
      result.innerHTML = "";

      // Create the flag image element
      let flagImg = document.createElement("img");
      flagImg.src = data[0].flags.svg;
      flagImg.classList.add("flag-img");

      // Create the country name heading element
      let countryNameElem = document.createElement("h2");
      countryNameElem.innerText = data[0].name.common;

      // Create wrapper elements for data
      let capitalWrapper = createDataWrapper("Capital", data[0].capital[0]);
      let continentWrapper = createDataWrapper(
        "Continent ",
        data[0].continents[0]
      );
      let populationWrapper = createDataWrapper(
        "Population ",
        data[0].population
      );

      let currencyWrapper = createDataWrapper(
        "Currency ",
        `${data[0].currencies[Object.keys(data[0].currencies)].name} - ${
          Object.keys(data[0].currencies)[0]
        }`
      );

      let languagesWrapper = createDataWrapper(
        "Common Languages ",
        Object.values(data[0].languages).toString().split(", ").join(", ")
      );

      // Append all elements to the result container
      result.appendChild(flagImg);
      result.appendChild(countryNameElem);
      result.appendChild(capitalWrapper);
      result.appendChild(continentWrapper);
      result.appendChild(populationWrapper);
      result.appendChild(currencyWrapper);
      result.appendChild(languagesWrapper);
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});

// Helper function to create a wrapper for data
function createDataWrapper(label, value) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let dataWrapper = document.createElement("div");
  dataWrapper.classList.add("data-wrapper");

  let labelElem = document.createElement("h4");
  labelElem.innerText = `${label}:`;

  let valueElem = document.createElement("span");
  valueElem.innerText = value;

  dataWrapper.appendChild(labelElem);
  dataWrapper.appendChild(valueElem);
  wrapper.appendChild(dataWrapper);

  return wrapper;
}
