import { TipoImagen } from '../enums/tipo-imagen.enum';
import { Usuario } from './usuario';

export class Imagen {
    public id: string;
    public tipo: TipoImagen;
    public url: string;
    public usuario: string;
}
