import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password,name);
            console.log("user account : ",userAccount);
            
            if(userAccount){
                return userAccount;
            }
            
        } catch (error) {
            console.log("Create Account Error:",error); 
            return error;  
        }
        return false;
    }

    async login({email,password}){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            if(error.code == 401){
                try {
                    const loggedIN = await this.account.createEmailPasswordSession(email, password);
                    if(loggedIN){
                        console.log("Logged In : ",loggedIN); 
                        return loggedIN;
                    }
                    else{
                        console.log("Failed to Login :",loggedIN);
                        return loggedIN;
                    }
                    
                } catch (error) {
                    console.log("Login Error:",error);   
                    return error;
                }
            }

        }
        return false;
    }
    async getCurrentUser(){
        try {
            const user = await this.account.get();
            console.log("User is authenticated:", user);
            return user;
        } catch (error) {
            console.log("Get User Error:",error);   
            return null;
        }
    }
    async logout(){
        try {
            const result = await this.account.deleteSessions();
            console.log("Logout : ", result);
            return result;
        } catch (error) {
            console.log("Logout Error:",error);   
            return error;
        }
    }


}

const authService = new AuthService()

export default authService