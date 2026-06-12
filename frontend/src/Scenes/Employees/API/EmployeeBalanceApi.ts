import BASE_URL from "../../../config/api";

export const GetEmployee401kBalance = async()=>{

    const data = await fetch(`${BASE_URL}/api/payroll/fetchBalance`,{
        method:"GET",
        headers:{"content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })

    if(!data.ok){
        throw new Error("fetching balance fail");
    }

    return await data.json()

}

