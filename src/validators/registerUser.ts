import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsString,
  IsNumber,
  Min,
  Max,
  IsAlphanumeric,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty()
  @Matches(/^01\d{9}$/, {
    message: 'Mobile number must be 11 digits and start with 01',
  })
  mobileNumber: string;
}
