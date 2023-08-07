import { Controller, Post, Body, Get, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from './dto'
import { User } from './entities/user.entity'
import { Response } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User was registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @ApiResponse({ status: 201, description: 'User was logged in', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get()
  dummy(@Res() response: Response) {
    response.status(200).send()
  }
}
