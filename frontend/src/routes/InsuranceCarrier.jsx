import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const InsuranceCarrier = () => {
    const params = useParams();
    const id = params.id;

    const [insuranceCarrier, setInsuranceCarrier] = useState({});

    const fetchInsuranceCarrier = async (id) => {
        const response = await fetch(`http://localhost:4000/insuranceCarriers/${id}`);
        const data = await response.json();
        setInsuranceCarrier(data);
    }

    useEffect(() => {
        fetchInsuranceCarrier(id);
    }, []);
    return (
        <div>
        <h1>{insuranceCarrier.name}</h1>
        <p>{insuranceCarrier.address}</p>
        <p>{insuranceCarrier.status_name}</p>

        
        </div>
    );
    }

export default InsuranceCarrier;