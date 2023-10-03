const items = document.querySelectorAll(".filter-list li");
const prod = document.querySelectorAll(".shop-collections .collection1");

items.forEach((item) => {
  // Active
  item.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");

    // Filter
    const valueAttr = item.getAttribute("data-filter");
    prod.forEach((item) => {
        item.style.display = "none";
        if (
          item.getAttribute("data-filter").toLowerCase() ==
            valueAttr.toLowerCase() ||
          valueAttr == "all"
        ) {
          item.style.display = "";
        }
      });
  });
});


// Search click
const filter = document.getElementsByClassName(".filter-list");
const search = document.getElementsByClassName(".search");










