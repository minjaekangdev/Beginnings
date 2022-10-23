import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise = loadStripe(
  "pk_test_51LhJCtEEphuayzqjq36xsOeY0bnXXEeGDjpyo4j71wcqiQxT57xwkHT6yDYiDGNx3MJsckXYlUdpTSpian4FZnTE00VPwQll5O"
);

function Checkout() {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [item, setItem] = useState({
    price: "price_1LhLiwEEphuayzqjLQ6HOwbo",
    quantity: 1,
  });

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setIsLoading(true);
    console.log("redirect to checkout");

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    console.log("stripe checkout error", error);

    if (error) {
      setStripeError(error.message);
      console.log(stripeError);
    }
    setIsLoading(false);
  };
  const onQuantityChange = (e) => {
    const value = e.target.value;

    setItem((prevState) => {
      const pd = { ...prevState };
      pd.quantity = parseInt(value);
      return pd;
    });
  };

  return (
    <div
      className="container-fluid m-5 p-5 col-7"
      style={{ border: "1px solid lightgrey", borderRadius: "3%" }}
    >
      <div className="product">
        <img
          src="https://media.gq.com/photos/59132b27ee7e6447b1025d05/16:9/w_1280,c_limit/gq-playboi-carti-04.jpg"
          alt="CLOUT GOGGLES"
          style={{ width: "100%" }}
        />
        <div className="description">
          <h3>sunglasses</h3>
          <h5>$100.00</h5>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={onQuantityChange}
          />
        </div>
      </div>
      <form>
        <button
          className="btn btn-primary"
          onClick={redirectToCheckout}
          disabled={isLoading}
          type="button"
        >
          Pay @Stripe
        </button>
      </form>
    </div>
  );
}

export default Checkout;
