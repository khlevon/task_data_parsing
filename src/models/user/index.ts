import { IUser } from "../../entities";
import { loadQueries } from "../../common/utils";
import db from "../../common/Database";

// load sql queries for user entity from files
const userQueries = loadQueries(__dirname);

// TODO: the functionality of this model can be extended and improved and will be good to have a BaseModel class with common functionality

// User model which provides CRUD operations for user entity based on raw sql queries
class User implements IUser {
  public readonly id: number;
  public readonly name: string;
  public readonly number: string;

  constructor(id: number, name: string, number: string) {
    this.id = id;
    this.name = name;
    this.number = number;
  }

  public static async createTable() {
    await db.query(userQueries.createUserTable);
  }

  public static async deleteTable() {
    await db.query(userQueries.deleteUserTable);
  }

  public static async findById(id: number): Promise<User | undefined> {
    const [res] = await db.query(userQueries.findUserById, [id]);
    const rowData = res[0];

    if (!rowData) return undefined;

    return new User(rowData.id, rowData.name, rowData.number);
  }

  public static async findByNumber(number: string): Promise<User | undefined> {
    const [res] = await db.query(userQueries.findUserByNumber, [number]);
    const rowData = res[0];

    if (!rowData) return undefined;

    return new User(rowData.id, rowData.name, rowData.number);
  }

  public static async create(name: string, number: string): Promise<User> {
    const [res] = await db.query(userQueries.createUser, [name, number]);

    return new User(res.insertId, name, number);
  }
}

export default User;
