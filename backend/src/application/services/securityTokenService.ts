import {ProvideSingleton} from "../util/provideSingleton";
import HttpError from "../middleware/httpError";

interface TokenResponse {
    token: string;
    code: number;
    message: string;
}

@ProvideSingleton(SecurityTokenService)
export class SecurityTokenService {
    async getSecurityToken(): Promise<string> {
        try {
            const uri = "https://api.jobijoba.com/v3/fr/login";
            const response = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: process.env.TOKEN_ID,
                    client_secret: process.env.TOKEN_SECRET,
                }),
            });

            if (!response.ok) {
                throw HttpError.unauthorized(`Failed to fetch token: ${response.statusText}`);
            }

            const data: TokenResponse = await response.json();
            return data.token;
        } catch (e) {
            throw new Error(`Error fetching token: ${e instanceof Error ? e.message : 'Unknown error'}`);
        }
    }
}