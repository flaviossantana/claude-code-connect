import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('creates a user and returns it with a hashed password', async () => {
      const user = await service.create({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret123',
      });

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@example.com');
      expect(user.password).not.toBe('secret123');
    });

    it('throws ConflictException when email is already registered', async () => {
      await service.create({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret123',
      });

      await expect(
        service.create({
          name: 'Alice2',
          email: 'alice@example.com',
          password: 'other',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findByEmail', () => {
    it('returns the user when email exists', async () => {
      await service.create({
        name: 'Bob',
        email: 'bob@example.com',
        password: 'pass123',
      });

      const found = service.findByEmail('bob@example.com');
      expect(found).toBeDefined();
      expect(found?.name).toBe('Bob');
    });

    it('returns undefined when email does not exist', () => {
      expect(service.findByEmail('ghost@example.com')).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('returns the user when id exists', async () => {
      const created = await service.create({
        name: 'Carol',
        email: 'carol@example.com',
        password: 'pass123',
      });

      const found = service.findById(created.id);
      expect(found).toBeDefined();
      expect(found?.email).toBe('carol@example.com');
    });

    it('returns undefined when id does not exist', () => {
      expect(service.findById('nonexistent-id')).toBeUndefined();
    });
  });
});
