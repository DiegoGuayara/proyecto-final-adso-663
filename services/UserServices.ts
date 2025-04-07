import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../Helpers/generateHash';
import Auth from '../Dto/AuthDto';


class UserService {
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }

    static async login(auth: Auth) {
        return await UserRepository.login(auth);
    }
}

export default UserService;