import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @MaxLength(20, {
    message: '最大值為20 $value $property $target $constraint1',
  })
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsBoolean()
  public readonly isCompleted: boolean;
}
