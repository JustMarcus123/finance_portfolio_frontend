import BASE_URL from "../../../config/api";

export const GetEmployee401kBalance = async()=>{

    const data = await fetch(`${BASE_URL}/api/payroll/fetchBalance`,{
        method:"GET",
        credentials:"include",
        headers:{"content-type": "application/json"
        }
    })

    if(!data.ok){
        throw new Error("fetching balance fail");
    }

    return await data.json()

}

