import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getMe(@Req() req: Request) {
        console.log({ 'User': req.user });
        return 'User Info';
    }
}
