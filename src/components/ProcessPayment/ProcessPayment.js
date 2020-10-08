import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';



const stripePromise = loadStripe('pk_test_51HZr9GLVoFmXs1X2Ur8De4DlFcFzKmWBjHxbjF91XhSgAiO6ujsEVoVfpbnvihNRIDlsKZPymKGUvSjxeEHmDWoQ00NxaeEbFZ');

const ProcessPayment = ({handlePayment}) => {
    return (
        <div>
              <Elements stripe={stripePromise}>
        <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        {/* <SplitCardForm></SplitCardForm> */}
    </Elements> 
        </div>
    );
};

export default ProcessPayment;