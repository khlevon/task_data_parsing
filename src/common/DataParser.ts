import { readFile, WorkBook, utils } from "xlsx";
import UUID from "uuid-int";
import { IGift, IOrder, IUser } from "../entities";
import { parseDate } from "../common/utils";

// temporary id generator
const ugen = UUID(0, 0);

export type TStructuredData = {
  users: { [id: number]: IUser };
  gifts: { [id: string]: IGift };
  orders: IOrder[];
};

// TODO: for large files we can implement mechanism to read and parse it by chunks and insert complete data to database

class DataParser {
  private workbook: WorkBook;

  constructor(filePath: string) {
    // read file using xlsx module
    const workbook = readFile(filePath);

    this.workbook = workbook;
  }

  public getSheetNames(): string[] {
    return this.workbook.SheetNames;
  }

  public getSheet(sheet_name: string): any {
    return this.workbook.Sheets[sheet_name];
  }

  public parseSheet(sheet_name: string): TStructuredData {
    const sheet = utils.sheet_to_json<object>(this.getSheet(sheet_name));
    // map of autogenerated ids to user object to make easy to find user by id
    const users: { [id: string]: IUser } = {};
    // map of autogenerated ids to user object to make easy to find gift by id
    const gifts: { [id: string]: IGift } = {};
    const orders: IOrder[] = [];

    // loop through each row in the sheet and parse it, we assume that structure of each sheet and each row is the same and immutable
    for (let i = 0; i < sheet.length; i++) {
      const row = sheet[i];
      // skip header row
      if (row["Gifts"] === "id") continue;

      // parse date string to date object
      const orderDate: Date = parseDate(row["__EMPTY"]);

      const userToMetadata = (row["__EMPTY_1"] || "").split(" ");
      const giftName: string = row["__EMPTY_2"];
      const userFromMetadata = (row["__EMPTY_3"] || "").split(" ");
      const orderDescription: string | undefined = row["__EMPTY_4"];

      const userTo: IUser | undefined = userToMetadata.length
        ? {
            id: parseInt(userToMetadata[0]),
            name: userToMetadata[1],
            number: userToMetadata[0],
          }
        : undefined;

      const userFrom: IUser | undefined = userToMetadata.length
        ? {
            id: parseInt(userFromMetadata[0]),
            name: userFromMetadata[1],
            number: userFromMetadata[0],
          }
        : undefined;

      const gift: IGift = {
        id: ugen.uuid(),
        name: giftName,
        fromId: userFrom?.id,
      };

      const order: IOrder = {
        id: ugen.uuid(),
        date: orderDate,
        description: orderDescription,
        userId: userTo?.id,
        giftId: gift?.id,
      };

      if (userTo) users[userTo.id] = userTo;
      if (userFrom) users[userFrom.id] = userFrom;

      gifts[gift.id] = gift;
      orders.push(order);
    }

    return {
      users,
      gifts,
      orders,
    };
  }

  public getParsedData(): TStructuredData {
    const sheet_names = this.getSheetNames();
    const result: TStructuredData = {
      users: {},
      gifts: {},
      orders: [],
    };

    // document can contain multiple sheets so we need to loop through them and parse each one
    for (let i = 0; i < sheet_names.length; i++) {
      const sheet_name = sheet_names[i];
      const data = this.parseSheet(sheet_name);
      result.users = { ...result.users, ...data.users };
      result.gifts = { ...result.gifts, ...data.gifts };
      result.orders = [...result.orders, ...data.orders];
    }

    return result;
  }
}

export default DataParser;