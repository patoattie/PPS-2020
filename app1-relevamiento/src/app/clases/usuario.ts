import { UserFirebase } from '../interfaces/user-firebase';
import { Perfil } from '../enums/perfil.enum';
import { Sexo } from '../enums/sexo.enum';
import { Imagen } from './imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';

export class Usuario implements UserFirebase {
    public uid: string;
    public email: string;
    public displayName: string;
    public photoURL: string;
    public emailVerified: boolean;
    public id: number;
    public perfil: Perfil;
    public sexo: Sexo;
    public imagenes?: Imagen[];
    // public votos?: TipoImagen[];

    /*constructor(id: string, clave: string) {
        this.id = id;
        this.clave = clave;
        // this.login = false;
    }*/
}
