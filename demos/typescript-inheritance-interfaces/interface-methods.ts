// --- Defining an Interface to Specify Methods ---
console.log("File loaded");
interface Loggable {
  log(): void;
}

// Object literal implementing interface
const logger: Loggable = {
  log() {
    console.log("Logging from object literal");
  }
};
logger.log();

// Class implementing interface
class ConsoleLogger implements Loggable {
  log() {
    console.log("Logging from class");
  }
}
const cl = new ConsoleLogger();
cl.log();

// Multiple interfaces
interface Serializable {
  serialize(): string;
}

class DataLogger implements Loggable, Serializable {
  log() {
    console.log("DataLogger log");
  }
  serialize() {
    return "DataLogger serialized";
  }
}
const dl = new DataLogger();
dl.log();
console.log(dl.serialize());

// Using interface in function signature
function runLog(l: Loggable) {
  l.log();
}
runLog(cl);
