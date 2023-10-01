import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { authApis, endpoints } from '~/config/axiosAPI';
import { Button } from 'react-bootstrap';
import { useLoadingContext } from '~/hook';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ pay, getTotalPrice, setStripeModal }) => {
  const [loading, setLoading] = useLoadingContext();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#000',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontSmoothing: 'antialiased',

        '::placeholder': {
          color: '#000',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    },
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (loading) return;

    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    setLoading(true);
    const result = await stripe.createToken(card);

    if (result.error) {
      setLoading(false);
      console.error(result.error.message);
    } else {
      setLoading(true);
      authApis()
        .post(endpoints.stripe, {
          token: result.token.id,
          amount: getTotalPrice(),
        })
        .then((response) => {
          if (response.data) {
            pay();
            setStripeModal(false);
          } else {
            alert('Payment Failed!');
          }
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <form
      style={{
        width: '500px',
        background: '#ccc',
        padding: '20px 20px',
        borderRadius: '6px',
      }}
      onSubmit={handleSubmit}
    >
      <CardElement options={CARD_ELEMENT_OPTIONS} />

      <Button
        style={{
          marginTop: '12px',
          width: '100%',
        }}
        type='submit'
        disabled={!stripe}
      >
        Pay
      </Button>
    </form>
  );
};

const StripePayment = ({ pay, getTotalPrice, setStripeModal }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        setStripeModal={setStripeModal}
        pay={pay}
        getTotalPrice={getTotalPrice}
      />
    </Elements>
  );
};

export default StripePayment;
