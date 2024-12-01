import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

import { HashService } from '../hash-service.interface';

@Injectable()
export class HashServiceImpl implements HashService {
  async hash(value: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(value, salt);
  }

  compare(value: string, encoded: string): Promise<boolean> {
    return compare(value, encoded);
  }
}
