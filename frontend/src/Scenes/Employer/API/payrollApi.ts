import BASE_URL from "../../../config/api";



export const fileUploadApi = async(payPeriod:string,payrollType:string,file:any)=>{

    const formData = new FormData();
    formData.append("file",file);
    formData.append("payPeriod", payPeriod);
    formData.append("payrollType",payrollType);
    formData.append("payDate",payPeriod);

    const data = await fetch(`${BASE_URL}/api/payroll/upload`,{
        method: "POST",
        credentials:"include",
        body:formData

    })

    if(!data.ok){
        throw new Error("error file upload please try again");
    }
    

}