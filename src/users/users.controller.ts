import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':userId/roles')
  @ApiParam({ name: 'userId', type: Number })
  @ApiBody({ type: AssignRoleDto })
  assignRoleToUser(
    @Param('userId') userId: string,
    @Body() body: AssignRoleDto,
  ) {
    return this.usersService.assignRoleToUser(+userId, body.roleId);
  }

 @Get()
@ApiOperation({ summary: 'Listar todos los usuarios con sus roles y permisos' })
findAll() {
  return this.usersService.findAll();
}}