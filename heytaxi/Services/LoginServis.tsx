import { Itoken } from "../Models/IToken";
import { IUser } from "../Models/IUser";
import { defaultLink, Login } from "./ServisConfig"

export function GetLogin(email: string, password:string): Promise<Itoken> {

    var data = fetch(defaultLink + Login + "?email="+email+ "&password="+password, {
        method: "GET",
        headers: { "Content-type": "application/json" },
    }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData
        }).catch((error) => {
            console.log("GetLogin Service Error: " + error.message);
        });
    return data;
}
