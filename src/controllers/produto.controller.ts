import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";

export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            res.status(200).json({ produtos })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }


    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const produto = await this._service.selecionarPorId(id);

            res.status(200).json({ produto });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    criar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valor, idCategoria } = req.body;
            const novoRegistro = await this._service.criar(nomeProduto, valor, idCategoria);
            res.status(201).json({ novoRegistro })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valor,idCategoria } = req.body;
            const id = Number(req.query.id)
            const alterado = await this._service.editar(nomeProduto, valor,idCategoria);
            res.status(200).json({ alterado })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    buscarPorNome = async (req: Request, res: Response) => {
        try {
            const nome = req.query.nome;

            if (!nome || typeof nome !== 'string') {
                return res.status(400).json({ message: 'Parâmetro "nome" é obrigatório' });
            }
            const produtos = await this._service.buscarPorNome(nome);
            return res.status(200).json({ produtos });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }


    selecionarOrdenado = async (req: Request, res: Response) => {
        const produtos = await this._service.selecionarOrdenado();
        res.status(200).json({ produtos });
    };

    deletar = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        await this._service.deletar(id);

        res.status(200).json({
            message: "Produto deletado com sucesso"
        });
    };
}