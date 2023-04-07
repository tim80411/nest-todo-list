import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 透過reflector取出controller的metaData
    const roles = this.reflector.get('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(resources: string[], target: string[]) {
    return !!resources.find((resource) => target.find((t) => t === resource));
  }
}
