import { IGift } from "../../entities";
import { loadQueries } from "../../common/utils";
import db from "../../common/Database";

// load sql queries for gift entity from files
const giftQueries = loadQueries(__dirname);

// Gift model which provides CRUD operations for gift entity based on raw sql queries
class Gift implements IGift {
  public readonly id: number;
  public readonly name: string;
  public readonly fromId?: number;

  constructor(id: number, name: string, fromId?: number) {
    this.id = id;
    this.name = name;
    this.fromId = fromId;
  }

  public static async createTable() {
    await db.query(giftQueries.createGiftTable);
  }

  public static async deleteTable() {
    await db.query(giftQueries.deleteGiftTable);
  }

  public static async findById(id: number): Promise<Gift | undefined> {
    const [res] = await db.query(giftQueries.findGiftById, [id]);
    const rowData = res[0];

    if (!rowData) return undefined;

    return new Gift(rowData.id, rowData.name, rowData.number);
  }

  public static async create(name: string, fromId?: number): Promise<Gift> {
    const [res] = await db.query(giftQueries.createGift, [name, fromId]);

    return new Gift(res.insertId, name, fromId);
  }
}

export default Gift;
