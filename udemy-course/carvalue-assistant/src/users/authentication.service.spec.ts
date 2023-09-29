import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const usersServiceMock: Partial<UsersService> = {
      signupUser: () => Promise.resolve({} as User),
      getUserByEmail: () => Promise.resolve([]),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    service = module.get(AuthenticationService);
  });

  it('can create an instance of the auth service', () => {
    expect(service).toBeDefined();
  });
});
