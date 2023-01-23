//Este esquema para type script
//Data transfer object, datos que se van a mandar entre cliente y servidor (Para métodos post)

export class BaseDTO
{
    public  _id : string;
}

export class PostUserMethod extends BaseDTO{

    public readonly _id: string;
    readonly name: string;
    readonly mail: string;
    readonly password: string;
    readonly securityqOp: string;
    readonly securityqAn: string;
    readonly newAccount:boolean;
    readonly fondoAvatar: string;
    readonly avatarUser: string;
    readonly progreso: string;
    readonly habilidad: string;
    readonly nivel:string;
    readonly puntos: number;
    readonly puntosLvl1Old:number ;
    readonly puntosLvl1New: number;
    readonly puntosLvl2Old: number;
    readonly puntosLvl2New: number;
    readonly notify:boolean[];
    readonly notify2:boolean;
    readonly logros: boolean[];
}

