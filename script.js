function getElement(id) {
  const element = document.getElementById(id);
  return element;
}

// get id
const categoriesContainer = getElement("categories-container");
const cartContainer = getElement("cart-container");

// categories
const loadCategories = () => {
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
    loadAllCart(name.id);
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
        names.forEach((name) => loadAllCart(name.id));
      } else {
        cartContainer.innerHTML = "";
        loadCart(e.target.id);
      }
    }
  });
};

const loadCart = (id) => {
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

const loadAllCart = (id) => {
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

const showCart = (plants) => {
  plants.forEach((plant) => {
    cartContainer.innerHTML += `
    <div
            class="cart space-y-3 p-3 bg-white shadow-lg border border-gray-200 rounded-lg"
          >
            <img src="${plant.image}" class = "h-40 w-full " alt="" />

            <h1 class="text-lg font-bold">${plant.name}</h1>
            <p class="text-[#1F2937]">
             ${plant.description}
            </p>
            <div class="flex items-center justify-between">
              <a class="btn rounded-full" href="#">${plant.category}</a>
              <p>$<span>${plant.price}</span></p>
            </div>
            <button
              class="btn btn-active btn-secondary w-full bg-green-700 rounded-full"
            >
              Add to Cart
            </button>
          </div>
    `;
  });
};

loadCategories();
