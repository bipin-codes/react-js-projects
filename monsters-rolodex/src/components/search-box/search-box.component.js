import { Component } from "react";
import "./search-box.style.css";
// class SearchBox extends Component {
//   render() {
//     const { className, onChangedHandler, placeholder } = this.props;
//     return (
//       <input
//         className={`search-box ${className}`}
//         type={"search"}
//         placeholder={placeholder}
//         onChange={onChangedHandler}
//       />
//     );
//   }
// }

const SearchBox = ({ className, onChangedHandler, placeholder }) => {
  return (
    <input
      className={`search-box ${className}`}
      type={"search"}
      placeholder={placeholder}
      onChange={onChangedHandler}
    />
  );
};

export default SearchBox;
