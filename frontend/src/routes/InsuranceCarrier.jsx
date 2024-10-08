import React from 'react';

import { useParams } from 'react-router-dom';
const InsuranceCarrier = () => {
    const params = useParams();
    const id = params.id;

    return (
        <div>
        <h1>Insurance Carrier</h1>
        <span>{id}</span>
        </div>
    );
    }

export default InsuranceCarrier;