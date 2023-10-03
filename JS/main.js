const nomePokemon = document.getElementById("pokemonName");
const idPokemon = document.getElementById("pokemonNumber");
const spritesPokemon = document.getElementById("pokemonImage");
const tipoPokemon = document.getElementById("pokemonType");
const statusPokemon = document.querySelector('.status');
const pokemonStatsList = document.getElementById("pokemonStats").querySelectorAll("li");

const typeColors = {
    electric: 'yellow',
    fire: 'red',
    water: 'blue',
    grass: 'green',
    ice: 'lightblue',
    fighting: 'orange',
    poison: 'purple',
    ground: 'saddlebrown',
    flying: 'skyblue',
    psychic: 'pink',
    bug: 'limegreen',
    rock: 'gray',
    ghost: 'violet',
    steel: 'silver',
    dragon: 'royalblue',
    dark: 'darkslategray',
    fairy: 'pink'
};

const fetchpokemon = async (pokemon) => {
    try {
        const conexao = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!conexao.ok) {
            throw new Error(`Erro na requisição: ${conexao.status}`);
        }
        const conexaoconvertida = await conexao.json();
        console.table(conexaoconvertida);
        return conexaoconvertida;
    } catch (error) {
        console.error(`Erro ao buscar Pokémon: ${error.message}`);
        throw error;
    }
}

const mostrarPokemon = async (pokemon) => {
    try {
        const data = await fetchpokemon(pokemon);

        nomePokemon.innerHTML = data.name;
        idPokemon.innerHTML = data.id;
        spritesPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        const type = data['types'][0]['type']['name'];
        tipoPokemon.innerHTML = type;

        if (typeColors[type]) {
            tipoPokemon.style.background = typeColors[type];
        } else {
            tipoPokemon.style.background = 'white'; // Cor padrão, caso não esteja na lista de cores.
        }

        data.stats.forEach((stat, index) => {
            const NomeStats = stat.stat.name;
            const StatsNumb = stat.base_stat;
            
            pokemonStatsList[index].innerHTML = `${NomeStats}: <span>${StatsNumb}</span>`;
        });

        document.getElementById('error-message').textContent = '';
    } catch (error) {
        console.error(`Erro ao mostrar Pokémon: ${error.message}`);

        // Exibe uma mensagem de erro ao usuário
        document.getElementById('error-message').textContent = 'Pokémon não encontrado. Verifique o nome ou número inserido.';
    }
}

const form = document.getElementsByClassName('poke_img');
const inputSearch = document.getElementById('inputSearch');

inputSearch.addEventListener('input', evento => {
    // Converte o valor para letras minúsculas
    evento.target.value = evento.target.value.toLowerCase();
});

inputSearch.addEventListener('keydown', evento => {
    if (evento.key == 'Enter') {
        evento.preventDefault();
        let namePok = evento.target.value;
        mostrarPokemon(`${namePok}`);
    }
});


mostrarPokemon('25');
