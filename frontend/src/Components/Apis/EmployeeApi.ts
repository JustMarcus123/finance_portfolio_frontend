import BASE_URL from "../../config/api";

interface CreateEmployeeTypes{
     firstName:string,
    lastName: string,
    phone: string,
    email: string,
    department: string,
    jobTitle: string,
    annualSalary:string,
    startDate:string,
    deferralRate: string
}



export const CreateEmployeeApi = async(data:CreateEmployeeTypes)=>{

    const response = await fetch(`${BASE_URL}/api/employee/add`,{
        method: "POST",
        headers:{"content-type": "application/json","Authorization":`Bearer ${localStorage.getItem("accessToken")}`},
        
        body:JSON.stringify(data)
    });

    return await response.json();

}