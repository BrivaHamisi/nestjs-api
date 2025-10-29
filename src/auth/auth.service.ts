import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService {
    signup(){
        return ' I am Signed up'
    }

    signin(){
        return ' I am Signed in'
    }
}
