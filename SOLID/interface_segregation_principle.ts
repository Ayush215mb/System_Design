//Definition: Clients should not be forced to depend on interfaces they do not use.

/**
 In simple English: Don’t make classes implement methods they don’t need.
Break large interfaces into smaller, focused ones.
 */

interface PaymentGateway {
  pay(): void;
  refund(): void;
  schedule(): void;
}

class CashOnDelivery implements PaymentGateway {
  pay(): void {
    console.log("COD payment");
  }

  refund(): void {
    throw new Error("Refund not supported for COD");
  }

  schedule(): void {
    throw new Error("Scheduling not supported");
  }
}

/**
    StripePayment → supports all methods
    CashOnDelivery → supports only pay() but forced to implement refund() and schedule() which it can’t support
 */

// refactored code
interface Payable {
  pay(): void;
}

interface Refundable {
  refund(): void;
}

interface Schedulable {
  schedule(): void;
}

class CashOnDelivery2 implements Payable {
  pay(): void {
    console.log("COD payment");
  }
}

class StripePayment implements Payable, Refundable, Schedulable {
  // implements all
  pay(): void {
    console.log("COD payment");
  }
  refund(): void {
    throw new Error("Refund processed");
  }

  schedule(): void {
    throw new Error("Scheduling it to next week");
  }
}

//example 2

interface ReportGenerator {
  generatePDF(): void;
  generateExcel(): void;
  generateCSV(): void;
}

class UserActivityReport implements ReportGenerator {
  generatePDF(): void {
    throw new Error("Not supported");
  }

  generateExcel(): void {
    throw new Error("Not supported");
  }

  generateCSV(): void {
    console.log("Generating CSV");
  }
}

/**
 * Now you have:

BillingReport → supports PDF and Excel
UserActivityReport → supports only CSV
 */

interface PDFGeneratable {
  generatePDF(): void;
}

interface ExcelGeneratable {
  generateExcel(): void;
}

interface CSVGeneratable {
  generateCSV(): void;
}

class UserActivityReport2 implements CSVGeneratable {
  generateCSV(): void {
    console.log("Generating user CSV");
  }
}

class BillingReport
  implements PDFGeneratable, ExcelGeneratable, CSVGeneratable
{
  generatePDF(): void {
    console.log("Generating user PDF");
  }
  generateExcel(): void {
    console.log("Generating user Excel");
  }
  generateCSV(): void {
    console.log("Generating user CSV");
  }
}
