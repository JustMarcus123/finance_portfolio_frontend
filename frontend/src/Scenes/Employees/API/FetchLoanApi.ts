import BASE_URL from "../../../config/api";

export const fetchingLoanApi = async()=>{

    const response = await fetch(`${BASE_URL}/api/loanrequest/fetchLoanStatus`,{

       method: "GET",
       credentials: "include",
       headers:{"content-type":"application/json"},
    })

    
    if(!response){
        throw new Error("error fetching the loan status");
    }

    return response.json();

}