import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const InsuranceCarrier = () => {
    const params = useParams();
    const id = params.id;

    const [insuranceCarrier, setInsuranceCarrier] = useState({});


    // {
    //     "id": 1,
    //     "insurance_carrier_id": 1,
    //     "name": "paid",
    //     "date_sent": "2023-01-01T08:00:00.000Z",
    //     "patient_first_name": "Alice",
    //     "patient_last_name": "Johnson",
    //     "invoice_status_id": 1,
    //     "invoice_date": "2023-01-01T08:00:00.000Z"
    // }
    const [invoices, setInvoices] = useState([]);

    const fetchInsuranceCarrier = async (id) => {
        const response = await fetch(`http://localhost:4000/insuranceCarriers/${id}`);
        const data = await response.json();

        setInsuranceCarrier(data);
    }

    const fetchInvoices = async (id) => {
        const response = await fetch(`http://localhost:4000/insuranceCarriers/${id}/invoices`);
        const data = await response.json();

        setInvoices(data);
    }


    useEffect(() => {
        fetchInsuranceCarrier(id);
        fetchInvoices(id);
    }, []);

    return (
        <div>
        <h1>{insuranceCarrier.name}</h1>
        <p>{insuranceCarrier.address}</p>
        <p>{insuranceCarrier.status_name}</p>
            <div>
                <h2>Invoices</h2>
                <ul>
                    {invoices.map((invoice) => {
                        return <div key={invoice.id}>
                            <p>{invoice.name}</p>
                            <p>{invoice.date_sent}</p>
                            <p>{invoice.patient_first_name} {invoice.patient_last_name}</p>
                            <p>{invoice.invoice_date}</p>
                            
                        </div>
                    })}
                </ul>
            </div>
        
        </div>
    );
    }

export default InsuranceCarrier;