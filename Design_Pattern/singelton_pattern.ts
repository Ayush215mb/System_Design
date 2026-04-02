/*
Singelton: 
   “Ensure a class has only one instance, and provide a global point of access to it.”

The problem it solves:
    Sometimes you need exactly one instance of a class throughout your entire application — no more, no less. Creating multiple instances in such cases can lead to inconsistent state, wasted resources, or conflicts.

Used at:
   -> Database connection pools — you don’t want 100 different database connections created randomly across your app

    -> Logging service — one central logger for the entire application

    -> Configuration manager — one object holding all your app settings  

disadvantage: 
    Singleton can make unit testing harder and can introduce hidden dependencies. Use it only when truly necessary.

*/

//No matter how many times you call DatabaseConnection.getInstance() across your entire application, you always get back the same single object.
class DatabaseConnection {
  private static instance: DatabaseConnection;

  private constructor() {
    // private constructor prevents direct instantiation
  }

  public static getInstance() {
    this.instance ??= new DatabaseConnection();
    return this.instance;
  }
}

const db: DatabaseConnection = DatabaseConnection;
const Dbinstance = DatabaseConnection.getInstance();

console.log(
  `type of db: ${typeof db} and db is ${db}\n \n Dbinstance type is ${typeof Dbinstance} and dbinstance is ${Dbinstance}`,
);
/**
  type of db: function and db is class DatabaseConnection {
    static instance;
    constructor() {
        // private constructor prevents direct instantiation
    }
    static getInstance() {
        this.instance ??= new DatabaseConnection();
        return this.instance;
    }
}
 
 Dbinstance type is object and dbinstance is [object Object]

`db` is just a **reference to the class itself** — classes in JavaScript are just functions under the hood. You're not instantiating anything, just pointing a variable at the class definition.

`Dbinstance` is the actual **Singleton instance** returned by `getInstance()`.


 */
class Singleton {
  private static instance: Singleton;

  // Private constructor prevents direct instantiation
  private constructor(public readonly value: string) {}

  static getInstance(value: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(value);
    }
    return Singleton.instance;
  }

  getValue() {
    return this.value;
  }
}

const s1 = Singleton.getInstance("First instance");
const s2 = Singleton.getInstance("Second instance");

console.log(s1.getValue());
console.log(s1 === s2); // true — same reference

//Logger
class Logger {
  //This stores the single object. Because it’s static, it belongs to the class, not objects.
  private static instance: Logger;

  //This prevents: new Logger()
  private constructor() {}

  // static access method
  static getInstance(): Logger {
    if (!Logger.instance) {
      // create first time
      Logger.instance = new Logger();
    }

    return Logger.instance; // return same instance everytime
  }

  log(message: string) {
    console.log(message);
  }
}
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log("User created");
logger2.log("Payment completed");

console.log(logger1 === logger2);

//Config Manager
class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, string>;

  private constructor() {
    this.config = {
      db: "postgres",
      port: "8080",
    };
  }

  static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }

    return ConfigManager.instance;
  }

  get(key: string) {
    return this.config[key];
  }
}

const config = ConfigManager.getInstance();

console.log(config.get("db"));
