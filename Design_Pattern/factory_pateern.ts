// “Define an interface for creating an object, but let subclasses decide which class to instantiate.”

/*
the problem it solves:
    Sometimes you don’t know in advance exactly which type of object you need to create — it depends on some condition at runtime. The Factory Pattern centralizes object creation so the rest of your code doesn’t need to worry about how objects are created, only what they do.

Where it’s Used:

    Payment gateways — creating the right payment handler (UPI, Credit Card, Net Banking) based on user selection

    Notification systems — creating the right notifier (Email, SMS, Push) based on user preference

    Database drivers — creating the right database connection (MySQL, PostgreSQL, MongoDB) based on config
*/

interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log("Sending EMAIL:", message);
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log("Sending SMS:", message);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log("Sending PUSH:", message);
  }
}

class NotificationFactory {
  static create(type: string): Notification {
    switch (type) {
      case "email":
        return new EmailNotification();

      case "sms":
        return new SMSNotification();

      case "push":
        return new PushNotification();

      default:
        throw new Error("Unknown notification type");
    }
  }
}

function sendNotification(type: string, message: string) {
  const notification = NotificationFactory.create(type);
  notification.send(message);
}

sendNotification("email", "hello");
