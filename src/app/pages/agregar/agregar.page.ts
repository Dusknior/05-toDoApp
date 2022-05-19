import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  public lista: Lista;
  public nombreItem: string;

  constructor(private deseos: DeseosService, private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.deseos.obtenerLista(listaId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseos.guardarStorage();
  }

  cambioCheck() {
    const pendientes = this.lista.items.filter(
      (itemData) => !itemData.completado
    ).length;
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseos.guardarStorage();
  }

  editarItem(item: ListaItem) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Editar item';
    alert.inputs = [
      {
        name: 'titulo',
        type: 'text',
        value: item.desc,
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {},
      },
      {
        text: 'Guardar',
        handler: (data) => {
          if (data.titulo.length === 0) {
            return;
          }
          item.desc = data.titulo;
          this.deseos.guardarStorage();
        },
      },
    ];
    document.body.appendChild(alert);
    alert.present();
  }

  borrarItem(i: number) {
    this.lista.items.splice(i, 1);
    this.deseos.guardarStorage();
  }
}
