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
            <table>
                <thead>
                    <tr>
                        <th>InsuranceCarrier Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {insuranceCarriers.map((insurance) => (
                        <tr key={insurance.id}>
                            <td>
                                <Link to={`/insuranceCarriers/${insurance.id}`}>
                                    {insurance.id}
                                </Link>
                            </td>
                            <td>{insurance.name}</td>
                            <td>{insurance.address}</td>
                            <td>{insurance.status_name}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    );
}

export default InsuranceCarriers;