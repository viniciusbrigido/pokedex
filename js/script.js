const pokemonId = document.querySelector('.pokemon_id')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let idBuscaPokemon = 1;

const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const mostraPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando';
    const data = await buscaPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        idBuscaPokemon = data.id;
        pokemonId.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
    } else {
        pokemonId.innerHTML = '';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    mostraPokemon(input.value).toLowerCase();
});

btnPrev.addEventListener('click', () => {
    if (idBuscaPokemon > 1) {
        mostraPokemon(--idBuscaPokemon);
    }
});

btnNext.addEventListener('click', () => {
    mostraPokemon(++idBuscaPokemon);
});

mostraPokemon(idBuscaPokemon);