import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    id?: number;
    nomeProduto?: string;
    valor?: number;
    dataCad?: Date;
    idCategoria?: number;
}

export class Produto {

    private _id?: number;
    private _nomeProduto: string = '';
    private _valor!: number ;
    private _dataCad?: Date;
    private _idCategoria?: number;

    // CONSTRUTOR
    constructor(
        nomeProduto: string,
        valor: number,
        idCategoria?: number,
        id?: number
    ) {
        this.NomeProduto = nomeProduto;
        this.Valor = valor;
        this._idCategoria = idCategoria;
        this._id = id;
    }

    public get Id(): number | undefined {
        return this._id;
    }

    public get NomeProduto(): string {
        return this._nomeProduto;
    }

    public get Valor(): number {
        return this._valor;
    }

    public get DataCad(): Date | undefined {
        return this._dataCad;
    }

    public get IdCategoria(): number | undefined {
        return this._idCategoria;
    }


    public set NomeProduto(value: string) {
        this._validarNome(value);
        this._nomeProduto = value;
    }

    public set Valor(value: number) {
        this._validarValor(value);
        this._valor = value;
    }


    public static criar(
        nomeProduto: string,
        valor: number,
        idCategoria?: number
    ): Produto {
        return new Produto(nomeProduto, valor, idCategoria);
    }

    public static editar(
        id: number,
        nomeProduto: string,
        valor: number,
        idCategoria?: number
    ): Produto {
        this.validarId(id);
        return new Produto(nomeProduto, valor, idCategoria, id);
    }


    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do produto deve ter pelo menos 3 caracteres");
        }

        if (value.length > 100) {
            throw new Error("Nome do produto deve ter no máximo 100 caracteres");
        }
    }

    private _validarValor(value: number): void {
        if (isNaN(value) || value <= 0) {
            throw new Error("Valor do produto deve ser maior que zero");
        }
    }

    public static validarId(id: number): void {
        if (isNaN(id) || id <= 0) {
            throw new Error("Id inválido");
        }
    }
}