import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let authenticationServiceMock: Partial<AuthenticationService>;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    authenticationServiceMock = {
      handleSignup: () =>
        Promise.resolve({
          id: 1,
          email: 'test@test.com',
          password: 'fakePassword',
        } as User),
      handleSignin: () =>
        Promise.resolve({
          id: 1,
          email: 'test@test.com',
          password: 'fakePassword',
        } as User),
    };

    usersServiceMock = {
      getUserById: () => Promise.resolve({} as User),
      getUserByEmail: () => Promise.resolve([]),
      removeUser: () => Promise.resolve({} as User),
      updateUser: () => Promise.resolve({} as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('When creating an instance it should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Regarding Signup method', () => {
    it('When signup with correct information, should retrieve an user', async () => {
      // Given
      const session = { userId: -10 };

      // When
      const user = await controller.signupUser(
        { email: 'test@test.com', password: 'fakePassword' },
        session,
      );

      // Then
      expect(user).toBeDefined();
      expect(session.userId).toBe(1);
    });
  });

  describe('Regarding Signin method', () => {
    it('When signin with correct information, should retrieve an user', async () => {
      // Given
      const session = { userId: -10 };

      // When
      const user = await controller.signinUser(
        { email: 'test@test.com', password: 'fakePassword' },
        session,
      );

      // Then
      expect(user).toBeDefined();
      expect(session.userId).toBe(1);
    });
  });

  describe('Regarding Logout method', () => {
    it('When logout, session should be cleaned', async () => {
      // Given
      let session = { userId: 1 };

      // When
      session = await controller.logoutUser(session);

      // Then
      expect(session.userId).toBeNull();
    });
  });
});
