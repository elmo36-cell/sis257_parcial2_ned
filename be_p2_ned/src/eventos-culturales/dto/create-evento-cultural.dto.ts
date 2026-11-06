import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventoCulturalDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del recinto es obligatorio' })
  @IsInt({ message: 'El ID del recinto debe ser un número entero' })
  readonly id_recinto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El título del evento es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MaxLength(150, { message: 'El título no puede exceder los 150 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  readonly titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El artista principal es obligatorio' })
  @IsString({ message: 'El artista debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El artista no puede exceder los 100 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  readonly artista_principal: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La duración en minutos es obligatoria' })
  @IsInt({ message: 'La duración debe ser un número entero' })
  readonly duracion_minutos: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio de entrada es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un valor decimal válido' })
  readonly precio_entrada: number;

  @ApiProperty({ example: '2026-12-31' })
  @IsNotEmpty({ message: 'La fecha del evento es obligatoria' })
  @IsDateString(
    {},
    {
      message: 'La fecha del evento debe tener un formato válido (YYYY-MM-DD)',
    },
  )
  readonly fecha_evento: string;

  @ApiProperty({ enum: ['Programado', 'Agotado', 'Cancelado'] })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsEnum(['Programado', 'Agotado', 'Cancelado'], {
    message: 'El estado debe ser: Programado, Agotado o Cancelado',
  })
  readonly estado: string;

  @ApiProperty({
    example: 'Entrada Pagada',
    enum: ['Entrada Pagada', 'entrada gratuita', 'pase invitacion'],
  })
  @IsNotEmpty({ message: 'El tipo de entrada es obligatorio' })
  @IsString()
  @IsIn(['Entrada Pagada', 'Entrada gratuita', 'Pase de invitación'], {
    message: 'El tipo de entrada no es válido',
  })
  tipo_entrada: string;
}
