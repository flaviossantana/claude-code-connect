# Plano: Endpoints de Autenticação (API)

## Objetivo

Implementar registro, login (JWT) e consulta de usuário logado no NestJS, com armazenamento em memória (array) e documentação Swagger.

---

## 1. Instalar dependências

```bash
pnpm --filter api add @nestjs/jwt @nestjs/passport @nestjs/swagger passport passport-jwt bcrypt class-validator class-transformer
pnpm --filter api add -D @types/passport-jwt @types/bcrypt
```

| Pacote | Finalidade |
|---|---|
| `@nestjs/jwt` | Emissão e verificação de tokens JWT |
| `@nestjs/passport` + `passport` + `passport-jwt` | Auth guard padrão NestJS |
| `bcrypt` | Hash de senha |
| `class-validator` + `class-transformer` | Validação de DTOs |
| `@nestjs/swagger` | Geração automática do Swagger UI |

---

## 2. Estrutura de arquivos a criar

```
api/src/
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.service.spec.ts
│   ├── dto/
│   │   └── create-user.dto.ts
│   └── entities/
│       └── user.entity.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.controller.spec.ts
│   ├── auth.service.ts
│   ├── auth.service.spec.ts
│   ├── auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── dto/
│       ├── login.dto.ts
│       └── auth-response.dto.ts
```

---

## 3. Detalhamento por camada

### 3.1 User entity (`users/entities/user.entity.ts`)

```ts
interface User {
  id: string;        // uuid
  name: string;
  email: string;
  password: string;  // hash bcrypt
}
```

### 3.2 UsersService (`users/users.service.ts`)

- Array privado `users: User[]` como armazenamento em memória
- `create(dto): User` — valida e-mail duplicado, faz hash da senha, gera uuid, adiciona ao array
- `findByEmail(email): User | undefined`
- `findById(id): User | undefined`

### 3.3 AuthService (`auth/auth.service.ts`)

- `register(dto)` — delega para `UsersService.create`, retorna user sem senha
- `login(dto)` — busca user por e-mail, compara senha com bcrypt, gera JWT via `JwtService.sign`
- `getProfile(userId)` — busca user por id, retorna sem senha

### 3.4 JWT Strategy (`auth/strategies/jwt.strategy.ts`)

- Extrai token do header `Authorization: Bearer <token>`
- Valida payload e injeta `{ userId, email }` no `request.user`

### 3.5 AuthGuard (`auth/auth.guard.ts`)

- `AuthGuard('jwt')` padrão do `@nestjs/passport`

### 3.6 AuthController (`auth/auth.controller.ts`)

| Verbo | Rota | Auth | Body / Retorno |
|---|---|---|---|
| `POST` | `/v1/auth/register` | Público | Body: `{ name, email, password }` → `201 { id, name, email }` |
| `POST` | `/v1/auth/login` | Público | Body: `{ email, password }` → `200 { access_token }` |
| `GET` | `/v1/auth/me` | JWT Guard | → `200 { id, name, email }` |

---

## 4. DTOs e validação

### CreateUserDto
```ts
@ApiProperty() @IsString() @IsNotEmpty()   name: string;
@ApiProperty() @IsEmail()                   email: string;
@ApiProperty() @IsString() @MinLength(6)    password: string;
```

### LoginDto
```ts
@ApiProperty() @IsEmail()   email: string;
@ApiProperty() @IsString()  password: string;
```

### AuthResponseDto
```ts
@ApiProperty() access_token: string;
```

### UserResponseDto
```ts
@ApiProperty() id: string;
@ApiProperty() name: string;
@ApiProperty() email: string;
```

---

## 5. Configurar Swagger (`main.ts`)

- Adicionar `DocumentBuilder` com título, descrição, versão e `addBearerAuth()`
- Montar `SwaggerModule` em `/api/docs`
- Habilitar `ValidationPipe` global com `whitelist: true`

---

## 6. Registrar módulos (`app.module.ts`)

- Importar `UsersModule` e `AuthModule`
- `AuthModule` importa `JwtModule.register({ secret, signOptions: { expiresIn: '1h' } })`, `PassportModule` e `UsersModule`

---

## 7. Testes unitários

### UsersService spec
- Cria usuário com sucesso
- Rejeita e-mail duplicado (409 Conflict)
- Encontra usuário por e-mail e por id

### AuthService spec
- Registro retorna user sem senha
- Login com credenciais corretas retorna token
- Login com senha errada lança 401
- Login com e-mail inexistente lança 401
- getProfile retorna user sem senha

### AuthController spec
- POST /register → 201 com body válido
- POST /register → 400 com body inválido
- POST /login → 200 com credenciais corretas
- POST /login → 401 com credenciais inválidas
- GET /me → 200 com token válido
- GET /me → 401 sem token

---

## 8. Ordem de execução

1. Instalar dependências
2. Criar `User` entity
3. Criar `UsersModule` + `UsersService` + testes
4. Criar DTOs com validação e decorators Swagger
5. Criar `AuthModule` + `AuthService` + JWT strategy + guard + testes
6. Criar `AuthController` + testes
7. Configurar Swagger e ValidationPipe no `main.ts`
8. Registrar módulos no `AppModule`
9. Testar manualmente via Swagger UI (`http://localhost:3000/api/docs`)

---

## Swagger — Especificação esperada

**POST /v1/auth/register**
- Request body: `{ name: string, email: string, password: string }`
- 201: `{ id: string, name: string, email: string }`
- 400: validação falhou
- 409: e-mail já registrado

**POST /v1/auth/login**
- Request body: `{ email: string, password: string }`
- 200: `{ access_token: string }`
- 401: credenciais inválidas

**GET /v1/auth/me**
- Header: `Authorization: Bearer <token>`
- 200: `{ id: string, name: string, email: string }`
- 401: token ausente ou inválido
