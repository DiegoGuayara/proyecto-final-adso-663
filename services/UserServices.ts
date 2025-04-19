import { UserRepository } from "../repositories/UserRepository";
import { PersonaDto } from "../Dto/personaDto";
import { AuthDto } from "../Dto/AuthDto";
import bcrypt from "bcryptjs";

export class UserService {
  static async register(user: PersonaDto) {
    const hashedPassword = await bcrypt.hash(user.password!, 10);
    user.password = hashedPassword;
    return await UserRepository.add(user);
  }

  static async login(auth: AuthDto) {
    return await UserRepository.login(auth);
  }
}
