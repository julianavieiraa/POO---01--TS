import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";
export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        if (!id || id <= 0) {
            throw new Error("Id inválido");
        }
        const produto = await this._repository.findById(id);
        if (!produto) {
            throw new Error("Produto não encontrado");
        }
        return produto;
    }

    async criar(nomeProduto: string, valor: number, idCategoria: number) {
        if (!nomeProduto) {
            throw new Error("Nome do produto obrigatório");
        }
        return await this._repository.create({nomeProduto,valor, idCategoria});
    }

    async editar(id: number, nomeProduto: string, valor: number, idCategoria?: number
    ) {
        const produto = Produto.editar(id,nomeProduto,valor,idCategoria);

        const result = await this._repository.update(id, produto);

        if (result.affectedRows === 0) {
            throw new Error("Produto não encontrado");
        }

        return result;
    }

    async deletar(id: number) {
        const result = await this._repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Produto não encontrado");
        }

        return result;
    }

    async buscarPorNome(nome: string) {
        if (!nome.trim()) {
            throw new Error("Informe um nome");
        }

        return await this._repository.findByNome(nome);
    }

    async selecionarOrdenado() {
        return await this._repository.findAllOrdenado();
    }
}