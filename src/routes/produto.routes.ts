import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController.criar);
produtoRoutes.get('/produtos',produtoController.selecionarTodos);
produtoRoutes.get('/produtos/:id',produtoController.selecionarPorId);
produtoRoutes.patch('/produtos', produtoController.editar);


export default produtoRoutes;