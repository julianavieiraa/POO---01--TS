import { RowDataPacket } from "mysql2";

export interface ICategoria extends RowDataPacket {
    id?: number;
    descricao?: string;
    ativo?: boolean;
    dataCad?: Date
}

// 
export class Categoria {
    private _id?: number;
    private _descricao: string = '';
    private _ativo: boolean;
    private _dataCad?: Date

    //Construtor 
    constructor(descricao: string, ativo?: boolean, id?: number) {
        this.Descricao = descricao;
        this._ativo = ativo ?? true;
        this._id = id;
    }
    //getters
    public get Id(): number | undefined {
        return this._id;
    }

    public get Descricao(): string {
        return this._descricao
    }

    public get DataCad(): Date | undefined {
        return this._dataCad
    }

    public get Ativo(): boolean | undefined {
        return this._ativo;
    }
    // setters
    public set Descricao(value: string) {
        this._validarDescricao(value);
        this._descricao = value;
    }

    // Design Patter => FACTORY
    public static criar(descricao: string): Categoria {
        return new Categoria(descricao);

    }

    public static editar(descricao: string, ativo: boolean, id: number) {
        return new Categoria(descricao, ativo, id);
    }

    private _validarDescricao(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error('Nome da categoria deve ter pelo menos 3 caracteres');
        }
        if (value.trim().length > 45) {
            throw new Error('Nome da categoria deve ter no maximo 45 caracteres');

        }
    }
}