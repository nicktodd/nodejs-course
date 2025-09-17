// --- Discriminated Unions ---

interface FullTimeEmployee {
  kind: "full-time";
  name: string;
  annualSalary: number;
}

interface Contractor {
  kind: "contractor";
  name: string;
  dailyRate: number;
}

type Employee = FullTimeEmployee | Contractor;

function describeEmployee(e: Employee) {
  switch (e.kind) {
    case "full-time":
      console.log(`${e.name} is a full-time employee with salary $${e.annualSalary}`);
      break;
    case "contractor":
      console.log(`${e.name} is a contractor with daily rate $${e.dailyRate}`);
      break;
  }
}

describeEmployee({ kind: "full-time", name: "Alice", annualSalary: 90000 });
describeEmployee({ kind: "contractor", name: "Bob", dailyRate: 400 });
