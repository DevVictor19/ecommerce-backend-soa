import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toDto(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity._id;
    dto.username = entity.username;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
