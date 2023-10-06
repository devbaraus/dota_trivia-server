export interface CoreRepository<T> {
  create(entity: unknown): Promise<T>;

  findAll(skip?: number, take?: number, where?: unknown, order?: unknown): Promise<T[]>;

  findOne(id: number): Promise<T | null>;

  update(id: number, entity: unknown): Promise<T>;

  remove(id: number): Promise<null>;
}
