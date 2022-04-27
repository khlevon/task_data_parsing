import mysql from "mysql";

/**
 * Database class which wraps `mysql` module and provides a simple interface to work with database using promises
 */
export class Database {
  private pool: mysql.Pool | undefined;

  public connect(
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
  ): Promise<Database> {
    return new Promise((resolve, reject) => {
      if (this.pool) {
        return reject(new Error("Already connected"));
      }

      this.pool = mysql.createPool({
        connectionLimit: 10,
        host,
        port,
        user,
        password,
        database,
        stringifyObjects: true,
        timezone: "UTC+0cls",
      });

      this.pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.release();

        resolve(this);
      });
    });
  }

  public async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.pool) {
        this.pool.end((err) => {
          if (err) return reject(err);
          delete this.pool;
          resolve();
        });
      }
    });
  }

  public getConnection(): Promise<mysql.Connection> {
    return new Promise((resolve, reject) => {
      if (!this.pool) return reject(new Error("Not connected"));

      this.pool.getConnection((err, connection) => {
        if (err) return reject(err);
        resolve(connection);
      });
    });
  }

  public query(
    sql: string,
    args?: any[]
  ): Promise<[any, mysql.FieldInfo[] | undefined]> {
    return new Promise((resolve, reject) => {
      if (!this.pool) return reject(new Error("Not connected"));

      this.pool.query(sql, args, (err, results, fields) => {
        if (err) return reject(err);
        resolve([results, fields]);
      });
    });
  }

  public async beginTransaction(): Promise<void> {
    const conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async commit(): Promise<void> {
    const conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.commit((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  public async rollback(): Promise<void> {
    const conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.rollback((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

export default new Database();
