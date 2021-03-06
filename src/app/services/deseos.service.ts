import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root',
})
export class DeseosService {
  public listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }

  editarLista(lista: Lista) {
    this.listas = this.listas.map((listaData) => {
      if (listaData.id === lista.id) {
        return lista;
      } else {
        return listaData;
      }
    });
    this.guardarStorage();
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter((listaData) => listaData.id !== lista.id);
    this.guardarStorage();
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find((listaData) => listaData.id === id);
  }
}
