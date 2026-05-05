import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: { sign: () => 'mocked-token' },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('returns user without password', async () => {
      const result = await authService.register({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret123',
      });

      expect(result).toEqual({
        id: expect.any(String),
        name: 'Alice',
        email: 'alice@example.com',
      });
      expect((result as any).password).toBeUndefined();
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await usersService.create({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret123',
      });
    });

    it('returns access_token with valid credentials', async () => {
      const result = await authService.login({
        email: 'alice@example.com',
        password: 'secret123',
      });

      expect(result.access_token).toBe('mocked-token');
    });

    it('throws UnauthorizedException with wrong password', async () => {
      await expect(
        authService.login({
          email: 'alice@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when email does not exist', async () => {
      await expect(
        authService.login({
          email: 'ghost@example.com',
          password: 'secret123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('returns user without password', async () => {
      const created = await usersService.create({
        name: 'Bob',
        email: 'bob@example.com',
        password: 'pass123',
      });

      const result = authService.getProfile(created.id);
      expect(result).toEqual({
        id: created.id,
        name: 'Bob',
        email: 'bob@example.com',
      });
      expect((result as any).password).toBeUndefined();
    });

    it('throws UnauthorizedException when user not found', () => {
      expect(() => authService.getProfile('nonexistent')).toThrow(
        UnauthorizedException,
      );
    });
  });
});
