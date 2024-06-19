import "./Card.css";
// import Modal from "../Modal/Modalpokemon";
import { useState } from "react";
const Card = ({ pokemon }) => {
  let [clickShowInfo, setClickShowInfo] = useState(false);
  function showInfo() {
    setClickShowInfo((x) => !x);
  }
  //   const closeShowInfo = () => {
  //     setClickShowInfo(false);
  //   };
  return (
    <>
      <div className="card" onClick={showInfo}>
        <img src={pokemon.image} alt={pokemon.name} />
        <p className="pokemon_id">{pokemon.id}</p>
        <p className="pokemon_name">{pokemon.name}</p>
        <div className="pokemon_wrapper">
          <span className={pokemon.wrapper[0]}>{pokemon.wrapper[0]}</span>
          <span className={pokemon.wrapper[1]}>{pokemon.wrapper[1]}</span>
        </div>
        {/* {clickShowInfo && (
          <Modal
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.image}
            wrapper={pokemon.wrapper}
            // closeShowInfo={closeShowInfo}
          ></Modal>
        )} */}
      </div>
    </>
  );
};
export default Card;
