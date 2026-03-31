class Car {
  public brand: string;
  public model: string;
  private speed: number = 0;

  constructor(brand: string, model: string) {
    this.brand = brand; // public
    this.model = model; //public
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(value: number): void {
    this.speed = value > 0 ? value : 0; // if value > 0 then speed = value if not then 0
  }

  public accelerate(): void {
    this.setSpeed(this.getSpeed() + 10);
    console.log(
      `${this.brand} ${this.model} is now going at ${this.getSpeed()} km/hr.`,
    );
  }

  brake(): void {
    this.setSpeed(this.getSpeed() - 10);
    console.log(
      `${this.brand} ${this.model} slowed down to ${this.getSpeed()} km/hr.`,
    );
  }
}

const myCar: Car = new Car("Tesla", "model 3");
myCar.accelerate();
myCar.brake();
