import { useState } from "react";



const Dashboard =()=>{

    const [count, setCount] = useState(0);

    const HandleClick =()=>{
        setCount(count +1);
    }
    return(
        <>
        {/* <p className="text-white">Dashboard</p> */}
    <div>
        {/* <button onClick={HandleClick}> click to count</button>
        {count} */}
    </div>
        </>
    )
};

export default Dashboard;

