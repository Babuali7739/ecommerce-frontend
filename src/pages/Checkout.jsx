import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../pages/CSS/Checkout.css';
import { BiColor } from 'react-icons/bi';

const Checkout = () => {
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);

    const discount = 10; 
    const totalAmount = getTotalCartAmount();
    const discountedAmount = totalAmount - (totalAmount * discount / 100);
    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onerror = () => {
            alert("Razorpay SDK failed to load. Are you online?");
        };
        script.onload = async () => {
            try {
                // Initialize the payment options
                const options = {
                    key: 'rzp_live_aySnE0krMpP3SU', // Replace with your Razorpay key
                    amount: (discountedAmount * 100).toFixed(0), // Convert amount to paise (Razorpay uses smallest currency unit)
                    currency: 'INR',
                    name: 'Your Store Name',
                    description: 'Thank you for your purchase',
                    image: 'https://yourstorelogo.com/logo.png', // Replace with your logo URL
                    handler: function (response) {
                        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
                        // Handle payment success logic here
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999"
                    },
                    notes: {
                        address: "Your Store Address"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };

                // Create a new Razorpay object and open the checkout
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error("Payment error:", error);
                alert("Something went wrong with the payment process.");
            }
        };
        document.body.appendChild(script);
    };


    return (
        <div className="checkout">
            {/* Shipping and Payment Information */}
            <div className="shipping-payment-info">
                <h2>Shipping and Payment</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Mobile Number:</label>
                        <input type="text" id="number" placeholder="Enter your mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="altermobile">Alternate Number:</label>
                        <input type="text" id="altermobile" placeholder="Enter your alternate mobile number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="landmark">Nearest Landmark:</label>
                        <input type="text" id="landmark" placeholder="Enter your nearest landmark" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Shipping Zip Code:</label>
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
                <button className="checkout-btn" onClick={loadRazorpay}>Place Order</button>
            </div>

            {/* Order Summary */}
            <div className="checkout-content">
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="header">
                        <span>Image</span>
                        <span>Title</span>
                        <span>Qty</span>
                        <span>Price</span>
                        <span>Total</span>
                    </div>
                    <hr />
                    {all_product.map((product) => {
                        if (cartItems[product.id] > 0) {
                            return (
                                <div key={product.id} className="order-summary-item">
                                    {/* Product Image */}
                                    <img src={product.image} alt={product.name} className="product-image" />

                                    {/* Product Details */}
                                    <span>{product.name}</span>
                                    <span>{cartItems[product.id]}</span>
                                    <span>${product.new_price}</span>
                                    <span>${(product.new_price * cartItems[product.id]).toFixed(2)}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <hr />
                    <div className="order-total">
                        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
                
                
            </div>
            <div className="order-summary-discount">
                    <h2>Discount & Final Total</h2>
                    <div className="order-summary-final">
                        <p>Subtotal:</p>
                        <p>${totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="order-summary-final">
                        <p>Discount({discount}%):</p>
                        <p style={{color:'green'}}>-${(totalAmount * discount / 100).toFixed(2)}
                        </p>
                    </div>
                    <hr />
                    <div className="order-summary-final">
                        <h3>Final-Amount:</h3>
                        <h3 style={{color:'green'}}>${discountedAmount.toFixed(2)}</h3>
                    </div>
                </div>
        </div>
    );
};

export default Checkout;
