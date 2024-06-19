import "./App.css";
import Card from "./components/Card";

import img001 from "./assets/001.png";
import img002 from "./assets/002.png";
import img003 from "./assets/003.png";
import img004 from "./assets/004.png";
import img005 from "./assets/005.png";
import img006 from "./assets/006.png";
import img007 from "./assets/007.png";
import img008 from "./assets/008.png";
import img009 from "./assets/009.png";
import img010 from "./assets/010.png";
import img011 from "./assets/011.png";
import img012 from "./assets/012.png";
import { useEffect, useState } from "react";
function App() {
  let pokemonIfo = [
    {
      id: "#001",
      image: img001,
      name: "Bulbarsou",
      wrapper: ["Grass", "Paison"],
    },
    {
      id: "#002",
      image: img002,
      name: "Ivysaur",
      wrapper: ["Grass", "Paison"],
    },
    {
      id: "#003",
      image: img003,
      name: "Venusaur",
      wrapper: ["Grass", "Paison"],
    },
    {
      id: "#004",
      image: img004,
      name: "Charmander",
      wrapper: ["Fire"],
    },
    {
      id: "#005",
      image: img005,
      name: "Charmeleon",
      wrapper: ["Fire"],
    },
    {
      id: "#006",
      image: img006,
      name: "Charizard",
      wrapper: ["Fire", "Flying"],
    },
    {
      id: "#007",
      image: img007,
      name: "Squirtle",
      wrapper: ["Water"],
    },
    {
      id: "#008",
      image: img008,
      name: "Wartortle",
      wrapper: ["Water"],
    },
    {
      id: "#009",
      image: img009,
      name: "Blastoise",
      wrapper: ["Water"],
    },
    {
      id: "#010",
      image: img010,
      name: "Caterpie",
      wrapper: ["Bug"],
    },
    {
      id: "#011",
      image: img011,
      name: "Metapod",
      wrapper: ["Bug"],
    },
    {
      id: "#012",
      image: img012,
      name: "Butterfree",
      wrapper: ["Bug", "Flying"],
    },
  ];
  const [showData, setShowData] = useState(pokemonIfo);
  const [pokemonSearch, setPokeSearch] = useState(pokemonIfo);
  const [dataInput, setDataInput] = useState("");
  const [dataTypeFilter, setDataTypeFilter] = useState({});
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
        );
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        const formattedPokemons = pokemonDetails.map((pokemon) => ({
          id: `#${String(pokemon.id).padStart(4, "0")}`,
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          wrapper: pokemon.types.map(
            (typeInfo) =>
              typeInfo.type.name.charAt(0) + typeInfo.type.name.slice(1)
          ),
          image: pokemon.sprites.front_default,
        }));

        const fetchTypes = {};
        formattedPokemons.forEach((pokemon) => {
          pokemon.wrapper.forEach((type) => {
            fetchTypes[type] = true;
          });
        });
        setShowData(formattedPokemons);
        setDataTypeFilter(fetchTypes);
      } catch (error) {
        console.error("fail to fetch Pokemon data", error);
      }
    };
    fetchPokemon();
  }, []);

  let handleInput = (e) => {
    setDataInput(e.target.value);
  };

  const filterTypes = {};
  showData.forEach((types) => {
    types.wrapper.forEach((type) => {
      if (!filterTypes[type]) {
        filterTypes[type] = true;
      }
    });
  });
  useEffect(() => {
    setDataTypeFilter(filterTypes);
  }, []);
  const handleChangeFilter = (key) => {
    setDataTypeFilter((prev) => {
      const newFilterr = {
        ...prev,
        [key]: !prev[key],
      };
      return newFilterr;
    });
  };
  const handleSearch = () => {
    const filterData = showData.filter((pokemon) => {
      const checkSearch = pokemon.name
        .toLowerCase()
        .includes(dataInput.toLowerCase());
      const checkFilter = pokemon.wrapper.some((type) => dataTypeFilter[type]);
      return checkFilter && checkSearch;
    });
    setPokeSearch(filterData);
  };
  return (
    <>
      <div className="boxSearch">
        <h1>Pokemon</h1>
        <div className="filter">
          <p className="locHe">Lọc hệ</p>
          <div className="listCheckbox">
            {Object.keys(dataTypeFilter).map((key) => {
              return (
                <p className="item" key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={dataTypeFilter[key]}
                    onClick={() => {
                      handleChangeFilter(key);
                    }}
                  />
                  <label htmlFor={key}>{key}</label>
                </p>
              );
            })}
          </div>
        </div>

        <input
          type="text"
          placeholder="Điền tên pokemon"
          value={dataInput}
          onChange={handleInput}
        />
        <button className="btnSearch" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="boxPokemon">
        {pokemonSearch.map((item, index) => (
          <Card pokemon={item} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
