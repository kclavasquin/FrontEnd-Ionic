import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
}) 

export class MenuComponent implements OnInit {
  
  fechas = new Date(); 

  //Menu Principal  InfoUsuario
  menus = [
    {
      id: '1',
      promt:"Usuario",
      opcion: "Usuario",      
      imageURL:
        "assets/img/Usuario.jpg",
      comments: ["Informacion Basica de Usuario", "Sin relevancia"]
    },
    {
      id: "2",
      promt:"Clientes",
      opcion: "Clientes",      
      imageURL:
        "assets/img/clientes.png",
      comments: ["Ejecucion de Cliente", "Proceso en linea"]
    },
    {
      id: "3",
      promt:"Productos",
      opcion: "Productos",      
      imageURL:
        "assets/img/productos.png",
      comments: ["Ejecucion de Productos", "Proceso en linea"]
    },
    {
      id: "4",
      promt:"Venta",
      opcion: "Venta",      
      imageURL:
        "assets/img/ventas.png",
      comments: ["Ejecucion de venta", "Proceso en linea"]
    },
    {
      id: "5",
      promt:"Reporte de Venta",
      opcion: "VentaReporte",      
      imageURL:
        "assets/img/reporte-ventas.png",
      comments: ["Movimientos de ventas", "Relevante"]
    }
  ];


  constructor(private router : Router,private alertCtrl: AlertController){}

  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());
  }


  //activamos la opcion del  menu
  OpcionMenu(id,opcion){
    const Opcion = '/'+opcion
    this.router.navigate([Opcion])
  }

   ///msj alert regresar 
  async butonRegresar() {
    const alertElment = await this.alertCtrl.create({
      header: "Esta seguro que quiere cerrar secion?",
      message: "Cerrar pantalla",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: () => {            
            this.router.navigateByUrl("/IniciaLogin");
          }
        }
      ]
    });
    await alertElment.present();
  }

  // tag Usuario
  tagUsuario(){
    this.router.navigate(['/Usuario'])
  }

}

