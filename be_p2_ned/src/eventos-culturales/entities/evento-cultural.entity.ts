import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity';

@Entity('eventos_culturales')
export class EventoCultural {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('int', { name: 'id_recinto' })
  id_recinto: number;

  @ManyToOne(() => Recinto, (recinto) => recinto.eventos, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @Column('varchar', { length: 150 })
  titulo: string;

  @Column('varchar', { name: 'artista_principal', length: 100 })
  artista_principal: string;

  @Column('int', { name: 'duracion_minutos' })
  duracion_minutos: number;

  @Column('decimal', { name: 'precio_entrada', precision: 10, scale: 2 })
  precio_entrada: number;

  @Column('date', { name: 'fecha_evento' })
  fecha_evento: string;

  @Column('varchar', { length: 20 })
  estado: string; // 'Programado', 'Agotado', 'Cancelado'

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}
