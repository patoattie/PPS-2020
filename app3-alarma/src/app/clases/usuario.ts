import { UserFirebase } from '../interfaces/user-firebase';
import { Perfil } from '../enums/perfil.enum';
import { Sexo } from '../enums/sexo.enum';

export class Usuario implements UserFirebase {
    public uid: string;
    public email: string;
    public displayName: string;
    public photoURL: string;
    public emailVerified: boolean;
    public id: number;
    public perfil: Perfil;
    public sexo: Sexo;

    /*constructor(id: string, clave: string) {
        this.id = id;
        this.clave = clave;
        // this.login = false;
    }*/
}
