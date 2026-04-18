const BASE_URL = "http://localhost:8080";

// creating new plan-type

export const PlanTypeApi = async (planType: string):Promise<any> => {

    
  const res = await fetch(`${BASE_URL}/api/planType/create`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({planType:planType}),
  });
  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`Failed to add plan type: ${res.status} ${errorText}`);
  }

  return await res.json();
};


//fetch  all plan types
export const getPlanTypeApi =async()=>{

    const res = await fetch (`${BASE_URL}/api/planType/get`,{
        method:"GET",
        headers:{"content-type":"application/json"},
        
    })
    if (!res.ok){
        throw new Error("fetching fail");
    }
    return await res.json()

}
