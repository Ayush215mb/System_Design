// Definition: Software entities (classes, modules, functions) should be open for extension, but closed for modification.

/*
What does it actually mean?
    Open for extension → you can add new functionality

    Closed for modification → you should not change existing tested code to do it

Goal: Add new features without breaking existing logic

*/
class PaymentProcessor1 {
  process(paymentMethod: string): void {
    if (paymentMethod === "credit_card") {
      console.log("Processing credit card payment...");
    } else if (paymentMethod === "paypal") {
      console.log("Processing PayPal payment...");
    } else if (paymentMethod === "upi") {
      console.log("Processing UPI payment...");
    } else {
      throw new Error("Unsupported payment method");
    }
  }
}

/*
Above code violates OCP because:
Every time a new method (like Stripe, Crypto Pay) is added, you have to:

    Modify this class
    Risk of breaking existing code
    Add more if-else
    It is neither scalable nor maintainable.
 

 */

interface PaymentStrategy {
  pay(): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(): void {
    console.log("Credit card payment processed");
  }
  complete() {
    console.log("payment is completed");
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(): void {
    console.log("PayPal payment processed");
  }
}

class UPIPayment implements PaymentStrategy {
  pay(): void {
    console.log("UPI payment processed");
  }
}

class PaymentProcessor2 {
  constructor(private readonly strategy: PaymentStrategy) {}

  process(): void {
    this.strategy.pay();
  }
}

const processor = new PaymentProcessor2(new UPIPayment());
processor.process();

//example: 1

class DiscountEngine {
  calculateDiscount(type: string, amount: number): number {
    if (type === "student") {
      return amount * 0.1;
    } else if (type === "seasonal") {
      return amount * 0.2;
    }
    return 0;
  }
}

//Every time a new discount is added, the class must be changed → violates OCP

// Refactored code:
interface DiscountStrategy {
  getDiscount(amount: number): number;
}

class StudentDiscount implements DiscountStrategy {
  getDiscount(amount: number): number {
    return amount * 0.1;
  }
}

class SeasonalDiscount implements DiscountStrategy {
  getDiscount(amount: number): number {
    return amount * 0.2;
  }
}

class NoDiscount implements DiscountStrategy {
  getDiscount(amount: number): number {
    return 0;
  }
}

class DiscountEngine2 {
  constructor(private readonly strategy: DiscountStrategy) {}

  applyDiscount(amount: number): number {
    return amount - this.strategy.getDiscount(amount);
  }
}

const engine = new DiscountEngine2(new StudentDiscount());
console.log(engine.applyDiscount(500)); // 450

//Example 2: Build a notification system which supports different types of notifications, like email, SMS, sendPush (on app), etc.

interface Notifier {
  notify(userId: string, message: string): void;
}

class EmailNotifier implements Notifier {
  notify(userId: string, message: string): void {
    console.log(`Email to ${userId}: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  notify(userId: string, message: string): void {
    console.log(`SMS to ${userId}: ${message}`);
  }
}

class PushNotifier implements Notifier {
  notify(userId: string, message: string): void {
    console.log(`Push notification: ${message}`);
  }
}

class NotificationService {
  constructor(private notifiers: Notifier[]) {}

  sendNotification(userId: string, message: string) {
    for (const notifier of this.notifiers) {
      notifier.notify(userId, message);
    }
  }
}

/**
  At last, remember these:

   -> Don’t use if-else or switch to decide behaviour. Instead, use interfaces/abstractions.
    
   -> Don’t edit existing classes to add cases. Instead, extend using new classes
 */
