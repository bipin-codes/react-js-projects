import { Component } from "react";
import Card from "../card/card.component";
import "./card-list.style.css";
export default class CardList extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card-list">
        {item.map((monster) => {
          return <Card monster={monster} key={monster.id}></Card>;
        })}
      </div>
    );
  }
}
