// const root = document.querySelector("#left-autocomplete");

const createAutoComplete = ({ root, fetchData, onOptionSelect }) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    
    `;

  const input = root.querySelector("input");
  const resultsWrapper = root.querySelector(".results");
  const dropdown = root.querySelector(".dropdown");

  const onInput = async (e) => {
    const items = await fetchData(e.target.value);
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");

      const imgSrc = item.Poster === "N/A" ? "" : item.Poster;

      option.innerHTML = `
        <img src="${imgSrc}" />
        ${item.Title} (${item.Year})
      `;

      resultsWrapper.appendChild(option);

      option.addEventListener("click", (e) => {
        input.value = item.Title;
        dropdown.classList.remove("is-active");
        onOptionSelect(item);
      });
    }

    console.log(items);
  };

  input.addEventListener("input", debounce(onInput, 1000));

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
