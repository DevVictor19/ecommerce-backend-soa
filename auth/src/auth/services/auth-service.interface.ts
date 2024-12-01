export abstract class AuthService {
  abstract login(email: string, password: string): Promise<string>;
  abstract signup(
    username: string,
    email: string,
    password: string,
  ): Promise<void>;
}
