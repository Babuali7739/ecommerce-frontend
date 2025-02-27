import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../pages/CSS/Checkout.css';

const Checkout = () => {
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className="checkout">
            {/* Shipping and Payment Information */}
            <div className="shipping-payment-info">
                <h2>Shipping and Payment</h2>
                {/* Add your form inputs for user shipping and payment information */}
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Mobile Number:</label>
                        <input type="text" id="number" placeholder="Enter you mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="altermobile">Alternet Number:</label>
                        <input type="text" id="altermobile" placeholder="Enter your alternet mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="landmark">Nearest Landmark:</label>
                        <input type="text" id="landmark" placeholder="Enter your nearest landmark" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Shipping Address:</label>
                        <input type="text" id="zip" placeholder="Enter zip code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Shipping Address:</label>
                        <input type="text" id="address" placeholder="Enter your address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment">Payment Method:</label>
                        <select id="payment">
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>
                </form>
                <button className="checkout-btn">Place Order</button>
            </div>
            <div className="checkout-content">
                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {all_product.map((product) => {
                        if (cartItems[product.id] > 0) {
                            return (
                                <div key={product.id} className="order-summary-item">
                                    <p>{product.name}</p>
                                    <p>Qty: {cartItems[product.id]}</p>
                                    <p>Price: ${product.new_price}</p>
                                    <p>Total: ${(product.new_price * cartItems[product.id]).toFixed(2)}</p>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    
                    })}
                    {/* Display the total amount */}
                    <div className="order-total">
                        <h3>Total Amount: ${getTotalCartAmount().toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
