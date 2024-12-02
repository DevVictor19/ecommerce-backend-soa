import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';
import { TokenDto } from '../dtos/token.dto';
import { LoginUseCase } from '../usecases/login.usecase';
import { SignupUseCase } from '../usecases/signup.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly SignupUseCase: SignupUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const token = await this.loginUseCase.execute(
      loginDto.email,
      loginDto.password,
    );

    return {
      token,
    };
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.SignupUseCase.execute(
      signupDto.username,
      signupDto.email,
      signupDto.password,
    );
  }
}
