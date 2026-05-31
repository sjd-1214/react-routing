import {useNavigate } from 'react-router-dom'

const ProdCard = (props) => {

    const navigate = useNavigate();

    return (

        <div className="card">
            <img
                src={props.data.image}
                alt={props.data.title}
                onClick={() => navigate("/productDetails/"+props.data.id)}
                style={{ cursor: 'pointer' }}
            />
            <div className="prod-desc">
                <h3>{props.data.title}</h3>
                <div className="price">
                    <h4>PKR {props.data.price}</h4>
                    {props.data.discount > 0 && (
                        <span className="discount-badge">{props.data.discount}% OFF</span>
                    )}
                </div>
                <button
                    className="add-to-cart-button"
                    onClick={() => props.onAddToCart && props.onAddToCart(props.data)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProdCard;