// A class should have only one reason to change.

class SeatChecker {
  isSeatAvailable(movieId: number, seatNumber: string): boolean {
    // Check in DB if seat is free
    return true;
  }
}

class PriceCalculator {
  getPrice(movieId: number, seatNumber: string): number {
    // Logic based on seat type, timing, etc.
    return 300;
  }
}

class PaymentService {
  pay(userId: number, amount: number): boolean {
    // Payment gateway integration
    console.log(`Processing payment of ₹${amount} for user ${userId}`);
    return true;
  }
}

class Notifier {
  sendConfirmation(userId: number, movieId: number): void {
    // Send email/SMS
    console.log(`Confirmation sent to user ${userId} for movie ${movieId}`);
  }
}

class TicketBooking {
  constructor(
    private readonly seatChecker: SeatChecker,
    private readonly priceCalculator: PriceCalculator,
    private readonly paymentService: PaymentService,
    private readonly notifier: Notifier,
  ) {}

  bookTicket(userId: number, movieId: number, seatNumber: string) {
    if (this.seatChecker.isSeatAvailable(movieId, seatNumber)) {
      const price = this.priceCalculator.getPrice(movieId, seatNumber);
      const paid = this.paymentService.pay(userId, price);
      if (paid) {
        this.notifier.sendConfirmation(userId, movieId);
        console.log("Booking successful!");
      } else {
        console.log("Payment failed!");
      }
    } else {
      console.log("Seat not available!");
    }
  }
}

//example 1:

class Order {
  private items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(item: string) {
    this.items = this.items.filter((i) => i !== item);
  }

  getTotalPrice(): number {
    return this.items.length * 100;
  }
}

/*
Does the above code violate SRP?
Ans) No, because all methods are related to one thing: managing the contents of an Order.
One reason to change: If business rules about orders (like pricing, item handling) change.
*/

interface UserProfile {
  name: string;
  age: number;
}

//example 2
class UserProfileManager {
  getProfile(userId: number): UserProfile {
    // Fetch user from DB
    return { name: "Ayush", age: 20 };
  }

  updateProfile(userId: number, data: Partial<UserProfile>): void {
    // Save new user profile
  }

  uploadProfilePicture(userId: number, image: File): void {
    // Save image to S3
  }

  deleteAccount(userId: number): void {
    // Delete user from DB and clear sessions
  }
}

/*

All methods seem “user-related” — so devs assume it’s a single responsibility. But it is not following SRP.

1. getProfile, updateProfile are similar. They only change when the user's data changes.
uploadProfilePicture changes when infra changes.

2. Suppose you are storing an image in AWS S3, if tomorrow you start storing an image in Cloudflare R2, then uploadProfilePicture changes.

3. deleteAccount: It can happen due to many reason like policy violation, inactivity etc. Means this method changes when your business policy changes.

Since the above class has 3 reasons to change, it has to be split into 3 separate classes, where each class will only have one reason to change.
 */

class UserProfileService {
  get(userId: number): UserProfile {
    /* ... */ return { name: "Ayush", age: 20 };
  }
  update(userId: number, data: Partial<UserProfile>) {
    /* ... */
  }
}

class UserPictureService {
  upload(userId: number, file: File) {
    /* upload to S3 */
  }
}

class UserAccountManager {
  delete(userId: number) {
    /* delete from DB, sessions */
  }
}
