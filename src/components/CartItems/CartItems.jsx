import React, { useContext,useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom';

export const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    const navigate = useNavigate();

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState('');

    const handlePromoCodeSubmit = () => {
        const validPromoCode = 'DISCOUNT10'; // Set your valid promo code here
        if (promoCode === validPromoCode) {
          setDiscount(0.1); // Apply a 10% discount
          setPromoMessage('You get 10% off!');
        } else {
          setPromoMessage('Invalid promo code. Please try again.');
        }
      };

        // Calculate the total amount with discount
    const totalAmount = getTotalCartAmount();
    const discountedAmount = totalAmount - totalAmount * discount;

    const handleProceedToCheckout = () => {
        navigate('/checkout'); // Navigate to the checkout page
    };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p className='total'>Title</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
       {all_product.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return  <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p className='total'>${e.new_price*cartItems[e.id]}</p>
                    <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;
       })}
       <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${discountedAmount.toFixed(2)}</h3>
                </div>
            </div>
            <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)} // Update promo code value
            />
              <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
            {promoMessage && <p style={{color:'green'}}>{promoMessage}</p>}
        </div>
       </div>
    </div>
  )
}
export default CartItems
