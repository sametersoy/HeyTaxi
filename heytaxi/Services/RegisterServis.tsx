import AsyncStorage from "@react-native-async-storage/async-storage";
import { Itoken } from "../Models/IToken";
import { IUser } from "../Models/IUser";
import { defaultLink, Register } from "./ServisConfig"



export function addRegister(user: IUser): Promise<Itoken> {
   
    

    var data = fetch(defaultLink + Register, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
    }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData
        }).catch((error) => {
            console.log("addRegister Service Error: " + error.message);
        });
    return data;
}
