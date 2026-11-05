import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';
import { EventoCultural } from './entities/evento-cultural.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventoCultural)
    private eventosRepository: Repository<EventoCultural>,
  ) {}

  async create(createDto: CreateEventoCulturalDto): Promise<EventoCultural> {
    const evento = this.eventosRepository.create(createDto);
    return this.eventosRepository.save(evento);
  }

  async findAll(): Promise<EventoCultural[]> {
    return this.eventosRepository.find({
      order: { titulo: 'ASC' },
      relations: { recinto: true },
    });
  }

  async findOne(id: number): Promise<EventoCultural> {
    const evento = await this.eventosRepository.findOne({
      where: { id },
      relations: { recinto: true },
    });
    if (!evento) throw new NotFoundException('El evento cultural no existe');
    return evento;
  }

  async update(id: number, updateDto: UpdateEventoCulturalDto): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    Object.assign(evento, updateDto);
    return this.eventosRepository.save(evento);
  }

  async remove(id: number): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    return this.eventosRepository.softRemove(evento);
  }
}
