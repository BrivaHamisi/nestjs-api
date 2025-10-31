import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto){
        // generate the password
        const hash = await argon.hash(dto.password);

        // save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
            // select: {
            //     email: true,
            //     id: true,
            //     createdAt: true,
            // }
            
        });

        // delete user.hash;
        const { hash: _, ...safeUser } = user;
        return safeUser;

        // return the saved user
        return user;
    }

    signin(){
        return ' I am Signed in'
    }
}
