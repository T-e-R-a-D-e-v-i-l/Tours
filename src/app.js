import { format } from "date-fns";
import { ru } from "date-fns/locale";

import swal from "sweetalert";

let buttons = [
  "Тайланд",
  "Египет",
  "Кипр",
  "Мальдивы",
  "Индонезия",
  "Мексика",
  "Танзания",
  "Все страны",
];

const menuContainer = document.getElementById("menu");

function renderMenu(tours) {
  menuContainer.innerHTML = "";
  buttons.forEach((button, index) => {
    menuContainer.innerHTML += `
       <button id ="filterButton${index}" class="opacity-75 text-zinc-900 text-xl p-1 rounded-md bg-gray-200 hover:bg-gray-400 hover:text-slate-50 transition-all focus:bg-gray-400">${button}</button>                   
    `;
  });
  buttons.forEach((button, index) => {
    document
      .getElementById(`filterButton${index}`)
      .addEventListener("click", () => {
        filterByCountry(tours, button);
      });
  });
}

async function loadTours() {
  const response = await fetch(
    "https://www.bit-by-bit.ru/api/student-projects/tours"
  );
  const data = await response.json();
  return data;
}

function renderTours(currentTours) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  if (currentTours.length === 0) {
    container.innerHTML = "к сожалению ничего не найдено";
    return;
  }

  currentTours.forEach((tour) => {
    container.innerHTML += `           
        <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <img class="h-1/3 w-full" src=${tour.image}></img>
            <div class="p-6">
                <div class="flex justify-end">
                    <button id="favoritToursBtn${tour.id}">
                       <svg
                            class="hover:fill-red-600 fill-gray-400"
                            baseProfile="tiny"
                            height="35px"
                            id="Layer_1"
                            version="1.2"
                            viewBox="0 0 24 24"
                            width="35px"
                            xml:space="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                            <path
                            d="M12,10.375C12,7.959,10.041,6,7.625,6S3.25,7.959,3.25,10.375c0,1.127,0.159,2.784,1.75,4.375S12,20,12,20   s5.409-3.659,7-5.25s1.75-3.248,1.75-4.375C20.75,7.959,18.791,6,16.375,6S12,7.959,12,10.375"/>
                            </g>
                        </svg>
                    </button>
                    <button id="favoritToursBtnRed${tour.id}" class="hidden">
                        <svg
                            class="fill-red-600"
                            baseProfile="tiny"
                            height="35px"
                            id="Layer_1"
                            version="1.2"
                            viewBox="0 0 24 24"
                            width="35px"
                            xml:space="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                            <path
                            d="M12,10.375C12,7.959,10.041,6,7.625,6S3.25,7.959,3.25,10.375c0,1.127,0.159,2.784,1.75,4.375S12,20,12,20   s5.409-3.659,7-5.25s1.75-3.248,1.75-4.375C20.75,7.959,18.791,6,16.375,6S12,7.959,12,10.375"/>
                            </g>
                        </svg>
                    </button>
                </div>
                <div class="h-28">
                    <h3 class="text-slate-900 font-semibold text-lg sm:text-xl lg:text-3xl text-center mb-4">
                        ${tour.hotelName}
                    </h3>
                </div>                
                <p class="text-slate-800 text-lg text-justify">
                    ${tour.country}, ${tour.city}
                </p>                
                <p class="text-slate-800 text-lg text-justify text-orange-500">
                    ${tour.rating}
                </p>
                <br />                
                <div class="mb-6">
                    <svg
                        class="inline mb-2 mr-3"
                        enable-background="new 0 0 32 32"
                        height="30px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 32 32"
                        width="30px"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="calendar_1_">
                        <path
                        d="M29.334,3H25V1c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-6V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v2H9V1   c0-0.553-0.448-1-1-1S7,0.447,7,1v2H2.667C1.194,3,0,4.193,0,5.666v23.667C0,30.806,1.194,32,2.667,32h26.667   C30.807,32,32,30.806,32,29.333V5.666C32,4.193,30.807,3,29.334,3z M30,29.333C30,29.701,29.701,30,29.334,30H2.667   C2.299,30,2,29.701,2,29.333V5.666C2,5.299,2.299,5,2.667,5H7v2c0,0.553,0.448,1,1,1s1-0.447,1-1V5h6v2c0,0.553,0.448,1,1,1   s1-0.447,1-1V5h6v2c0,0.553,0.447,1,1,1s1-0.447,1-1V5h4.334C29.701,5,30,5.299,30,5.666V29.333z"
                        fill="#333332"/>
                        <rect fill="#333332" height="3" width="4" x="7" y="12" />
                        <rect fill="#333332" height="3" width="4" x="7" y="17" />
                        <rect fill="#333332" height="3" width="4" x="7" y="22" />
                        <rect fill="#333332" height="3" width="4" x="14" y="22" />
                        <rect fill="#333332" height="3" width="4" x="14" y="17" />
                        <rect fill="#333332" height="3" width="4" x="14" y="12" />
                        <rect fill="#333332" height="3" width="4" x="21" y="22" />
                        <rect fill="#333332" height="3" width="4" x="21" y="17" />
                        <rect fill="#333332" height="3" width="4" x="21" y="12" />
                        </g>
                    </svg>
                    <p class="inline text-lg">c ${format(
                      new Date(tour.startTime),
                      "dd.MM.yyyy",
                      { locale: ru }
                    )}</p>
                    <p class="inline text-lg">по ${format(
                      new Date(tour.endTime),
                      "dd.MM.yyyy",
                      { locale: ru }
                    )}</p>
                </div>
                <svg
                    class="inline mb-2 mr-3"
                    enable-background="new 0 0 50 50"
                    height="30px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 50 50"
                    width="30px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect fill="none" height="50" width="50" />
                    <circle
                        cx="39"
                        cy="11"
                        fill="none"
                        r="3"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="2"/>
                    <path
                        d="M47,5.5  C47,4.119,45.881,3,44.5,3c-0.156,0-14.876,0.002-14.876,0.002c-1.33,0-2.603-0.07-3.341,0.668L3.554,26.398  c-0.739,0.738-0.739,1.936,0,2.674l17.374,17.374c0.738,0.738,1.936,0.738,2.674,0L46.33,23.717c0.738-0.737,0.668-1.98,0.668-3.34  C46.998,20.377,47,5.656,47,5.5z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="2"/>
                    <g>
                    <path
                        d="M31.996,24.975c-0.011-1.524-0.417-2.687-1.217-3.486c-0.822-0.822-1.853-1.15-3.091-0.986   c-0.987,0.131-2.028,0.559-3.124,1.283l4.652,4.652l-1.446,0.559l-4.324-4.324c-0.099,0.077-0.191,0.16-0.278,0.248   c-0.088,0.088-0.17,0.17-0.247,0.246c-0.065,0.066-0.126,0.126-0.181,0.182c-0.055,0.055-0.105,0.113-0.148,0.18l4.094,4.094   l-1.43,0.576l-3.585-3.585c-1.995,2.719-2.132,4.938-0.411,6.659c0.525,0.525,1.096,0.889,1.71,1.085   c0.45,0.144,1.118,0.229,2.006,0.263l-1.727,1.727c-1.205-0.263-2.285-0.871-3.239-1.824c-2.685-2.686-2.663-5.854,0.066-9.504   l-1.266-1.266l1.446-0.56l0.757,0.757c0.043-0.066,0.093-0.126,0.147-0.181s0.11-0.11,0.165-0.165   c0.098-0.098,0.191-0.191,0.279-0.279s0.175-0.164,0.264-0.23l-1.201-1.199l1.431-0.576l0.888,0.888   c1.611-1.085,3.172-1.649,4.686-1.693c1.711-0.065,3.212,0.548,4.506,1.841c0.997,0.998,1.644,2.335,1.939,4.013L31.996,24.975z"
                    />
                    </g>
                </svg>
                <p class="inline text-xl">${tour.price} руб</p>
                <br />
                <div class="flex gap-2">
                    <button class="btn">Подробнее</button>
                    <button class="btn" id="orderButton${tour.id}">Забронировать</button>
                </div>
            </div>
        </div>`;

        if (favorites.includes(tour.id)) {
            btnRed(tour)
        }  else {
            btnGrey(tour)
        }
  });

  currentTours.forEach((tour) => {
        document
            .getElementById(`orderButton${tour.id}`)
            .addEventListener("click", () => {
            openModal(tour);
        });

        
        document.getElementById(`favoritToursBtnRed${tour.id}`).addEventListener("click", () => {
        swal ( "Тур удален из избранного" ) ;
        btnGrey(tour)
        deleteFavorites(tour);
        saveToLocalStorage()
        });
        
        document.getElementById(`favoritToursBtn${tour.id}`).addEventListener("click", () => {
        favorites.push(tour.id);
        swal ( "Тур добавлен в избранное" ) ;
        btnRed(tour)                      
        saveToLocalStorage()
        });
    });
}

function btnRed(tour) {
    document.getElementById(`favoritToursBtnRed${tour.id}`).style.display = "flex"
    document.getElementById(`favoritToursBtn${tour.id}`).style.display = "none"
}

function btnGrey(tour) {
    document.getElementById(`favoritToursBtnRed${tour.id}`).style.display = "none"
    document.getElementById(`favoritToursBtn${tour.id}`).style.display = "flex"
}

document.getElementById("buttonCloseModal").addEventListener("click", () => {
  closeModal();
});

//блок с заказом тура

function closeModal() {
  document.getElementById("modalCardMenu").style.display = "none";
}

let indexTour; // переменная для хранения id

async function openModal(tour) {
  document.getElementById("modalCardMenu").style.display = "flex";

  indexTour = tour.id;

  const modalCard = document.getElementById("modalCard");
  modalCard.innerHTML = "";
  modalCard.innerHTML += ` 
        <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <img class="h-1/3" src=${tour.image}></img>
            <div class="p-6">                
                <div class="h-28">
                    <h3 class="text-slate-900 font-semibold text-lg sm:text-xl lg:text-3xl text-center mb-4">
                        ${tour.hotelName}
                    </h3>
                </div>                
                <p class="text-slate-800 text-lg text-justify">
                    ${tour.country}, ${tour.city}
                </p>                
                <p class="text-slate-800 text-lg text-justify text-orange-500">
                    ${tour.rating}
                </p>
                <br />                
                <div class="mb-6">
                    <svg
                        class="inline mb-2 mr-3"
                        enable-background="new 0 0 32 32"
                        height="30px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 32 32"
                        width="30px"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="calendar_1_">
                        <path
                        d="M29.334,3H25V1c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-6V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v2H9V1   c0-0.553-0.448-1-1-1S7,0.447,7,1v2H2.667C1.194,3,0,4.193,0,5.666v23.667C0,30.806,1.194,32,2.667,32h26.667   C30.807,32,32,30.806,32,29.333V5.666C32,4.193,30.807,3,29.334,3z M30,29.333C30,29.701,29.701,30,29.334,30H2.667   C2.299,30,2,29.701,2,29.333V5.666C2,5.299,2.299,5,2.667,5H7v2c0,0.553,0.448,1,1,1s1-0.447,1-1V5h6v2c0,0.553,0.448,1,1,1   s1-0.447,1-1V5h6v2c0,0.553,0.447,1,1,1s1-0.447,1-1V5h4.334C29.701,5,30,5.299,30,5.666V29.333z"
                        fill="#333332"/>
                        <rect fill="#333332" height="3" width="4" x="7" y="12" />
                        <rect fill="#333332" height="3" width="4" x="7" y="17" />
                        <rect fill="#333332" height="3" width="4" x="7" y="22" />
                        <rect fill="#333332" height="3" width="4" x="14" y="22" />
                        <rect fill="#333332" height="3" width="4" x="14" y="17" />
                        <rect fill="#333332" height="3" width="4" x="14" y="12" />
                        <rect fill="#333332" height="3" width="4" x="21" y="22" />
                        <rect fill="#333332" height="3" width="4" x="21" y="17" />
                        <rect fill="#333332" height="3" width="4" x="21" y="12" />
                        </g>
                    </svg>
                    <p class="inline text-lg">c ${format(
                      new Date(tour.startTime),
                      "dd.MM.yyyy",
                      { locale: ru }
                    )}</p>
                    <p class="inline text-lg">по ${format(
                      new Date(tour.endTime),
                      "dd.MM.yyyy",
                      { locale: ru }
                    )}</p>
                </div>
                <svg
                    class="inline mb-2 mr-3"
                    enable-background="new 0 0 50 50"
                    height="30px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 50 50"
                    width="30px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect fill="none" height="50" width="50" />
                    <circle
                        cx="39"
                        cy="11"
                        fill="none"
                        r="3"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="2"/>
                    <path
                        d="M47,5.5  C47,4.119,45.881,3,44.5,3c-0.156,0-14.876,0.002-14.876,0.002c-1.33,0-2.603-0.07-3.341,0.668L3.554,26.398  c-0.739,0.738-0.739,1.936,0,2.674l17.374,17.374c0.738,0.738,1.936,0.738,2.674,0L46.33,23.717c0.738-0.737,0.668-1.98,0.668-3.34  C46.998,20.377,47,5.656,47,5.5z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="2"/>
                    <g>
                    <path
                        d="M31.996,24.975c-0.011-1.524-0.417-2.687-1.217-3.486c-0.822-0.822-1.853-1.15-3.091-0.986   c-0.987,0.131-2.028,0.559-3.124,1.283l4.652,4.652l-1.446,0.559l-4.324-4.324c-0.099,0.077-0.191,0.16-0.278,0.248   c-0.088,0.088-0.17,0.17-0.247,0.246c-0.065,0.066-0.126,0.126-0.181,0.182c-0.055,0.055-0.105,0.113-0.148,0.18l4.094,4.094   l-1.43,0.576l-3.585-3.585c-1.995,2.719-2.132,4.938-0.411,6.659c0.525,0.525,1.096,0.889,1.71,1.085   c0.45,0.144,1.118,0.229,2.006,0.263l-1.727,1.727c-1.205-0.263-2.285-0.871-3.239-1.824c-2.685-2.686-2.663-5.854,0.066-9.504   l-1.266-1.266l1.446-0.56l0.757,0.757c0.043-0.066,0.093-0.126,0.147-0.181s0.11-0.11,0.165-0.165   c0.098-0.098,0.191-0.191,0.279-0.279s0.175-0.164,0.264-0.23l-1.201-1.199l1.431-0.576l0.888,0.888   c1.611-1.085,3.172-1.649,4.686-1.693c1.711-0.065,3.212,0.548,4.506,1.841c0.997,0.998,1.644,2.335,1.939,4.013L31.996,24.975z"
                    />
                    </g>
                </svg>
                <p class="inline text-xl">${tour.price} руб</p>
            </div>
            <div class="flex flex-col px-6">    
                <p class="text-lg text-slate-800 text-center">Для бронирования тура необходимо заполнить следующие поля</p>
                <input id="name" class="inputModal" name="lastName" type="text" placeholder="Фамилия Имя"/>
                <input id="phone" class="inputModal" name="phone" type="number" placeholder="Телефон"/>
                <input id="email" class="inputModal" name="email" type="text" placeholder="email"/>
                <input id="comment" class="inputModal h-40" name="comment" type="text" placeholder="Комментарий к заказу"/>
            </div> 
                <div class="flex justify-center mb-5">
                    <button id="orderBtn" class="btn">Заказать тур</button>
                </div>                  
        </div> 
    `;

  document.getElementById(`orderBtn`).addEventListener("click", () => {
    orderTour();
  });
}

async function orderTour() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let comment = document.getElementById("comment").value;

  const params = {
    customerName: name,
    phone: phone,
    email: email,
    description: comment,
  };

  const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${indexTour}`;

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
  });

  try {
    let date = await response.json();

    if (date) {
      swal("Спасибо!", "Ваша заявка принята!", "success");
      closeModal(); 
    }
  } catch (error) {
    swal("Произошла ошибка!", "Попробуйте снова", "error");
  }
}

//блок с добавлением в избранное

let favorites = [] // массив id избранных туров

function saveToLocalStorage() {
    const toursJson = JSON.stringify(favorites)
    localStorage.setItem('favorites', toursJson)
}

//получение данных из localStorage
const toursJson = localStorage.getItem('favorites')
    if (toursJson) {
        favorites = JSON.parse(toursJson)
    } 

document.getElementById(`favoritTour`).addEventListener("click", () => {
    const favoritTours = tours.filter(t => {
        return favorites.includes(t.id)
    })
    renderTours(favoritTours) 
});

document.getElementById(`allToursBtn`).addEventListener("click", () => {
    renderTours(tours);
});

function deleteFavorites(tour) {
    const index = favorites.indexOf(tour.id)
    favorites.splice(index,1)
}


//блок с фильтрацией туров

function filterByCountry(tours, country) {
  console.log(country);
  if (country === "Все страны") {
    renderTours(tours);
  } else {
    const filteredToursCountry = tours.filter((tour) => {
      return tour.country === country;
    });
    renderTours(filteredToursCountry);
  }
}

function filterByRating(tours, rating) {
  const filteredToursRating = tours.filter((tour) => {
    return tour.rating >= rating;
  });
  renderTours(filteredToursRating);
}

function filterByPrice(tours, maxPrice, minPrice) {
  const filteredToursPrice = tours.filter((tour) => {
    if (maxPrice > 0) {
      return tour.price <= maxPrice && tour.price >= minPrice;
    } else {
      return tour.price >= minPrice;
    }
  });
  renderTours(filteredToursPrice);
}

async function init() {
  tours = await loadTours();
  processing.innerHTML = "";
  renderTours(tours);
  renderMenu(tours);

  document.getElementById(`rating`).addEventListener("change", (event) => {
    const currentRating = event.target.value;
    filterByRating(tours, currentRating);
  });

 
  document.getElementById(`filterByPriceBtn`).addEventListener("click", () => {
    const maxPrice = document.getElementById("maxPrice").value;
    const minPrice = document.getElementById("minPrice").value;
    filterByPrice(tours, maxPrice, minPrice);
  });

}

let tours = [];

// индикатор загрузки

const processing = document.getElementById("processing");
processing.innerHTML = "";
if (tours.length === 0) {
  processing.innerHTML += `
        <button type="button" class="bg-gradient-to-r bg-gradient-to-r from-green-400 to-blue-500 w-10 h-10 rounded-full animate-spin" disabled>
        </button>    
    `;
} else {
  renderTours(tours);
}

init();
