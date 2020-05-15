import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import {TaskService} from '../../services/task.service'
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {ModalPage} from './modalpage';
import {modalproducto} from './modalproducto';
import {BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'venta',
  templateUrl: './venta.html',
  styleUrls: ['./venta.scss']
}) 

export class venta implements OnInit {
  
  fechas = new Date(); 
  //Cliente
  tituloCliente:string='';
  inputBuscar='';
  busquedaCliente=[];
  clienteSeleccionado=[];
  entradaEtiqueta:string='';
  totalFactura:number=0.00; 
  totalCantidad:number;
  //model
  etiquetaproducto=[];
  etiqueta=[];
  producto=[];  

  constructor(private router : Router,private alertCtrl: AlertController,private taskService:TaskService,
    private Loading:LoadingController,private modal:ModalController,private barcodeScanner:BarcodeScanner){}    

  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());    
  }
  ionViewWillEnter(){
    this.limpiar()    
  }

  //Controles-------------------------------------------------------------------------------------

  //Limpiar Controles
  limpiar(){    
      this.tituloCliente='';
      this.inputBuscar='';
      this.busquedaCliente=[];
      this.clienteSeleccionado=[];
      this.entradaEtiqueta='';
      //Facturacion
      this.totalFactura=0.00
      this.totalCantidad=0
      this.etiquetaproducto=[];
      this.producto=[];
  }
  
///msj alert regresar Menu
  async butonRegresar() {
    const alertElment = await this.alertCtrl.create({
      header: "Esta seguro que quiere cerrar secion de venta?",
      message: "Cerrar pantalla Venta",
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

  //Funcion de Mnesajes 
  presentAlert(cHeader, cSubHeader, cMessage) {
    const alert = document.createElement('ion-alert')
    alert.header = cHeader;
    alert.subHeader = cSubHeader;
    alert.message = cMessage;
    alert.buttons = ['Ok'];
    document.body.appendChild(alert);
    return alert.present();
}

  // tag Usuario
  tagUsuario(){
    this.router.navigate(['/Usuario'])
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

  //Modal
  async presentModal() {
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps:{ 
         data:this.clienteSeleccionado         
      }
    });    
    return await modal.present();
  }  

  //Modal Productos
  async presentModalproducto(Producto) {
    const LS_Producto = Producto.Producto;
    const LO_EtiquetaP = this.etiqueta; 
    const LO_Etiqueta = LO_EtiquetaP.filter(dato=>dato.Producto==LS_Producto);
    //    
    const modal = await this.modal.create({
      component: modalproducto,
      componentProps:{ 
         data:LO_Etiqueta         
      }
    });    
       await modal.present();  
       modal.onDidDismiss()
            .then(res=>{           
                        //Objeto que nos devuel el modal de productos   
                         var datomodalproducto = res.data.data;
                         
                         //Si eliminamos la ultimo etiqueta obtenemos el codido de producto
                         if(this.isEmptyA(datomodalproducto)){
                           const CodigoProducto = res.data.id;
                           this.elimnarregistrosproducto(CodigoProducto);
                           return
                         }
                         //Obtenemos el producto que modificamos en el modal de productos
                         const cProducto = datomodalproducto[0].Producto             
                         
                         //Eliminamos las etiquetas del arreglo principal para actualizalos con los cambios del modal de productos             
                         for(let i=0;i<datomodalproducto.length;i++){               
                            for(let x=0;x<this.etiqueta.length;x++){
                                if(this.etiqueta[x].Etiqueta===datomodalproducto[i].Etiqueta){
                                  this.etiqueta.splice(x,1);  
                                }
                            }
                         }  
                         let nIndex = 0
                         let bNoexiste=true;
                         for(let i=0;i<this.etiqueta.length;i++){               
                           nIndex=0;
                           bNoexiste=true;
                           for(let x=0;x<datomodalproducto.length;x++){
                                if(this.etiqueta[i].Etiqueta===datomodalproducto[x].Etiqueta && this.etiqueta[i].Producto===datomodalproducto[x].Producto){
                                  bNoexiste = true 
                                }else{
                                      if(this.etiqueta[i].Producto===datomodalproducto[x].Producto){
                                         bNoexiste = false
                                         nIndex = i
                                      }                       
                                    }
                           }
                          if(!bNoexiste){
                             this.etiqueta.splice(nIndex,1);
                          }
                         }
                         //Eliminamos los Productos de la vista para actualizalos con los cambios del moda de productos             
                         for(let i=0;i<this.producto.length;i++){
                            if(this.producto[i].Producto===cProducto){
                              this.producto.splice(i,1);
                            }
                         }
                          //insertamos los cambios //Arreglo Principal
                         for(let i=0;i<datomodalproducto.length;i++){                
                            this.etiqueta.push({"Etiqueta":datomodalproducto[i].Etiqueta,
                                                "Producto":datomodalproducto[i].Producto,
                                                "Nombre":datomodalproducto[i].Nombre,
                                                "Precio":datomodalproducto[i].Precio,
                                                "Precio1":datomodalproducto[i].Precio1,
                                                "Precio2":datomodalproducto[i].Precio2,
                                                "Precio3":datomodalproducto[i].Precio3,
                                                "Precio4":datomodalproducto[i].Precio4,
                                                "Usuario":datomodalproducto[i].Usuario,
                                                "Sucursal":datomodalproducto[i].Sucursal,
                                                "Empresa":datomodalproducto[i].Empresa,
                                                "Uposteo":datomodalproducto[i].Uposteo,
                                                "Fposteo":datomodalproducto[i].Fposteo,
                                                "PC":datomodalproducto[i].PC})
                         }
                         //insertamos los cambios  a la vista principal
                          var cProductoExiste:boolean = false;
                          for(let i=0;i<datomodalproducto.length;i++){
                              for(let x=0;x<this.producto.length;x++){
                                if(datomodalproducto[i].Producto===this.producto[x].Producto){
                                   this.producto[x].Cantidad = this.producto[x].Cantidad+1 ;
                                   this.producto[x].Precio = this.producto[x].Cantidad*datomodalproducto[i].Precio;
                                   cProductoExiste = true;
                                }
                              }
                              if(!cProductoExiste){
                                this.producto.push({"Producto":datomodalproducto[i].Producto,
                                                    "Nombre":datomodalproducto[i].Nombre,
                                                    "Precio":datomodalproducto[i].Precio,
                                                    "Cantidad":1});
                                cProductoExiste=false;
                             }                
                          }
                          //sumarizamos el detalle                                      
                          this.sumarizar();
            })  
  }  

  //Funciones  operativas---------------------------------------------------------------------------

  //Eliminar registros de un producto 
  elimnarregistrosproducto(producto:string){
         const cProducto = producto;
         //Eliminamos los Productos de la vista para actualizalos con los cambios del moda de productos             
         for(let i=0;i<this.producto.length;i++){
            if(this.producto[i].Producto===cProducto){
              this.producto.splice(i,1);
            }
         }
        //elimnamos todas etiquetas del arreglo principal
        const LO_Etiqueta = this.etiqueta.filter(dato=>dato.Producto==cProducto);
        for(let i=0;i<LO_Etiqueta.length;i++){
           for(let e=0;e<this.etiqueta.length;e++){
               if(this.etiqueta[e].Etiqueta===LO_Etiqueta[i].Etiqueta){
                this.etiqueta.splice(e,1);
               }
           }
        }
           //sumarizamos
           this.sumarizar();                          
  }
 
  //verifica si esta vacio un string 
   isEmpty = str => !str.trim().length;
   
   //verifica si esta vacio un arreglo
   isEmptyA = any => !any.length; 

  //buscar Cliente
   buscarCliente(e:any){
    this.LoadingController();
    this.tituloCliente='' 
    this.busquedaCliente=[]
    this.clienteSeleccionado=[];
    if (e.target.value.length>0){
      const buscarCliente = {"buscar" : e.target.value}
      this.taskService.getbuscarClientes(buscarCliente).subscribe(busquedaCliente=>{this.busquedaCliente = busquedaCliente })  
    }else{
        this.busquedaCliente=[]
        this.clienteSeleccionado=[];
    }
  }

  //cliente seleccionado
  clienteSelected(Cliente){    
    const aCliente = Cliente;    
    this.busquedaCliente=[];
    this.clienteSeleccionado=[]; 
    this.inputBuscar='';   
    this.tituloCliente='' 

    if(aCliente){
        this.clienteSeleccionado.push(aCliente);  
        this.tituloCliente='Informacion De Cliente';         
    }      
  }

  //Lectar Etiqueta
  lectarCode(){
    this.barcodeScanner.scan().then(barcodeData => {        
           this.entradaEtiqueta = JSON.stringify(barcodeData);
           const cEtiqueta = this.entradaEtiqueta.toUpperCase();
           this.entradaEtiqueta='';         
           this.buscarEtiqueta(cEtiqueta);
       })
       .catch(err => {
            console.log('Error no se pudo lectar la etiqueta', err);
            this.entradaEtiqueta = '';
            const cEtiqueta = this.entradaEtiqueta.toUpperCase();            
            this.buscarEtiqueta(cEtiqueta);            
       });
  }

  //Lectar Etiqueta
  ingresadEtiqueta(){  
    const cEtiqueta = this.entradaEtiqueta.toUpperCase();
    this.entradaEtiqueta='';       
    this.buscarEtiqueta(cEtiqueta);
  }

  //mandamos ataer la informacion de la etiqueta 
  buscarEtiqueta(etiqueta:string){
      const cEtiqueta = etiqueta;

       //verifica si han ingresado o lectado Etiqueta       
       if (this.isEmpty(cEtiqueta)) {
          let cHeader = 'Etiqueta Invalida';
          let cSubHeader = 'Favor de verificar # Etiqueta';
          let cMessage = 'Incorrecto el No. Etiqueta';
          this.presentAlert(cHeader, cSubHeader, cMessage);
          return
       }

       //verificamos que haya seleccionado cliente
       if(this.isEmptyA(this.clienteSeleccionado)){
          let cHeader = 'Seleccione un Cliente';
          let cSubHeader = 'No puede Buscar producto sin seleccionar un cliente';
          let cMessage = 'Tiene que ingresar un cliente';
          this.presentAlert(cHeader, cSubHeader, cMessage);
          return
       }

      //consultamos sobre la etiqueta
       const filtro={"etiqueta":cEtiqueta};
       this.taskService.getbuscarEtiqueta(filtro).subscribe(etiquetaproducto=>{this.etiquetaproducto=etiquetaproducto
        
        //verificamos si la etiqueta ya fue lectada
        var verificaEtiqueta = this.etiquetaproducto[0].Etiqueta;        
        for(let i=0;i<this.etiqueta.length;i++){
            if(this.etiqueta[i].Etiqueta===verificaEtiqueta){
              let cHeader = 'Etiqueta ya existe';
              let cSubHeader = 'Favor de verificar # Etiqueta ya fue lectada';
              let cMessage = 'Incorrecto el No. Etiqueta';
              this.presentAlert(cHeader, cSubHeader, cMessage);
              return
            }
        }

        //Aplicamos  informacion de Empresa y usuario
         var cInfoUserRosy =JSON.parse(localStorage.getItem("InfoUserRosy"));   
         var verificaSucursal = this.etiquetaproducto[0].Sucursal;
         if(verificaSucursal != cInfoUserRosy[0].Sucursal){
            let cHeader = 'Codigo de Sucursal';
            let cSubHeader = 'Este # numero Etiqueta no pertenece a este Inventario ';
            let cMessage = 'La etiqueta permanece a otro Sucursal';
            this.presentAlert(cHeader, cSubHeader, cMessage);
            return
         };
         //aplicamos inf extra          
          for(let i=0;i<this.etiquetaproducto.length;i++){
             this.etiquetaproducto[i].Usuario=cInfoUserRosy[0].Usuario;
             this.etiquetaproducto[i].Empresa=cInfoUserRosy[0].Empresa;
             this.etiquetaproducto[i].Uposteo=cInfoUserRosy[0].Usuario;
             this.etiquetaproducto[i].Fposteo=this.fechas;
             this.etiquetaproducto[i].PC='Movil'
          };
          //Arreglo Principal
          this.etiqueta.push({"Etiqueta":this.etiquetaproducto[0].Etiqueta,
                             "Producto":this.etiquetaproducto[0].Producto,
                             "Nombre":this.etiquetaproducto[0].Nombre,
                             "Precio":this.etiquetaproducto[0].Precio1,
                             "Precio1":this.etiquetaproducto[0].Precio1,
                             "Precio2":this.etiquetaproducto[0].Precio2,
                             "Precio3":this.etiquetaproducto[0].Precio3,
                             "Precio4":this.etiquetaproducto[0].Precio4,
                             "Usuario":this.etiquetaproducto[0].Usuario,
                             "Sucursal":this.etiquetaproducto[0].Sucursal,
                             "Empresa":this.etiquetaproducto[0].Empresa,
                             "Uposteo":this.etiquetaproducto[0].Uposteo,
                             "Fposteo":this.etiquetaproducto[0].Fposteo,
                             "PC":this.etiquetaproducto[0].PC})

          //Aplicamos la vista 
          var cProductoExiste:boolean = false;
          for(let i=0;i<this.etiquetaproducto.length;i++){
              for(let x=0;x<this.producto.length;x++){
                if(this.etiquetaproducto[i].Producto===this.producto[x].Producto){
                   this.producto[x].Cantidad = this.producto[x].Cantidad+1 ;
                   this.producto[x].Precio = this.producto[x].Cantidad*this.etiquetaproducto[i].Precio1;
                   cProductoExiste = true;
                }
              }
          }
          if(!cProductoExiste){
             this.producto.push({"Producto":this.etiquetaproducto[0].Producto,
                                 "Nombre":this.etiquetaproducto[0].Nombre,
                                 "Precio":this.etiquetaproducto[0].Precio1,
                                 "Cantidad":1})
          }


         this.sumarizar();
         //console.log(this.etiqueta);
        // console.log(this.producto);
      })
  }

  //sumariza el detalle de los productos
  sumarizar(){
    this.totalFactura =0.00;
    this.totalCantidad=0;
    for(let i=0;i<this.producto.length;i++){
       this.totalCantidad = this.totalCantidad+this.producto[i].Cantidad;
       this.totalFactura = this.totalFactura +this.producto[i].Precio;
    }
  }

  //facturar
  facturar(){
    console.log(this.etiqueta);
    console.log(this.producto);
  }

  


}

