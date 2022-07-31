const pokemonData = document.querySelector('.pokemon_data')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let idBuscaPokemon = 1;

const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        return await APIResponse.json();
    }
}

const mostraPokemon = async (pokemon) => {
    input.value = '';
    pokemonData.innerHTML = 'Carregando';
    const data = await buscaPokemon(pokemon);

    if (data) {
        idBuscaPokemon = data.id;
        pokemonData.innerHTML = `${data.id} - ${data.name}`;
        const image = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if (image) {
            pokemonImage.style.display = 'block';
            pokemonImage.src = image;
        } else {
            pokemonImage.style.display = 'none';
        }
    } else {
        pokemonData.innerHTML = 'Não encontrado';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    mostraPokemon(input.value.toLowerCase());
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