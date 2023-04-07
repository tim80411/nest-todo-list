import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decoractors/roles/roles.decorator';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';

export const Auth = (...roles: string[]) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
