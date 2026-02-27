// Regras de Negocio, controlar 
import { CategoriaRepository } from "../repository/categoria.repsitory";
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

    async editar(id: number, descricao: string, ativo: boolean) {
        const categoria = Categoria.editar(descricao, ativo, id);
        return await this._repository.update(id, categoria)
    }

    async deletar(id: number) {
        const resultado = await this._repository.delete(id);
        if (resultado.affectedRows === 0) {
            throw new Error("Categoria não encontrada");
        }
        return resultado;
    }

    async selecionarPorId(id: number) {
        Categoria.validarId(id);
        const categoria = await this._repository.findById(id);
        if (!categoria) {
            throw new Error("Categoria não encontrada");
        }
        return categoria;
    }

    async buscarPorNome(nome: string) {
        return await this._repository.findByNome(nome);
    }

    async selecionarOrdenado() {
        return await this._repository.findAllOrdenado();
    }



}
