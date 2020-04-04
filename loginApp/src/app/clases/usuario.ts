import { UserFirebase } from '../interfaces/user-firebase';

export class Usuario implements UserFirebase {
    public id: string;
    public clave: string;
    public uid: string;
    public email: string;
    public displayName: string;
    public photoURL: string;
    public emailVerified: boolean;
    // public login: boolean;

    constructor(id: string, clave: string) {
        this.id = id;
        this.clave = clave;
        // this.login = false;
    }
}
