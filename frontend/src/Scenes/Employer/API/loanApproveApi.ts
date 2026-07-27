import BASE_URL from "../../../config/api";


export const loanApproveAPi =async(loanId:string | number): Promise<any>=>{

    const res = await fetch(`${BASE_URL}/api/loanrequest/loanApproveApi/${loanId}`,{
        method:"PUT",
        headers:{"content-type": "application/json"},
        credentials: "include"
    })

    if(!res.ok){
        throw new Error("approval fail");
    }

    return await res.json();

}