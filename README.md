# NestJS Core💠

This module is a core module used to provide some boilerplate when configuring new projects. It provides some pre-configuration for things like:

1. Request/Response utilities
2. Authentication(Basic, JWT, Api Key)
3. Database configuration
4. Entities & DTO base models

## Dependencies

The following dependencies should be installed

```bash
npm install @nestjs/config @nestjs/jwt @nestjs/passport @nestjs/typeorm @types/bcryptjs auth bcryptjs class-transformer class-validator passport passport-http passport-jwt passport-local pg postgres typeorm passport-localapikey
```

```bash
npm install --dev @types/passport-jwt
```

## Configuration 🔧

In order to use the core module the following files will need to be edited and adjusted at will:

**Database**

Database configuration can be changed in:

- `/path/to/core/database/databas.config.service.ts`

**Authentication**

These are basically the strategies that are used to fetch the users, it can vary depending on your properties and ways of fetching users.

- `/path/to/core/auth/auth.service.ts`
- `/path/to/core/auth/auth.controller.ts`

**Authorization**

The following file takes care of handling authorization, again, it can vary depending on how you are managing roles for your project so it should also be modified.

- `/path/to/core/auth.roles.guard.ts`

## Usage 🥋

TBD

## To-Do 📃

TBD
