

import React , {useState, useEffect} from "react";

import { Link } from 'react-router-dom';
const Practitioners = () => {

    const [practitioners, setPractitioners] = useState([]);

    const fetchPractitioners = async () => {
        const response = await fetch('http://localhost:4000/practitioners');
        const data = await response.json();
        setPractitioners(data);
    }

    useEffect(() => {
        fetchPractitioners();
    }, []);
  
    return (
        <div>
            <h1>Practitioners</h1>
            <table>
                <thead>
                    <tr>
                        <th>Practitioner Id</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Pager Number</th>
                        <th>Type</th>
                        <th>Full Time</th>
                    </tr>
                </thead>
                <tbody>
                    {practitioners.map((practitioner) => (
                        <tr key={practitioner.id}>
                            <td>
                            <Link to={`/practitioners/${practitioner.id}`}>
                                {practitioner.id}
                        </Link>
                                </td>
                            <td>{practitioner.name}</td>
                            <td>{practitioner.phone_number}</td>
                            <td>{practitioner.pager_number}</td>
                            <td>{practitioner.practitioner_type}</td>
                            <td>{practitioner.full_time}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    );
}

export default Practitioners;