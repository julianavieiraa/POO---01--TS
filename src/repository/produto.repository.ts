import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos;'
        );
        return rows;
    }

    async findById(id: number): Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE id = ?;';
        const values = [id];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<IProduto, 'id'>) {
        const sql = 'INSERT INTO produtos (nomeProduto, valor, idCategoria) VALUES (?, ?, ?);';
        const values = [dados.nomeProduto, dados.valor,dados.idCategoria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IProduto, 'id'>) {
        const sql = ' UPDATE produtos SET nomeProduto = ?, valor = ?, idCategoria = ? WHERE id = ?;'
        const values = [ dados.nomeProduto, dados.valor,dados.idCategoria,id ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number) {
        const sql = 'DELETE FROM produtos WHERE id = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async findByNome(nomeProduto: string) {
        const sql = 'SELECT * FROM produtos WHERE nomeProduto LIKE ?;'
        const values = [`%${nomeProduto}%`];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        return rows;
    }

    async findAllOrdenado(): Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos ORDER BY nomeProduto ASC;'
        const [rows] = await db.execute<IProduto[]>(sql);
        return rows;
    }
}