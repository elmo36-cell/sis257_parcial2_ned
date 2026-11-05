import { Module } from '@nestjs/common';
import { EventosCulturalesService } from './eventos-culturales.service';
import { EventosCulturalesController } from './eventos-culturales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoCultural } from './entities/evento-cultural.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventoCultural])],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
  exports: [EventosCulturalesService],
})
export class EventosCulturalesModule {}
