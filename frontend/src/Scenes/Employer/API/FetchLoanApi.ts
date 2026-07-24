import BASE_URL from "../../../config/api";



export const FetchLoanRequestApi = async()=>{

    const res = await fetch(`${BASE_URL}/api/loanrequest/fetchLoanRequest`,{
        method: "GET",
        credentials: "include",
        headers:{"content-type":"application/json"}
    })

    return res.json()

}