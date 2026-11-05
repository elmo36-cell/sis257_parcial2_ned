import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from './entities/recinto.entity';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto)
    private recintosRepository: Repository<Recinto>,
  ) {}

  async create(createDto: CreateRecintoDto): Promise<Recinto> {
    const existe = await this.recintosRepository.findOneBy({
      nombre: createDto.nombre,
    });
    if (existe)
      throw new ConflictException('El recinto ya se encuentra registrado');

    const recinto = this.recintosRepository.create(createDto);
    return this.recintosRepository.save(recinto);
  }

  async findAll(): Promise<Recinto[]> {
    return this.recintosRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Recinto> {
    const recinto = await this.recintosRepository.findOneBy({ id });
    if (!recinto)
      throw new NotFoundException('El recinto especificado no existe');
    return recinto;
  }

  async update(id: number, updateDto: UpdateRecintoDto): Promise<Recinto> {
    const recinto = await this.findOne(id);
    Object.assign(recinto, updateDto);
    return this.recintosRepository.save(recinto);
  }

  async remove(id: number): Promise<Recinto> {
    const recinto = await this.findOne(id);
    return this.recintosRepository.softRemove(recinto);
  }
}
