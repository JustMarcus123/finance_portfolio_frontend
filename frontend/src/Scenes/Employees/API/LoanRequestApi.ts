import BASE_URL from "../../../config/api";


interface requestedLoanTypes {
loanAmount: string,
loanPurpose: string,
repaymentTerm : string
}


export const LoanRequestApi = async(data:requestedLoanTypes)=>{

    try {
        
        const response = await fetch(`${BASE_URL}/api/loanrequest/newRequest`,
            {
                method:"POST",
                credentials: "include",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(data)
            }
        )
        if(!response.ok){
            const errorBody = await response.json().catch(()=> null);
            throw new Error(errorBody?.message || `Request failed with status ${response.status}`)
        }

        return response.json();

    } catch (error) {
        console.error("LoanRequestApi failed", error);
        throw error;
    }

}