import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../utils/store/cart/cart.action";
import { selectCartItems } from "../../utils/store/cart/cart.selector";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`}></img>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Card
      </Button>
    </div>
  );
};

export default ProductCard;
