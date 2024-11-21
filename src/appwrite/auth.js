import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({ email, password }); // Auto-login after account creation
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            return await this.getCurrentUser();
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.message.includes("missing scope")) {
                console.error("User is not authenticated. Returning null.");
            } else {
                console.error("Appwrite service :: getCurrentUser :: error", error);
            }
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("Appwrite service :: User logged out successfully.");
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
