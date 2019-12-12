import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishablekey = 'pk_test_rz9nvbQXUVGNoBZvoRSZfHnI00tC1C3qNx'

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment succesful!')
    }).catch(error => {
      console.log('Payment error ', JSON.parse(error));
      alert(
        'There was an issue with your payment. Please sure you use the provider of your credit card'
      )
    })
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishablekey}
    />
  );
};

export default StripeCheckoutButton;