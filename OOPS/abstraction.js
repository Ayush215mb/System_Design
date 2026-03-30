// abstract class
class Shape {
  constructor(name) {
    this.name = name;
  }

  calculateArea() {
    throw new Error("Method calculateArea must be implemented");
  }

  display() {
    console.log(` the area of the ${this.name} is ${this.calculateArea()}`);
  }
}

//derived class
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

//derived class
class Rectange extends Shape {
  constructor(width, height) {
    super("Reactangle");
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.height * this.width;
  }
}

const circle = new Circle(5);
circle.display();

const Rect = new Rectange(4, 6);
Rect.display();
