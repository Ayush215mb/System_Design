//Definition: If S is a subtype of T, then objects of type T should be replaceable with objects of type S without breaking the program.

/**
 * In simple English: You should be able to use a child class anywhere the parent class is used, and it should work the same, without surprises, bugs, or broken behaviour.
 */
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number,
  ) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(public side: number) {}

  getArea(): number {
    return this.side * this.side;
  }
}
