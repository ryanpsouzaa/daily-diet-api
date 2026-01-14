import { knex } from '../database/database';

export class BaseModel<T extends { id: string | number }> {
  constructor(protected tableName: string) {}

  protected get query() {
    return knex<T>(this.tableName);
  }

  async findAll(): Promise<T[]> {
    return (await this.query.select('*')) as T[];
  }

  async findById(id: string): Promise<T | undefined> {
    return (await this.query.where({ id } as any).first()) as T | undefined;
  }

  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<T> {
    const [record] = await this.query.insert(data as any).returning('*');
    return record as T;
  }

  async update(id: string, data: Partial<T>): Promise<number> {
    return await this.query.where({ id } as any).update(data as any);
  }

  async delete(id: string): Promise<number> {
    return await this.query.where({ id } as any).delete();
  }
}
