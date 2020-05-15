import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import {TaskService} from '../../services/task.service'
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'ventareporte',
  templateUrl: './ventareporte.html',
  styleUrls: ['./ventareporte.scss']
}) 

export class ventareporte implements OnInit {
  
  fechas = new Date(); 
  fechaIni:string='';
  fechaFin:string='';
 
  constructor(private router : Router,private alertCtrl: AlertController,private taskService:TaskService,
    private Loading:LoadingController,private modal:ModalController,private barcodeScanner:BarcodeScanner){}    

  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());    
  }
  ionViewWillEnter(){
    this.limpiar()    
  }

  limpiar(){
  }

  ///msj alert regresar 
  async butonRegresar() {
    const alertElment = await this.alertCtrl.create({
      header: "Esta seguro que quiere cerrar la Pantalla?",
      message: "Regresar al Menu",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: () => {            
            this.router.navigateByUrl("/Menu");
          }
        }
      ]
    });
    await alertElment.present();
  }

  //LoadingController barra progreso
  async LoadingController(){
    const loading = await this.Loading.create({
        message: 'por favor espere...',
        duration: 2000
      });
      await loading.present();  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
  }

  datos(){
      
  }


}