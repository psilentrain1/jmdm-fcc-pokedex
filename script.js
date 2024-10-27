// DOM ELEMENTS
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pkmName = document.getElementById("pokemon-name");
const pkmId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const sprite = document.getElementById("image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const result = document.getElementById("result");
const stats = document.getElementById("stats");
const red = document.getElementById("red");
const green = document.getElementById("green");

const clearResults = () => {
  result.classList.add("hidden");
  stats.classList.add("hidden");
  input.value = "";
  if (red.classList.contains("dex-body-lower-middle-led-1-lit")) {
    red.classList.remove("dex-body-lower-middle-led-1-lit");
  }
  if (green.classList.contains("dex-body-lower-middle-led-2-lit")) {
    green.classList.remove("dex-body-lower-middle-led-2-lit");
  }
  pkmName.innerText = "";
  pkmId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  sprite.innerHTML = "";
  types.innerHTML = "";
  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";
};

const fetchResults = async (value) => {
  let query = value
    .toLowerCase()
    .replaceAll(/\s/g, "-")
    .replaceAll("♀", "-f")
    .replaceAll("♂", "-m")
    .replaceAll(/[^a-z0-9\-]/g, "");
  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`);
    const data = await response.json();

    pkmName.innerText = `${data.name.toUpperCase()}`;
    pkmId.innerText = `${data.id}`;
    weight.innerText = `${data.weight}`;
    height.innerText = `${data.height}`;
    sprite.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />`;
    types.innerHTML = data.types.map((i) => `<span class='type ${i.type.name}'>${i.type.name.toUpperCase()}</span>`).join("");
    hp.innerText = `${data.stats[0].base_stat}`;
    attack.innerText = `${data.stats[1].base_stat}`;
    defense.innerText = `${data.stats[2].base_stat}`;
    specialAttack.innerText = `${data.stats[3].base_stat}`;
    specialDefense.innerText = `${data.stats[4].base_stat}`;
    speed.innerText = `${data.stats[5].base_stat}`;
    result.classList.remove("hidden");
    stats.classList.remove("hidden");
    green.classList.add("dex-body-lower-middle-led-2-lit");
  } catch (err) {
    red.classList.add("dex-body-lower-middle-led-1-lit");
    alert("Pokémon not found");
    console.error("Pokémon not found\n", err);
  }
};

const doSearch = () => {
  if (!input.value) {
    alert("Please enter a value");
    return;
  } else {
    fetchResults(input.value);
  }
};

searchBtn.addEventListener("click", doSearch);
input.addEventListener("click", clearResults);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    doSearch();
  }
});
