const BASE_URL ="http://localhost:8080"

// now attaching jwt to every protected request automatically

const authHeaders = (): HeadersInit =>{
    const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token");
    return{
        "Content-Type": "application/json",
        ...(token? {Authorization:`Bearer${token}`}: {}),

    };
};

//auth endpoints

export const loginApi = async(email:string, password: string)=>{

    console.log("sending request to the spring boot....");

    const res = await fetch (`${BASE_URL}/api/auth/login`,{
        method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({email, password})
    });

    console.log("response status", res.status)

    if(!res.ok){
        const err = await res.json().catch(()=>({}));
        console.log("Error from the server", err)
        throw new Error (err.message ?? "invalid email or password");
    }
    const data = await res.json();
    console.log("Response body");
    return data
}


//user endpoints

export const resgisterApi = async(data:{
    email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
})=>{

    const res = await fetch(`${BASE_URL}/api/users/register`,{
        method:"POST",
        headers :{"Content-type":"application/json"},
        body:JSON.stringify(data),
    });
    if(!res.ok){
        const err = await res.json().catch(()=>({}));
        throw new Error (err.message ?? "Registration failed");
    }
    return res.json();

}