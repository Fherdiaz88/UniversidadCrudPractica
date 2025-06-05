import {Injectable,CanActivate,ExecutionContext,UnauthorizedException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No hay roles requeridos
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      console.warn('⚠️ Usuario no autenticado o sin roles definidos');
      throw new UnauthorizedException('Acceso denegado: usuario sin roles');
    }

    console.log('👤 Roles del usuario:', user.roles);
    console.log('🔒 Roles requeridos:', requiredRoles);

    return user.roles.some((role: string) => requiredRoles.includes(role));
  }
}
