// import { Prisma } from 'generated/prisma/client';
import { Prisma } from '@prisma/client';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto){
        // generate the password
        const hash = await argon.hash(dto.password);

        try{
            
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

            // return the saved user
            return safeUser;

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError ){
                // duplicate email
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto){
        //find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        //if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password);

        //if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }

        // delete user.hash;
        const { hash: _, ...safeUser } = user;

        //send back the user
        return safeUser;
        
    }
}
