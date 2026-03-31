//Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

// In simple English: Your business logic (high-level) shouldn’t directly depend on concrete classes (low-level). Instead, both should depend on interfaces (abstractions).

interface MessageSender {
  sendMessage: (reciever: string, message: string) => void;
}

class EmailSender implements MessageSender {
  sendMessage(reciever: string, message: string): void {
    console.log(`Sending email to ${reciever} : ${message}`);
  }
}

class SmsSender implements MessageSender {
  sendMessage(reciever: string, message: string): void {
    console.log(`Sending SMS to ${reciever} : ${message}`);
  }
}
//high level
class Notification2 {
  constructor(private readonly sender: MessageSender) {
    this.sender = sender;
  }

  notify(reciever: string, message: string) {
    this.sender.sendMessage(reciever, message);
  }
}

const emailnotif = new Notification2(new EmailSender());
const SmsSendernotif = new Notification2(new SmsSender());

emailnotif.notify("Ayush", "how r u?");
SmsSendernotif.notify("AYushhhhh", "hello ");
