import { Injectable } from '@angular/core';

//Modulo para los observables
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//Ruta de Domain
import { DomainService } from '../domain/domain.service'

//Importamos el modulo para importar los datos 
import{HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class TaskService {

  constructor(private http:HttpClient,private DomainService:DomainService) {}

  // Definimos las ruta de Nuestra API 
  domain:string = this.DomainService.RutaDomain();


  ///*********************************Acceso Opcion Menu 
  getAccesoOpcionMenu(ParmetroAccesoOpcionMenu):Observable<any>{
    let _params =  ParmetroAccesoOpcionMenu;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AccesoOpcionMenu/`,_params,{headers: headers});
  }
  ///**************fin*/

  //****Buscar Clientes */
  getbuscarClientes(busquedaCliente):Observable<any>{    
    let _params =  busquedaCliente;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/buscarCliente/`,_params,{headers: headers});
  }

  getbuscarClientesCatalago(busquedaCliente):Observable<any>{    
    let _params =  busquedaCliente;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/buscarClienteCatalago/`,_params,{headers: headers});
  }

  getbuscarCiudadesCatalago(buscarCiudad):Observable<any>{    
    let _params =  buscarCiudad;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/buscarCiudadesCatalago/`,_params,{headers: headers});
  }
  
  //****Buscar etiqueta */
  getbuscarEtiqueta(filtro):Observable<any>{    
    let _params =  filtro;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/buscarEtiqueta/`,_params,{headers: headers});
  }
  
   //****Buscar etiqueta */
   addClientes(filtro):Observable<any>{    
    let _params =  filtro;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/addClientes/`,_params,{headers: headers});
  }

   //****Buscar producto */
   getbuscarProducto(filtro):Observable<any>{  
     console.log(filtro);  
    let _params =  filtro;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/buscarProducto/`,_params,{headers: headers});
  }

}
