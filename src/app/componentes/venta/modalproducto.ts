import { Component,OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'modalproducto',
  templateUrl: './modalproducto.html'
})
export class modalproducto  implements OnInit{

    LO_Etiqueta=[];
    LS_Producto:string='';
    LS_Nombre:string='';
    LN_Precio:number=0.00;
    LN_Precio1:number=0.00;
    LN_Precio2:number=0.00;
    LN_Precio3:number=0.00;
    LN_Precio4:number=0.00;
    LN_NuevoPrecio:number;
    LN_TotalEtiquetas:number=0;
    LN_TotalPrecios:number=0.00;
    

  constructor(private modal:ModalController,private NavParams:NavParams,private alertCtrl: AlertController) {}

  ngOnInit() {
    const dato = this.NavParams.get('data');
    this.LO_Etiqueta=[];
    this.LO_Etiqueta=dato; 
    this.LS_Producto=this.LO_Etiqueta[0].Producto;
    this.LS_Nombre=this.LO_Etiqueta[0].Nombre;
    this.LN_Precio=this.LO_Etiqueta[0].Precio;
    this.LN_Precio1=this.LO_Etiqueta[0].Precio1;
    this.LN_Precio2=this.LO_Etiqueta[0].Precio2;
    this.LN_Precio3=this.LO_Etiqueta[0].Precio3;
    this.LN_Precio4=this.LO_Etiqueta[0].Precio4;
    //
    this.sumarizar();
    //console.log(this.LO_Etiqueta);
  }

   cerrarmodal() {
    this.modal.dismiss({
                        data:this.LO_Etiqueta,
                        'dismissed': true,
                        id:this.LS_Producto
                       });
   }

   //Funcion de Mensajes 
   presentAlert(cHeader, cSubHeader, cMessage) {
        const alert = document.createElement('ion-alert')
        alert.header = cHeader;
        alert.subHeader = cSubHeader;
        alert.message = cMessage;
        alert.buttons = ['Ok'];
        document.body.appendChild(alert);
        return alert.present();
    }
  
    //funcion de sumarizar
    sumarizar(){
        this.LN_TotalEtiquetas=0;
        this.LN_TotalPrecios=0.00;
        for(let i=0;i<this.LO_Etiqueta.length;i++){
            this.LN_TotalPrecios=this.LN_TotalPrecios+this.LO_Etiqueta[i].Precio;
        }
        this.LN_TotalEtiquetas=this.LO_Etiqueta.length;
    }
    
   //verifica si esta vacio un string 
   isEmpty = str => !str.trim().length;

   //Aplicamos un nuevo precio
   nuevoprecio(NuevoPrecio:number){       
        //Verificamos q ingresamos un valor numerico
       if(this.isEmpty(NuevoPrecio.toString()) || NuevoPrecio<=0){
            let cHeader = 'Valor Nulo';
            let cSubHeader = 'Valor invalido';
            let cMessage = 'Ingresar un valor numerico correcto';
            this.presentAlert(cHeader, cSubHeader, cMessage);
            return
       }
        const LN_NuevoPrecioAplicar = NuevoPrecio;
        this.cambioprecios(LN_NuevoPrecioAplicar);
        this.LN_NuevoPrecio=0;
   }

   ///msj alerta si aplicamos el cambio
   async cambioprecios(NuevoPrecio) {
      const nNuevoPrecio = NuevoPrecio;
      //Consultamos si quiere hacer cambio de precio
      const alertElment = await this.alertCtrl.create({
          header: "Esta seguro que quiere Cambiar el Precio ",
          message: "se cambiara el precio de venta al precio seleccionado",
          buttons: [
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Ok",
              handler: () => {            
                 for(let i=0;i<this.LO_Etiqueta.length;i++){
                       this.LO_Etiqueta[i].Precio = nNuevoPrecio;
                 }
                 this.sumarizar();                 
                 this.LN_Precio=this.LO_Etiqueta[0].Precio;                 
              }
            }
          ]
      });
      await alertElment.present();
   }

   //Eliminar Etiqueta
   async eliminarEtiqueta(Etiqueta){
      const cEtiqueta = Etiqueta;
      //
      const alertElment = await this.alertCtrl.create({
        header: "Esta seguro que quiere Eliminar la Etiqueta ",
        message: "# Etiqueta: "+cEtiqueta,
        buttons: [
                  {
                    text: "Cancel",
                    role: "cancel"
                  },
                  {
                    text: "Ok",
                    handler: () => {                      
                                      for(let i=0;i<this.LO_Etiqueta.length;i++){
                                        if(this.LO_Etiqueta[i].Etiqueta===cEtiqueta){
                                            this.LO_Etiqueta.splice(i,1)
                                        }  
                                      }               
                                       this.sumarizar();                                                                     
                    }
                  }
        ]
        });
        await alertElment.present();   
   }

   //Eliminar Todas las Etiquetas
  async eliminarEtiquetaTodas(){
    const alertElment = await this.alertCtrl.create({
      header: "Esta seguro que quiere Eliminar todas las Etiqueta ",
      message: "Todas Etiqueta: ",
      buttons: [
                {
                  text: "Cancel",
                  role: "cancel"
                },
                {
                  text: "Ok",
                  handler: () => {                      
                                   this.LO_Etiqueta=[];
                                   this.sumarizar();                                                                     
                  }
                }
      ]
      });
      await alertElment.present();        
   }

}