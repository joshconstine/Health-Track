import React , {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const InsuranceCarriers = () => {

    const [insuranceCarriers, setInsuranceCarriers] = useState([]);

    const fetchInsuranceCarriers = async () => {
        const response = await fetch('http://localhost:4000/insuranceCarriers');
        const data = await response.json();
        setInsuranceCarriers(data);
    }

    useEffect(() => {
        fetchInsuranceCarriers();
    }, []);

    return (
        <div>
            <h1>InsuranceCarriers</h1>
            <ul>
                {insuranceCarriers.map((insurance) => {
                    return  <div key={insurance.id}>
                        <Link
                            to={`/insuranceCarriers/${insurance.id}`}
                        >{insurance.name} ID: {insurance.id} </Link>
                        <p>{insurance.address}</p>
                        <p>{insurance.status_name}</p>
                    </div>
                })}
            </ul>
        </div>
    );
}

export default InsuranceCarriers;