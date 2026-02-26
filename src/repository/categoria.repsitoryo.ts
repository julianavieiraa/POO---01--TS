import { db } from "../database/connection.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2";

//Promise (Promessa) espero que tenha algum retorno desse tipo
export class CategoriaRepository {

    async findAll(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM Categorias'
        );
        return rows;
    }

    async create(dados: Omit<ICategoria, 'id'>) {
        const sql = 'INSERT INTO categorias (descricao, ativo) VALUES (?,?);';
        const values = [dados._descricao, dados._ativo];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async update(id: number, dados: Omit<ICategoria, 'id'>) {
        const sql = 'UPDATE categorias SET descricao =?, ativo=? WHERE id=? ;';
        const values = [dados._descricao, dados._ativo, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }
}