export class DatosUsuario {
    username:string;
    password: string;
;}


export class secionToken{
    public token:string;
    public _id:string;
    public username:string;
    public name: string;
    public email:string;
    public success: boolean;
    public role:string;
    public userrosy:string;
}

export class infUserRosy{    
    public Usuario:string;
    public Nombre: string;
    public Descripcion:string;
    public Sucursal: string;
    public NombreSucursal:string;
    public Empresa:string;
    public NombreEmpresa:string;
}

export class infoUser {
     _id: string;
     name: string;
     password: string;
     email:string;
     admin:string;
     role:string;     
     userrosy:string;
}

