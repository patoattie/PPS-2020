import { UserFirebase } from '../interfaces/user-firebase';
import { Perfil } from '../enums/perfil.enum';
import { Sexo } from '../enums/sexo.enum';
import { Credito } from '../clases/credito';

export class Usuario implements UserFirebase {
    public uid: string;
    public email: string;
    public displayName: string;
    public photoURL: string;
    public emailVerified: boolean;
    public id: number;
    public perfil: Perfil;
    public sexo: Sexo;
    public creditos?: Credito[];
    public saldo?: number;

    /*constructor(id: string, clave: string) {
        this.id = id;
        this.clave = clave;
        // this.login = false;
    }*/
}
