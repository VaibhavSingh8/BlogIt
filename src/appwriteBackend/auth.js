import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createUserAccount(email, password, name) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if (user) {

                //call login if user exists

                return this.userLogin(email, password);

            } else {
                return "Account not created!"
            }
        }
        catch (error) {
            throw error;
        }
    }

    async userLogin(email, password) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async userLogout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;