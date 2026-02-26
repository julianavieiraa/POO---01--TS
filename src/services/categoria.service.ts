// Regras de Negocio, controlar 
import { CategoriaRepository } from "../repository/categoria.repsitoryo";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {
    constructor(private _repository = new CategoriaRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(descricao: string) {
        const categoria = Categoria.criar(descricao);
        return await this._repository.create(categoria);
    }

    async editar(id:number, descricao: string, ativo: boolean){
        const categoria = Categoria.editar(descricao, ativo, id);
        return await this._repository.update(id, categoria)
    }
}