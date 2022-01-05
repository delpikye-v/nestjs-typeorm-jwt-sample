import * as bcrypt from 'bcryptjs'

import { BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

import { Response, Request } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
    async register(
        @Body('user_name') userName: string,
        @Body('email') email: string,
    ) {
        let password = await bcrypt.hashSync('1234567', 8)
        let user = this.appService.create({
            userName,
            email,
            password,
            activated: 0,
            isAdmin: 0
        })
        let response = {...user}

        delete response['password'];
        return response;
    }

    @Post('login')
    async login(
        @Body('user_name') userName: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.appService.findOne({ userName });

        if (!user || !await bcrypt.compare(password, user.password)) {
          throw new BadRequestException('invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({id: user.id});

        // save to cookie
        response.cookie('jwt', jwt, { httpOnly: true }); // only use http
        return {
            result: true
        };
    }
}
