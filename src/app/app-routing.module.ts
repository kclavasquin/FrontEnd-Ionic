import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Servicio del guardias para los accesos
import {AuthGuardService} from '../app/componentes/Guards/auth.guard.service';

//Import de mis Componentes 
import {SingInComponent} from './componentes/user/sing-in/sing-in.component';
import {MenuComponent} from './componentes/menu/menu';
import {infousuario} from './componentes/infousuario/infousuario';
import {Clientes} from  './componentes/clientes/clientes';
import {modalbusquedacliente} from './componentes/clientes/modalbusquedacliente';
import {modaladdclientes} from './componentes/clientes/modaladdclientes';
import {Productos} from './componentes/productos/productos';
import {venta} from './componentes/venta/venta';
import {ModalPage} from './componentes/venta/modalpage';
import {modalproducto} from './componentes/venta/modalproducto'
import {ventareporte} from './componentes/ventareporte/ventareporte'


//rutas del sistema
const routes: Routes = [
  {  path : 'IniciaLogin',component:SingInComponent},
  {  path : 'Menu', component:MenuComponent,canActivate:[AuthGuardService]},
  {  path : 'Usuario', component:infousuario,canActivate:[AuthGuardService]},
  {  path : 'Clientes', component:Clientes,canActivate:[AuthGuardService]},
  {  path : 'modalbusquedacliente', component:modalbusquedacliente},
  {  path : 'modaladdclientes', component:modaladdclientes},
  {  path : 'Productos', component:Productos,canActivate:[AuthGuardService]},
  {  path : 'Venta', component:venta,canActivate:[AuthGuardService]},
  {  path : 'ModalPage', component:ModalPage},
  {  path : 'modalproducto', component:modalproducto},
  {  path : 'VentaReporte', component:ventareporte,canActivate:[AuthGuardService]},
  {  path : ' ', pathMatch:'full', redirectTo:'IniciaLogin'},
  {  path : '**', pathMatch:'full', redirectTo:'IniciaLogin'} 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


