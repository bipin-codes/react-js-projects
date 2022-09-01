import { Component } from "react";
import "./card.style.css";
// export default class Card extends Component {
//   render() {
//     const { name, email, id } = this.props.monster;
//     return (
//       <div className="card-container" key={name}>
//         <img
//           alt={`Monster ${name} `}
//           src={`https://robohash.org/${id}?set=set2&size=180x180`}
//         />
//         <h2>{name}</h2>
//         <p>{email}</p>
//       </div>
//     );
//   }
// }

const Card = ({ monster }) => {
  const { name, email, id } = monster;
  return (
    <div className="card-container" key={name}>
      <img
        alt={`Monster ${name} `}
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
export default Card;
