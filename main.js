let inpValue = document.getElementById("search-inp");
let btnGet = document.getElementById("btn-get");
let box = document.querySelector(".down");
let model = document.querySelector(".shape");
let btnEx = document.getElementById("ex");
//
//
//
btnGet.addEventListener("click", getData);
box.addEventListener("click", getDetails);
///
///
///
function getData() {
  box.innerHTML = "";
  let api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inpValue.value.trim()}`;
  fetch(api)
    .then((e) => {
      if (e.ok) {
        return e.json();
      }
    })
    .then((data) => {
      showData(data);
    });
}

function showData(data) {
  if (data.meals == null) {
    box.innerHTML = "There is no request with this name";
    return;
  }
  data.meals.forEach((el) => {
    box.innerHTML += `
        <div class="box">
        <div class="imag">
        <img src="${el.strMealThumb}" alt="" />
        </div>
        <div class="info">
        <h3>${el.strMeal}</h3>
        <button class="btn-box" data-id='${el.idMeal}'>Get Recipe</button>
        </div>
        </div>
        `;
  });
}

function getDetails(e) {
  if (e.target.classList.contains("btn-box")) {
    let id = e.target.getAttribute("data-id");
    let apiId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiId)
      .then((e) => {
        if (e.ok) {
          return e.json();
        }
      })
      .then((data) => {
        showItemData(data);
      });
  }
}

function showItemData(data) {
  model.style.display = "flex";
  model.innerHTML = `
        <div class="left">
        <i data-ex="ex" class="fa-solid fa-xmark"></i>
        <h3>${data.meals[0].strMeal}</h3>
        <p>
          ${data.meals[0].strInstructions}
        </p>
      </div>
      <div class="right">
        <img src="${data.meals[0].strMealThumb}" alt="" width="500px" />
      </div>
        `;
}

model.addEventListener("click", function (e) {
  if (e.target.getAttribute("data-ex")) {
    this.style.display = "none";
  }
});
