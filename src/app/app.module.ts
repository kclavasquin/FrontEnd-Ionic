import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

//Servicios 
import {TaskService} from './services/task.service'
import {DomainService} from './domain/domain.service'
import {SharedService} from '../app/componentes/user/Shared/shared.service';
import {AuthGuardService} from '../app/componentes/Guards/auth.guard.service';


//Importamos el modulo HttpClient tambien  en nuestro app.module.ts 
import {HttpClientModule} from '@angular/common/http';

//Hay que importalo para ngModel de los input
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  

//Componentes 
import { SingInComponent } from './componentes/user/sing-in/sing-in.component';
import {MenuComponent} from './componentes/menu/menu';
import { infousuario} from './componentes/infousuario/infousuario';
import {Clientes} from  './componentes/clientes/clientes';
import {modalbusquedacliente} from './componentes/clientes/modalbusquedacliente';
import {modaladdclientes} from './componentes/clientes/modaladdclientes';
import {Productos} from './componentes/productos/productos';
import {venta} from './componentes/venta/venta';
import {ModalPage} from './componentes/venta/modalpage';
import{modalproducto} from './componentes/venta/modalproducto';
import {ventareporte} from './componentes/ventareporte/ventareporte'


 
@NgModule({
  declarations: [AppComponent,
                 SingInComponent,
                 MenuComponent,
                 infousuario,
                 venta,
                 ModalPage,
                 modalproducto,
                 Clientes,
                 modalbusquedacliente,
                 modaladdclientes,
                 Productos,
                 ventareporte],

  entryComponents: [],

  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            FormsModule,
            HttpClientModule,            
            ],

  providers: [    
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    TaskService,
    DomainService,
    SharedService,
    AuthGuardService,
    { provide: RouteReuseStrategy,
     useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {}
