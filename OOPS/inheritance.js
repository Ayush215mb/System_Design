class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
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

const genericAnimal = new Animal("Generic animal");

const dog = new Dog("choco");

genericAnimal.speak();
dog.speak();
