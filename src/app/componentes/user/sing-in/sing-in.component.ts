import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule }    from '@angular/core';


import {DatosUsuario,secionToken,infoUser,infUserRosy} from '../modelos';
import{SharedService} from '../Shared/shared.service';

////Importamos el modulo o clase para las rutas 
import{Router} from '@angular/router';



@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
}) 

export class SingInComponent implements OnInit {
  
  
  DatosUsuario: DatosUsuario[];
  usuario:string;
  password:string;
  infUserRosy:infUserRosy[];
  secionToken:secionToken[];
  msg=[];
  hideDatos:boolean=true;
  fechas = new Date(); 

  constructor(private SharedService: SharedService,
              private router: Router){}

  ngOnInit() {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('InfoUser');
    localStorage.removeItem('Role');
    localStorage.removeItem('InfoUserRosy');
    this.fechas.setDate(this.fechas.getDate());
  }

  ionViewWillEnter(){
    this.limpiar()
  }
  


  InicioSecion(){
     var Datos = {
       username : this.usuario,
       password: this.password};
       this.msg=[];
      
     this.DatosUsuario=[];
     this.DatosUsuario.push(Datos);    
     
     this.SharedService.AuthenUser(this.DatosUsuario).subscribe(secionToken=>{
             this.secionToken = secionToken
             console.log(this.secionToken)
            
             //Limpiamos la Varibles de Local Storage
             localStorage.removeItem('Usuario');
             localStorage.removeItem('InfoUser');
             localStorage.removeItem('Role');
             localStorage.removeItem('InfoUserRosy');

             ///Inf usuario de Rosy
             this.SharedService.UserRosy(this.secionToken).subscribe(infUserRosy=>{
               this.infUserRosy = infUserRosy
               console.log(this.infUserRosy)
              
              ////servicio que autentifica al usuario 
              this.SharedService.usuarioEstaAutenticado(this.secionToken,this.infUserRosy)             

            //msg
             this.msg.push(this.secionToken);             
             for(let i=0;i<this.msg.length;i++){
               if(this.msg[i].success==false){
                  this.hideDatos=false;                  
               }
             }
             
             //Iniciamos Secion
             if(localStorage.getItem('Usuario')=='Autenticado'){                               
              this.router.navigate(['/Menu'])
             }

             //
            })      
        });
  }

  OcultaMsg(){
    this.msg=[];
    this.hideDatos=true; 
  }

 limpiar(){
  this.DatosUsuario=[];
  this.usuario="";
  this.password="";
  this.infUserRosy=[];
  this.secionToken=[];
  this.msg=[];
  this.hideDatos=true;
  localStorage.removeItem('Usuario');
  localStorage.removeItem('InfoUser');
  localStorage.removeItem('Role');
  localStorage.removeItem('InfoUserRosy');   
 }


}

