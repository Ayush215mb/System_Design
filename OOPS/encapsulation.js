class Car {
  constructor(brand, model) {
    this.brand = brand; // public
    this.model = model; //public
    let speed = 0; //private

    // getspeed and setspeed are public methods (accessible from outside). They act as controlled gateways to the private speed variable.
    this.getspeed = () => speed;
    this.setspeed = (value) => (speed = value > 0 ? value : 0); // if value > 0 then speed = value if not then 0
  }

  accelerate() {
    this.setspeed(this.getspeed() + 10);
    console.log(
      `${this.brand} ${this.model} is now going at ${this.getspeed()} km/hr.`,
    );
  }

  brake() {
    this.setspeed(this.getspeed() - 10);
    console.log(
      `${this.brand} ${this.model} slowed down to ${this.getspeed()} km/hr.`,
    );
  }
}

const myCar = new Car("Tesla", "model 3");
myCar.accelerate();
myCar.brake();
