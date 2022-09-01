import "./App.css";
import React, { useEffect, useState } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const newmon = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredMonsters(newmon);
  }, [monsters, searchField]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMonsters(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearchChanged = (event) => {
    const value = event.target.value.toLocaleLowerCase();
    setSearchField(value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Roldex</h1>
      <SearchBox
        onChangedHandler={onSearchChanged}
        placeholder={"Search Monster"}
        className={"monsters-search-box"}
      />
      <CardList item={filteredMonsters} />
    </div>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { monsters: [], searchField: "" };

//     console.log("Constructor");
//   }

//   componentDidMount() {
//     console.log("Component Did Mounts");
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         this.setState({ monsters: data });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   onSearchChanged = (event) => {
//     const value = event.target.value;
//     this.setState(() => {
//       return { searchField: value };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChanged } = this;
//     console.log("render");
//     const filtered = monsters.filter((monster) =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Roldex</h1>
//         <SearchBox
//           onChangedHandler={onSearchChanged}
//           placeholder={"Search Monster"}
//           className={"monsters-search-box"}
//         />
//         <CardList item={filtered} />
//       </div>
//     );
//   }
// }

export default App;
