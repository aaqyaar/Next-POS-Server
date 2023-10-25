import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  async comparePassword(password: string, hash: string) {
    return await argon2.verify(hash, password);
  }
}
