// abstract class
class Shape {
  constructor(public name: string) {
    this.name = name;
  }

  calculateArea(): number | Error {
    throw new Error("Method calculateArea must be implemented");
  }

  display(): void {
    console.log(` the area of the ${this.name} is ${this.calculateArea()}`);
  }
}

//derived class
class Circle extends Shape {
  constructor(public radius: number) {
    super("Circle");
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

//derived class
class Rectange extends Shape {
  constructor(
    public width: number,
    public height: number,
  ) {
    super("Reactangle");
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.height * this.width;
  }
}

const circle: Circle = new Circle(5);
circle.display();

const Rect: Rectange = new Rectange(4, 6);
Rect.display();
