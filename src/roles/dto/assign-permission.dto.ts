import { IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class AssignPermissionDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  permissionIds: number[];
}
