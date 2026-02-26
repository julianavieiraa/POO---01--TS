import { CategoriaService } from "../services/categoria.service";
import { Request, Response } from "express";

export class CategoriaController {
    constructor(private _service = new CategoriaService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            res.status(200).json({ categorias })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'})
        }
    }

        criar = async (req: Request, res: Response) => {
        try {
            const {descricao} = req.body;
            console.log(descricao)
            const novoRegistro = await this._service.criar(descricao);
            res.status(201).json({ novoRegistro })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'})
        }
    }

            editar = async (req: Request, res: Response) => {
        try {
            const {descricao, ativo} = req.body;
            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, descricao, ativo);
            res.status(200).json({ alterado })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido'})
        }
    }
}