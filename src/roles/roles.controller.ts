import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags, ApiBody, ApiParam, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.createRole(body.name);
  }

  @Post('permissions')
  @ApiBody({ type: CreatePermissionDto })
  createPermission(@Body() body: CreatePermissionDto) {
    return this.rolesService.createPermission(body.name);
  }

  @Post(':roleId/permissions')
  @ApiParam({ name: 'roleId', type: Number })
  @ApiBody({ type: AssignPermissionDto })
  assignPermissionToRole(
    @Param('roleId') roleId: string,
    @Body() body: AssignPermissionDto,
  ) {
    return this.rolesService.assignPermissionsToRole(+roleId, body.permissionIds);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los roles con sus permisos' })
  findAllRoles() {
    return this.rolesService.findAllRoles();
  }

  @Get('permissions/all')
  @ApiOperation({ summary: 'Listar todos los permisos' })
  findAllPermissions() {
    return this.rolesService.findAllPermissions();
  }
}
