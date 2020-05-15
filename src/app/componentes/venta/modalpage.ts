import { Component,OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'modal-page',
  templateUrl: './modalpage.html'
})
export class ModalPage  implements OnInit{

 datoCliente=[];

  constructor(private modal:ModalController,private NavParams:NavParams) {
  }

  ngOnInit() {
    const dato = this.NavParams.get('data');
    this.datoCliente=dato; 
    //console.log(this.datoCliente);
  }

  dismiss() {
    this.modal.dismiss({
      'dismissed': true
    });
  }
  
  

}