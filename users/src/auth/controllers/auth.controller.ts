import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';
import { TokenDto } from '../dtos/token.dto';
import { AuthService } from '../services/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      token,
    };
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.authService.signup(
      signupDto.username,
      signupDto.email,
      signupDto.password,
    );
  }
}
