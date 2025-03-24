const countryInp = document.getElementById("country-inp");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   console.log(data[0]);
      //   console.log(data[0].capital[0]);
      //   console.log(data[0].flags.svg);
      //   console.log(data[0].name.common);
      //   console.log(data[0].continents[0]);
      //   console.log(Object.keys(data[0].currencies)[0]);
      //   console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
      //   console.log(
      //     Object.values(data[0].languages).toString().split(",").join(", ")

      result.innerHTML = "";
      let flagImg = document.createElement("img");
      flagImg.src = data[0].flags.svg;
      flagImg.classList.add("flag-img");

      result.appendChild(flagImg);

      const countryNameElem = document.createElement("h2");
      countryNameElem.classList.add("ah2");
      countryNameElem.innerText = data[0].name.common;

      result.appendChild(countryNameElem);

      const capitalElem = document.createElement("div");
      capitalElem.classList.add("capital_Elem");
      capitalElem.innerHTML = `<label class="capital_label">Capital: </label> ${data[0].continents[0]}`;
      result.appendChild(capitalElem);

      const continentElem = document.createElement("div");
      continentElem.classList.add("capital_Elem");
      continentElem.innerHTML = `<label class="capital_label">Continent: </label> ${data[0].capital[0]}`;
      result.appendChild(continentElem);

      let populationWrapper = createDataWrapper(
        "Population",
        data[0].population
      );

      result.appendChild(populationWrapper);

      let currencyWrapper = createDataWrapper(
        "Currency",
        `${data[0].currencies[Object.keys(data[0].currencies)].name} - ${
          Object.keys(data[0].currencies)[0]
        }`
      );

      result.appendChild(currencyWrapper);

      let languagesWrapper = createDataWrapper(
        "Common Languages",
        Object.values(data[0].languages).toString().split(",").join(",")
      );

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

function createDataWrapper(label, value) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let dataWrapper = document.createElement("div");
  dataWrapper.classList.add("data-wrapper");

  const labelElem = document.createElement("h4");
  labelElem.innerText = `${label}: `;

  const valueElem = document.createElement("span");
  valueElem.innerText = value;

  dataWrapper.appendChild(labelElem);
  dataWrapper.appendChild(valueElem);

  wrapper.appendChild(dataWrapper);

  return wrapper;
}
