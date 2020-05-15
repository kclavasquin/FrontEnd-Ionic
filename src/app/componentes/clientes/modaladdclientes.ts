import { Component,OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {TaskService} from '../../services/task.service'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'modaladdclientes',
  templateUrl: './modaladdclientes.html'
})
export class modaladdclientes  implements OnInit{

 dato=[]; 
 resultadoAdd=[];
 PrimerNombre:string='';
 SegundoNombre:string='';
 PrimerApellido:string='';
 SegunApellido:string='';
 NombreCompleto:string='';
 RTN:string='';
 Identidad:string='';
 Telefono:string='';
 Celular:string='';
 Correo:string='';
 NombreNegocio:string='';
 Direccion:string='';
 codCiudad:string='';
 Ciudad:string='';
 Municipio:string='';
 Departamento:string='';
 //
 buscarCiudad=[];
 ciudadbusqueda:string=''
 //
 cEmpresa:string='';
 cUsuario:string='';

  constructor(private modal:ModalController,private alertCtrl:AlertController,
    private Loading:LoadingController,private NavParams:NavParams,private taskService:TaskService,
    private toastController: ToastController) {}

  ngOnInit() {
    const dato = this.NavParams.get('data');
    this.dato=dato; 
    var cInfoUserRosy =JSON.parse(localStorage.getItem("InfoUserRosy")); 
    this.cEmpresa = cInfoUserRosy[0].Empresa;
    this.cUsuario = cInfoUserRosy[0].Usuario
  }  

  //cerramos el modal de ingresos de clientes
  async cerrarModal() {
    const alertElment = await this.alertCtrl.create({
        header: "Esta seguro que quiere cerrar la Pantalla?",
        message: "Regresar a la pantalla de clientes",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Ok",
            handler: () => {            
                this.modal.dismiss({
                                    'dismissed': true,       
                                  });          
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

  //limpiamos los controles 
  limpiarcontroles(){
    this.dato=[]; 
    this.resultadoAdd=[];
    this.PrimerNombre='';
    this.SegundoNombre='';
    this.PrimerApellido='';
    this.SegunApellido='';
    this.NombreCompleto='';
    this.RTN='';
    this.Identidad='';
    this.Telefono='';
    this.Celular='';
    this.Correo='';
    this.NombreNegocio='';
    this.Direccion='';
    this.codCiudad='';
    this.Ciudad='';
    this.Municipio='';
    this.Departamento=''; 
    this.buscarCiudad=[];   
    this.ciudadbusqueda='';   
  }

  //Buscar ciudades 
  buscarCiudades(e:any){
       if(this.isEmpty(e.target.value)){
        this.buscarCiudad=[];
        this.codCiudad='';
        this.Ciudad='';
        this.Municipio='';
        this.Departamento='';
       }else{      
              const LO_BuscarCiudad ={"buscar": e.target.value};
              this.taskService.getbuscarCiudadesCatalago(LO_BuscarCiudad).subscribe(async buscarCiudad=>{ this.buscarCiudad = await buscarCiudad
              })
            }
  }

  //seleccionarCiudad
  seleccionarCiudad(CiudadSeleccionada){
    const cuidad =[];
    cuidad.push(CiudadSeleccionada);
    this.buscarCiudad =[];
    this.ciudadbusqueda='';
    this.codCiudad=cuidad[0].CodCiudad;
    this.Ciudad=cuidad[0].Ciudad;
    this.Municipio=cuidad[0].Municipio;
    this.Departamento=cuidad[0].Departamento;
  }

   //verifica si esta vacio un string 
   isEmpty = str => !str.trim().length;
   
   //verifica si esta vacio un arreglo
   isEmptyA = any => !any.length; 

   //IngresarClientenuevo
   addCliente(){
       if(this.verificacionCamposvacios()){        
        const addCliente={
                        "primerNombre":this.PrimerNombre.toUpperCase(),
                        "segundoNombre":this.SegundoNombre.toUpperCase(),
                        "primerApellido":this.PrimerApellido.toUpperCase(),
                        "segundoApellido":this.SegunApellido.toUpperCase(),
                        "nombreCompleto":this.PrimerNombre.toUpperCase()+' '+this.SegundoNombre.toUpperCase()+' '+this.PrimerApellido.toUpperCase()+' '+this.SegunApellido.toUpperCase(),
                        "RTN":this.RTN.toUpperCase(),
                        "identidad":this.Identidad.toUpperCase(),
                        "telefono":this.Telefono.toUpperCase(),
                        "celular":this.Celular.toUpperCase(),
                        "correo":this.Correo.toUpperCase(),
                        "nombreNegocio":this.NombreNegocio.toUpperCase(),
                        "direccion":this.Direccion.toUpperCase(),
                        "ciudad":this.codCiudad,
                        "nombreCiudad":this.Ciudad.toUpperCase(),
                        "nombreMunicipio":this.Municipio.toUpperCase(),
                        "nombreDepartamento":this.Departamento.toUpperCase(),
                        "empresa":this.cEmpresa,
                        "usuario":this.cUsuario
                        }
             //Add Clientes nuevos
            this.taskService.addClientes(addCliente).subscribe(resultadoAdd=>{this.resultadoAdd=resultadoAdd
                console.log(this.resultadoAdd);
            })
       }else{
        console.log("Incompleto")
       }       
   }

   //verificamos que se haya ingresado toda la informacion
   verificacionCamposvacios(){
        if(this.isEmpty(this.PrimerNombre)){
            this.presentToast('Campo de Primer Nombre esta vacio')
            return false
        }        
        if(this.isEmpty(this.PrimerApellido)){
            this.presentToast('Campo de Primer Apellido esta vacio')
            return false
        }        
        if(this.isEmpty(this.RTN)){
            this.presentToast('Campo de RTN esta vacio')
            return false
        }
        if(this.isEmpty(this.Identidad)){
            this.presentToast('Campo de Identidad esta vacio')
            return false
        }
        if(this.isEmpty(this.Telefono)){
            this.presentToast('Campo de Telefono esta vacio')
            return false
        }
        if(this.isEmpty(this.Celular)){
            this.presentToast('Campo de Celular esta vacio')
            return false
        }
        if(this.isEmpty(this.Correo)){
            this.presentToast('Campo de Correo esta vacio')
            return false
        }
        if(this.isEmpty(this.NombreNegocio)){
            this.presentToast('Campo de Nombre del Negocio esta vacio')
            return false
        }
        if(this.isEmpty(this.Direccion)){
            this.presentToast('Campo de Direccion esta vacio')
            return false
        }
        if(this.isEmpty(this.Ciudad)){
            this.presentToast('Campo de Ciudad esta vacio')
            return false
        }
        return true;
    }
  
   //Msj de Toast
   async presentToast(cMsj:string) {
    const toast = await this.toastController.create({
      message: cMsj,
      duration: 2000
    });
    toast.present();
   }

}