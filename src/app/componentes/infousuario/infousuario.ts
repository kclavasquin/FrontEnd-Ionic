import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AlertController } from "@ionic/angular";



@Component({
  selector: 'infousuario',
  templateUrl: './infousuario.html',
  styleUrls: ['./infousuario.scss']
}) 

export class infousuario implements OnInit {
  
  fechas = new Date(); 
  infUserRosy = localStorage.getItem('InfoUserRosy');
  datouseruario = JSON.parse(this.infUserRosy);

  menus = [
    {
      id: '1',
      promt:"Usuario",
      opcion: "Usuario",      
      imageURL:
        "assets/img/Usuario.jpg",
      comments: ["Informacion Basica de Usuario", "Sin relevancia"]
    }
  ];

  constructor(private router : Router,private alertCtrl: AlertController){}

  ngOnInit() {
    this.fechas.setDate(this.fechas.getDate());    
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


}