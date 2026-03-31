class Animal {
  constructor(public name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

// inheritance
class Dog extends Animal {
  // overwriting method is implementation of polymorphism
  speak() {
    console.log(`${this.name} barks!`);
  }
}

const genericAnimal: Animal = new Animal("Generic animal");

const dog: Dog = new Dog("choco");

genericAnimal.speak();
dog.speak();
