export interface CoreController {
  create(entity: unknown): Promise<unknown>;

  findAll(skip?: number, take?: number, where?: unknown, order?: unknown): Promise<unknown[]>;

  findOne(id: string): Promise<unknown>;

  update(id: string, entity: unknown): Promise<unknown>;

  remove(id: string): Promise<unknown>;
}
