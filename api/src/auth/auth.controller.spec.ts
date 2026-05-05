import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('POST /v1/auth/register', () => {
    it('returns 201 with user data on valid body', async () => {
      const dto = { name: 'Alice', email: 'alice@example.com', password: 'secret123' };
      const response = { id: 'uuid-1', name: 'Alice', email: 'alice@example.com' };
      mockAuthService.register.mockResolvedValue(response);

      await expect(controller.register(dto)).resolves.toEqual(response);
    });

    it('propagates ConflictException when email is taken', async () => {
      mockAuthService.register.mockRejectedValue(new ConflictException());

      await expect(
        controller.register({ name: 'X', email: 'alice@example.com', password: 'abc123' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('POST /v1/auth/login', () => {
    it('returns access_token with valid credentials', async () => {
      const dto = { email: 'alice@example.com', password: 'secret123' };
      mockAuthService.login.mockResolvedValue({ access_token: 'jwt-token' });

      await expect(controller.login(dto)).resolves.toEqual({ access_token: 'jwt-token' });
    });

    it('propagates UnauthorizedException with invalid credentials', async () => {
      mockAuthService.login.mockRejectedValue(new UnauthorizedException());

      await expect(
        controller.login({ email: 'alice@example.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('GET /v1/auth/me', () => {
    it('returns user data for authenticated user', () => {
      const profile = { id: 'uuid-1', name: 'Alice', email: 'alice@example.com' };
      mockAuthService.getProfile.mockReturnValue(profile);

      const result = controller.me({ user: { userId: 'uuid-1' } });
      expect(result).toEqual(profile);
      expect(mockAuthService.getProfile).toHaveBeenCalledWith('uuid-1');
    });

    it('propagates UnauthorizedException when user not found', () => {
      mockAuthService.getProfile.mockImplementation(() => {
        throw new UnauthorizedException();
      });

      expect(() => controller.me({ user: { userId: 'bad-id' } })).toThrow(
        UnauthorizedException,
      );
    });
  });
});
