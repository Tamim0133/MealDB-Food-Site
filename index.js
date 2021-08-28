const inputField = document.getElementById("input-field");
const searchButton = document.querySelector(".btn-danger");
const parentContainer = document.getElementById("parent-container");
const errorMessage = document.getElementById("error-message");
const singleMealDetails = document.getElementById("single-meal-details");

const searchOperation = () => {
  parentContainer.innerHTML = "";
  singleMealDetails.innerHTML = "";
  errorMessage.classList.add("d-none");
  if (inputField.value == 0) {
    errorMessage.classList.remove("d-none");
  } else {
    document.getElementById("spinner").classList.remove("d-none");
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputField.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        arrayObjects = data.meals;
        try {
          arrayObjects.forEach((arrayObject) => {
            const { strMeal, strMealThumb, idMeal } = arrayObject;
            const div = document.createElement("div");
            inputField.value = "";

            div.innerHTML = `
                <div class="card mb-5">
                  <img src="${strMealThumb}" class="card-img-top" />
                  <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <p class="card-text"></p>
                    <button onclick="singleMeal(${idMeal})" class="btn btn-primary">See Details</button>
                  </div>
                </div>
                       `;
            document.getElementById("spinner").classList.add("d-none");
            parentContainer.appendChild(div);
          });
        } catch (error) {
          errorMessage.classList.remove("d-none");
          document.getElementById("spinner").classList.add("d-none");
        }
      });
  }
};
const singleMeal = (x) => {
  singleMealDetails.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`)
    .then((res) => res.json())
    .then((data) => {
      const singleMealData = data.meals[0];
      const { strMeal, strMealThumb, strArea, strInstructions } =
        singleMealData;
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="card mb-5 p-4 ">
            <img src="${strMealThumb}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${strMeal}</h5>
              <h4>Origin : ${strArea}</h4>
              <p class="card-text">${strInstructions}</p>
            </div>
          </div>
                 `;
      singleMealDetails.appendChild(div);
      window.scrollTo(0, 600);
    });
};
