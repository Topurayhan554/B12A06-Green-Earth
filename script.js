function getElement(id) {
  const element = document.getElementById(id);
  return element;
}

// get id
const categoriesContainer = getElement("categories-container");
const cartContainer = getElement("cart-container");
const modalContainer = getElement("modal-container");
const modalDetails = getElement("modal-details");
const cartDetailsContainer = getElement("cart-details-container");
let totalBalance = parseInt(getElement("total-balance").innerText);
const LoadSpinner = getElement("spinner");

// spinner
const loadingSpinner = (status) => {
  if (status == true) {
    LoadSpinner.classList.remove("hidden");
    categoriesContainer.classList.add("hidden");
  } else {
    categoriesContainer.classList.remove("hidden");
    LoadSpinner.classList.add("hidden");
  }
};

// categories
const loadCategories = () => {
  loadingSpinner(true);
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showCategories(data.categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCategories = (names) => {
  categoriesContainer.innerHTML = `
    <p id="all"
       class="font-semibold text-lg hover:bg-green-400 mb-2 rounded-sm p-2 bg-green-600"
    >
      All Trees
    </p>
  `;

  names.forEach((name) => {
    categoriesContainer.innerHTML += `
      <p id="${name.id}"
         class="font-semibold text-lg hover:bg-green-400 mb-2 rounded-sm p-2"
      >
        ${name.category_name}
      </p>`;
    loadCart(name.id);
  });

  // click button
  categoriesContainer.addEventListener("click", (e) => {
    const all_p = categoriesContainer.querySelectorAll("p");
    all_p.forEach((p) => {
      p.classList.remove("bg-green-600");
    });

    if (e.target.localName === "p") {
      e.target.classList.add("bg-green-600");

      if (e.target.id === "all") {
        cartContainer.innerHTML = "";
        names.forEach((name) => loadCart(name.id));
      } else {
        cartContainer.innerHTML = "";
        loadCart(e.target.id);
      }
    }
  });
  loadingSpinner(false);
};

const loadCart = (id) => {
  loadingSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showCart(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// const allCart = (id) => {
//   const url = `https://openapi.programming-hero.com/api/category/${id}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       showCart(data.plants);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const showCart = (plants) => {
  plants.forEach((plant) => {
    cartContainer.innerHTML += `
    <div
            class="cart space-y-3 p-3 bg-white shadow-lg border border-gray-200 rounded-lg"
          >
            <img src="${plant.image}" class = "h-60 w-full rounded-lg " alt="" />

            <h1 onclick="loadModal(${plant.id})"  class="text-lg font-bold cursor-pointer">${plant.name}</h1>
            <p class="text-[#1F2937]">
             ${plant.description}
            </p>
            <div class="flex items-center justify-between">
              <a class="btn rounded-full" href="#">${plant.category}</a>
              <p>$<span id = "plant-price">${plant.price}</span></p>
            </div>
            <button onclick = loadCartDetails(${plant.id})
              class="btn btn-active btn-secondary w-full bg-green-700 rounded-full"
            >
              Add to Cart
            </button>
          </div>
    `;
  });
  loadingSpinner(false);
};

const loadCartDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showCartDetails(data.plants);
    });
};

// add to cart
const showCartDetails = (plants) => {
  alert(`${plants.name} has been added to the cart`);
  // console.log(plants.id);
  cartDetailsContainer.innerHTML += `<div id = "cartItem-${plants.id}"
              class="flex justify-between items-center bg-[#F0FDF4] border border-gray-100 rounded-sm shadow-lg mt-3 px-2"
            >
              <div>
                <p class="font-semibold text-lg mb-2">${plants.name}</p>
                <p>$ <span>${plants.price} * 1</span></p>
              </div>
              <button onclick = "deleteButton(${plants.id}, ${plants.price})" class = "btn"><i class="text-green-500 fa-solid fa-x"></i></button>
            </div>`;

  const plantPrice = parseInt(plants.price);
  totalBalance += plantPrice;

  console.log(totalBalance);
  getElement("total-balance").innerText = totalBalance;
};

// delete button
const deleteButton = (id, price) => {
  const item = getElement(`cartItem-${id}`);
  if (item) {
    item.remove();

    totalBalance -= parseInt(price);
    getElement("total-balance").innerText = totalBalance;
  }
};

// modal
const loadModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.plants);
      showModalDetails(data.plants);
    });
};

const showModalDetails = (details) => {
  modalContainer.innerHTML = `
  <div class = "space-y-5">
      <h1 class="text-xl font-bold">${details.name}</h1>
      <img class="rounded-lg h-80 w-full" src="${details.image}" alt="" />
      <p><span class="font-bold">Category</span> : ${details.category}</p>
      <p><span class="font-bold">Price :</span> $${details.price}</p>
      <p><span class="font-bold">Description:</span> : ${details.description}</p>
    </div>
  `;

  modalDetails.showModal();
};

loadCategories();
