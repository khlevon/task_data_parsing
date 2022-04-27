import db from "./common/Database";
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATA_FILE_PATH,
} from "./config";
import { User, Gift, Order } from "./models";
import DataParser from "./common/DataParser";
import { insertGifts, insertOrders, insertUsers } from "./common/helpers";

async function main() {
  try {
    // Connect to database
    await db.connect(
      DATABASE_HOST,
      DATABASE_PORT,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_NAME
    );

    // drop all tables and create them again (for testing)
    await Order.deleteTable();
    await Gift.deleteTable();
    await User.deleteTable();

    await User.createTable();
    await Gift.createTable();
    await Order.createTable();

    // create DataParser instance and parse data from given .xlsx file
    const dataParser = new DataParser(DATA_FILE_PATH);
    const data = dataParser.getParsedData();

    // insert users, gifts and orders to database
    const usersData = await insertUsers(data);
    const giftsData = await insertGifts({ ...data, users: usersData });
    const ordersData = await insertOrders({
      ...data,
      users: usersData,
      gifts: giftsData,
    });

    // log information about inserted data
    console.log("==================");
    console.log(`inserted ${Object.keys(usersData).length} users`);
    console.log(`inserted ${Object.keys(giftsData).length} gifts`);
    console.log(`inserted ${ordersData.length} orders`);
  } catch (e) {
    throw e;
  } finally {
    await db.disconnect();
  }
}

main()
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
