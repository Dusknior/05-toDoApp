import { ListaItem } from './lista-item.model';

export class Lista {
  id: number;
  nombre: string;
  creadaEn: Date;
  terminadaEn: Date;
  terminada: boolean;
  items: ListaItem[];

  constructor(nombre: string) {
    this.nombre = nombre;

    this.creadaEn = new Date();
    this.terminada = false;
    this.items = [];

    this.id = new Date().getTime();
  }
}
