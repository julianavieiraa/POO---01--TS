import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get("/categorias/ordenado", categoriaController.selecionarOrdenado);
categoriaRoutes.get('/categorias', categoriaController.selecionarTodos);
categoriaRoutes.get('/categorias/:id', categoriaController.selecionarPorId);
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias', categoriaController.editar);
categoriaRoutes.delete('/categorias/:id', categoriaController.deletar);
categoriaRoutes.get('/categoriasNome', categoriaController.buscarPorNome);

export default categoriaRoutes;