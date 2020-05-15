import { Component,OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'modalbusquedacliente',
  templateUrl: './modalbusquedacliente.html'
})
export class modalbusquedacliente  implements OnInit{

 dato=[];
 idCliente='';

  constructor(private modal:ModalController,private NavParams:NavParams) {}

  ngOnInit() {
    const dato = this.NavParams.get('data');
    this.dato=dato; 
  }

  dismiss() {
    this.modal.dismiss({
      'dismissed': true,
       id : this.idCliente,
    });
  }

  clienteSeleccionado(cliente:string){
     this.idCliente = cliente;
     this.dismiss();
  }
  
  

}