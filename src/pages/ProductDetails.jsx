import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../hooks/useCart";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = getProductById(id);

  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? ` (${productInCart.quantity})`
    : "";

  if (!product) {
    navigate("/");
    return null;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product?.name}</h1>
            <p className="product-detail-price">{product?.price}</p>
            <p className="product-detail-description">{product?.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Buy Now {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
