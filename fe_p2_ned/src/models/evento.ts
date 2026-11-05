import type { IRecinto } from './recinto'

export interface IEventoCultural {
  id?: number
  id_recinto: number
  recinto?: IRecinto
  titulo: string
  artista_principal: string
  duracion_minutos: number
  precio_entrada: number
  fecha_evento: string
  estado: 'Programado' | 'Agotado' | 'Cancelado'
}
