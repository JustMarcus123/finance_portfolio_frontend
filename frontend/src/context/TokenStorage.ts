const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";


export const TokenStorage={

    // here is the access token
    getAccess:():string|null =>{
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    },

    setAccess: (token: string):void=>{
        localStorage.setItem(ACCESS_TOKEN_KEY,token)
    },

    //space for clearAccess 


    // getRefresh here
    getRefresh:(): string | null =>{
        //check localStorage first (if remember me was used), then sessionStorage
        return localStorage.getItem(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY);
    },

    setRefresh:(token: string , remember:boolean): void =>{
        if(remember){
            localStorage.setItem(REFRESH_TOKEN_KEY,token);
            console.log("refresh token stored in localStorage (Remember me)");
        }else{
            sessionStorage.setItem(REFRESH_TOKEN_KEY,token);
            console.log("Refresh token stored in session Storage");
        }
    },

    clearAll:(): void=>{
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    //Optional : check if user is log in 

}


export default TokenStorage;