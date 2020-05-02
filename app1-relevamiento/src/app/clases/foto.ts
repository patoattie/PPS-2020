import { FotoCordova } from '../interfaces/foto-cordova';

export class Foto implements FotoCordova {
    public filepath: string;
    public webviewPath: string;
    public base64?: string;
    public name: string;
    // public nameTemp: string;
}
