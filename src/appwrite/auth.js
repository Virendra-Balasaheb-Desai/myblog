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
            userAccount = await this.account.create(ID.unique(), email, password,name);
            if(userAccount){
                this.login(email,password);
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log("Create Account Error:",error);   
        }
        return null;
    }

    async login({email,password}){
        try {
            loggedIN = await this.account.createEmailPasswordSession(email, password);
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
        }
        return null;
    }
    async getCurrentUser(){
        try {
            const user = await account.get();
            console.log("User is authenticated:", user);
            return user;
        } catch (error) {
            console.log("User is not authenticated:", user);
            console.log("Get User Error:",error);   
            return null;
        }
    }
    async logout(){
        try {
            const result = await account.deleteSessions();
            console.log("Logout : ", result);
            return user;
        } catch (error) {
            console.log("Unable to logout:", user);
            console.log("Logout Error:",error);   
            return null;
        }
    }


}

const authService = new AuthService()

export default authService