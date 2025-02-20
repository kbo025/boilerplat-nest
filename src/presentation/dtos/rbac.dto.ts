// import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
// import {
//   IsArray,
//   IsEmail,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
// } from 'class-validator';
// import { BaseQueryDto } from 'src/common/types/paginator/baseQuery.dto';
// import { IQueryDto } from 'src/common/types/paginator/paginator.type';
// import { Exclude, Expose } from 'class-transformer';
// import { IBaseRbacEntity, TypeRbac } from 'src/rbac/entities/base.entity';
// import { ILinkRbacEntity } from 'src/rbac/entities/link.entity';
// import { IAssigmentRbacEntity } from 'src/rbac/entities/assignment.entity';
// import { IUserRbacEntity } from 'src/rbac/entities/user.entity';

// @Exclude()
// export class RbacDto implements IBaseRbacEntity {
//   @ApiProperty({ description: 'Name of role/permission' })
//   @Expose()
//   @IsNotEmpty()
//   @IsString()
//   readonly name: string;

//   @ApiProperty({ description: 'Description of role/permission' })
//   @Expose()
//   @IsOptional()
//   @IsString()
//   readonly description: string;

//   @ApiProperty({ description: 'Parent of role/permission' })
//   @Expose()
//   @IsString()
//   @IsOptional()
//   readonly slug: string;

//   type: TypeRbac;
//   id: number;
// }

// export class CreateRbacDto extends OmitType(RbacDto, ['slug', 'id', 'type']) {}
// export class UpdateRbacDto extends PartialType(CreateRbacDto) {}

// @Exclude()
// export class RbacLinkDto implements ILinkRbacEntity {
//   @ApiProperty({ description: 'Role Parent' })
//   @Expose()
//   parent: IBaseRbacEntity;

//   @ApiProperty({ description: 'Permission Child' })
//   @Expose()
//   child: IBaseRbacEntity;
// }

// export class CreateRbacLinkDto {
//   @ApiProperty({ description: 'Parent slug' })
//   @IsString()
//   @IsNotEmpty()
//   parent: string;

//   @ApiProperty({ description: 'children array slugs' })
//   @IsArray()
//   @IsNotEmpty()
//   @IsString()
//   child: string;
// }
// export class FilterRbacDto {
//   @ApiProperty({ description: 'Parent of role/permission' })
//   @IsString()
//   @IsOptional()
//   readonly slug: string;
// }

// export class CreateRbacAssigmentDto {
//   @ApiProperty({ description: 'Email of user' })
//   @IsEmail()
//   @IsNotEmpty()
//   readonly email: string;

//   @ApiProperty({ description: 'Slug of Role/Permission' })
//   @IsString()
//   @IsNotEmpty()
//   readonly slug: string;
// }

// export class QueryRbacDto
//   extends BaseQueryDto<FilterRbacDto>
//   implements IQueryDto<FilterRbacDto> {}

// export class RbacAssigmentDto implements IAssigmentRbacEntity {
//   permission: IBaseRbacEntity;
//   user: IUserRbacEntity;
// }
