import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {TaskService} from '../../services/task.service';
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
}) 

export class Productos implements OnInit {
  
  fechas = new Date(); 
  entradaBusquedaProducto:string;
  datosProducto=[];
  Productos=[];
  Producto=[];

  constructor(private router : Router,private alertCtrl: AlertController,private Loading:LoadingController,
              private taskService:TaskService,){}

  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());
  }
  ionViewWillEnter(){
    this.limpiar()    
  }

  //Limpiar controles
  limpiar(){
    this.datosProducto=[];
    this.entradaBusquedaProducto='';
    this.Productos=[];
    this.Producto=[];
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


  //buscar productos
  buscarProducto(e:any){
    this.LoadingController();   
    if (e.target.value.length>0){
      const buscarProducto = {"buscar" : e.target.value};      
      this.datosProducto=[];    
      this.Productos=[];
      this.Producto=[];
       this.taskService.getbuscarProducto(buscarProducto).subscribe(datosProducto=>{this.datosProducto = datosProducto
        this.Productos=this.datosProducto;                 
       })  
    }else{
      this.datosProducto=[];    
      this.Productos=[];
      this.Producto=[];
      this.entradaBusquedaProducto ='';    
    }
  }

  //producto Seleccionado
  productoSeleccionado(producto:string){
    this.Producto=[];
    this.entradaBusquedaProducto ='';    
    const productoSeleccionado = producto;
    this.Producto = this.Productos.filter(prod=>prod.Producto===productoSeleccionado)
    this.Productos=[];
  }


}