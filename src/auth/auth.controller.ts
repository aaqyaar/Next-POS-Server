import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: AuthSignInDto) {
    return await this.authService.signIn(body);
  }

  @Public()
  @Post('register')
  async signUp(@Body() body: AuthSignUpDto) {
    return await this.authService.signUp(body);
  }
}
