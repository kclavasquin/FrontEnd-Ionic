import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AlertController } from "@ionic/angular";
import {TaskService} from '../../services/task.service'
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {modalbusquedacliente} from './modalbusquedacliente';
import {modaladdclientes} from './modaladdclientes';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss']
}) 

export class Clientes implements OnInit {
  
  fechas = new Date();   
  busquedaCliente=[];
  entradaBusquedaCliente='';
  datosCliente=[];

  constructor(private router:Router,private alertCtrl:AlertController,private taskService:TaskService,
    private Loading:LoadingController,private modal:ModalController){}    


  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());    
  }
  ionViewWillEnter(){
    this.limpiar()    
  }

  //Limpiar controles
  limpiar(){
    this.busquedaCliente=[];
    this.entradaBusquedaCliente='';
    this.datosCliente=[];
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

  //buscar Cliente
  buscarClientes(e:any){
    this.LoadingController();           
    if (e.target.value.length>0){
      const buscarCliente = {"buscar" : e.target.value}      
      this.busquedaCliente=[]  
      this.datosCliente=[];    
      this.taskService.getbuscarClientesCatalago(buscarCliente).subscribe(busquedaCliente=>{this.busquedaCliente = busquedaCliente
        if(this.busquedaCliente.length>0){
            this.presentModalBusquedaCliente()
        }else{
            this.busquedaCliente=[];
            this.entradaBusquedaCliente='';
            this.datosCliente=[];    
        }        
       })  
    }else{
        this.busquedaCliente=[]; 
        this.entradaBusquedaCliente='';       
        this.datosCliente=[];    
    }
  }

  //Modal Busqueda Cliente
  async presentModalBusquedaCliente() {
       const modal = await this.modal.create({
       component: modalbusquedacliente,
       componentProps:{ 
                       data:this.busquedaCliente         
                      }
        });    
         await modal.present();
         modal.onDidDismiss()
         .then(res=>{           
                     //Objeto que nos devuel el modal de clientes   
                      var idCliente = res.data.id;
                      this.datosCliente=[]
                      if(this.isEmpty(idCliente)){
                        console.log(idCliente);
                      }else{
                           this.datosCliente =   this.busquedaCliente.filter(cliente=>cliente.Cliente===idCliente);   
                           this.entradaBusquedaCliente='';                                                         
                           }                      
         })
    }  
   
  //verifica si esta vacio un string 
  isEmpty = str => !str.trim().length;
   
  //verifica si esta vacio un arreglo
  isEmptyA = any => !any.length; 
  
  //Modal Busqueda Cliente
  async presentModalAddCliente() {
        const modal = await this.modal.create({
        component: modaladdclientes,
        componentProps:{ 
                        data:[],         
                       }
         });    
          await modal.present();
          modal.onDidDismiss()
          .then(res=>{           
          })
  }  
    

}