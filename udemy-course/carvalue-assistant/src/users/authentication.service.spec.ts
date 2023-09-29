import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    usersServiceMock = {
      signupUser: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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

  it('When creating an instance it should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Regarding Signup method', () => {
    it('When Signup with non existing email, should return a new user with proper information', async () => {
      // Given

      // When
      const user = await service.handleSignup('test@test.com', 'fakePassword');

      // Then
      const [salt, hashedPassword] = user.password.split('.');
      expect(user.password).not.toBe('fakePassword');
      expect(salt).toBeDefined();
      expect(hashedPassword).toBeDefined();
    });

    it('When Signup with existing email, should throw an exception', async () => {
      // Given
      usersServiceMock.getUserByEmail = () =>
        Promise.resolve([
          { id: 1, email: 'test@test.com', password: 'fakePassword' },
        ]);

      // When & Then
      await expect(
        service.handleSignup('test@test.com', 'fakePassword'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Regarding Signin method', () => {
    it('When Signin with non existing email, should throw an exception', async () => {
      // Given

      // When & Then
      await expect(
        service.handleSignin('test@test.com', 'fakePassword'),
      ).rejects.toThrow(NotFoundException);
    });

    it('When Signin with wrong credentials, should throw an exception', async () => {
      // Given
      usersServiceMock.getUserByEmail = () =>
        Promise.resolve([
          {
            id: 1,
            email: 'test@test.com',
            password: 'fakePassword',
          },
        ]);

      // When & Then
      expect(
        service.handleSignin('test@test.com', 'fakePassword'),
      ).rejects.toThrow(BadRequestException);
    });

    it('When Signin with correct credentials, should retrieve the signed in user', async () => {
      // Given
      usersServiceMock.getUserByEmail = () =>
        Promise.resolve([
          {
            id: 1,
            email: 'test@test.com',
            password:
              '1370515847df5d9b.712fc00c708d2ccf97631fef327ca05952c613c7093b97603a8abd2b4c1ef92c',
          },
        ]);

      // When
      const user = await service.handleSignin('test@test.com', 'fakePassword');

      // Then
      expect(user).toBeDefined();
    });
  });
});
