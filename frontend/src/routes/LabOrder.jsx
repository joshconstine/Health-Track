import React from "react";

const LabOrder = () => {
    const [labOrders, setLabOrders] = React.useState([]);
    // labOrders =[{
    //     id:1 
    // }]
    const fetchLabOrders = async () => {
        const response = await fetch("http://localhost:4000/labOrders");
        const data = await response.json();
        setLabOrders(data);
    }

    React.useEffect(() => {
        fetchLabOrders();
    }, []);
        
    return (
        <div>
            <h1>Lab order tracker</h1>
        </div>
    );
}

export default LabOrder