import { TipoImagen } from '../enums/tipo-imagen.enum';

export class Voto {
    public uid: string;
    public usuario: string;
    public imagen: string;
    public tipoImagen: TipoImagen;
}
