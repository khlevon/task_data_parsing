import { IOrder } from "../../entities";
import { loadQueries } from "../../common/utils";
import db from "../../common/Database";

// load sql queries for order entity from files
const orderQueries = loadQueries(__dirname);

// Order model which provides CRUD operations for order entity based on raw sql queries
class Order implements IOrder {
  public readonly id: number;
  public readonly date: Date;
  public readonly description?: string | undefined;
  public readonly userId?: number | undefined;
  public readonly giftId?: number | undefined;

  constructor(
    id: number,
    date: Date,
    description?: string,
    userId?: number,
    giftId?: number
  ) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.userId = userId;
    this.giftId = giftId;
  }

  public static async createTable() {
    await db.query(orderQueries.createOrderTable);
  }

  public static async deleteTable() {
    await db.query(orderQueries.deleteOrderTable);
  }

  public static async findById(id: number): Promise<Order | undefined> {
    const [res] = await db.query(orderQueries.findOrderById, [id]);
    const rowData = res[0];

    if (!rowData) return undefined;

    return new Order(rowData.id, rowData.name, rowData.number);
  }

  public static async create(
    date: Date,
    description?: string,
    userId?: number,
    giftId?: number
  ): Promise<Order> {
    const [res] = await db.query(orderQueries.createOrder, [
      date,
      description,
      userId,
      giftId,
    ]);

    return new Order(res.insertId, date, description, userId, giftId);
  }
}

export default Order;
