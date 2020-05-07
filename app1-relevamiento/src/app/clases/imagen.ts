import { TipoImagen } from '../enums/tipo-imagen.enum';

export class Imagen {
    public id: string;
    public tipo: TipoImagen;
    public url: string;
    public usuario: string;
    public uid: string;
    public fecha: number;
    // public votos: string[];
}
