const BASE_URL = "http://localhost:8080";

interface SponsorType {
  id: string;
  company_name: string;
  ein: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primary_contact_phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  plan_type:string,
  match_formula:string,
  vesting_schedule:string,
  safe_harbour_plan:string,
  plan_start_date:string,
  sponsorStatus:string
   compliance: string
}

export const createSponsorApi = async (
  company_name: string,
  ein: string,
  primaryContactName: string,
  primaryContactEmail: string,
  primary_contact_phone: string,
  addressLine1: string,
  city: string,
  state: string,
  zipcode: string,
  country: string,
  plan_type:string,
  match_formula:string,
  vesting_schedule:string,
  safe_harbour_plan:string,
  plan_start_date:string,


): Promise<SponsorType> => {
  const res = await fetch(`${BASE_URL}/api/sponsor/create`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ 
        company_name: company_name, 
        ein: ein,
        primaryContactName: primaryContactName,
        primaryContactEmail:primaryContactEmail,
        primary_contact_phone:primary_contact_phone,
        addressLine1:addressLine1,
        city:city,
        state:state,
        zipcode:zipcode,
        country:country,
        plan_type:plan_type,
        match_formula:match_formula,
        vesting_schedule:vesting_schedule,
        safe_harbour_plan:safe_harbour_plan,
        plan_start_date:plan_start_date
     }), // left company_name is what the backend expects and the right one is the actual parameter coming from frontend
  });

  return await res.json();
};


// for fetching all the sponsors
export const fetchAllSponsor = async():Promise<SponsorType[]>=>{

const res = await fetch(`${BASE_URL}/api/sponsor/allsponsor`,{

  method:"GET",
  headers:{"content-type":"application/json"},

})
if(!res.ok){
throw new Error("fetching all sponsor fails");
}

return await res.json();

}


//update the sponsor

export const updateSponsorApi = async(id: string| number , data:any):Promise<any>=>{

const res = await fetch(`${BASE_URL}/api/sponsor/update_sponsor/${id}`,{

  method:"PUT",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)


});

if(!res.ok){
  const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} - ${errorText}`);
}

return await res.json();

};

export const activateSponsorApi = async (id: string | number): Promise<any> => {
  const res = await fetch(`${BASE_URL}/api/sponsor/activate/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Activation failed: ${res.status} - ${errorText}`);
  }

  return await res.json();
};



