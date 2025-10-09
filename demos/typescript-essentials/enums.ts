// Basic enum example in TypeScript
enum Direction {
	Up,
	Down,
	Left,
	Right
}

let move: Direction = Direction.Up;
console.log('Move direction:', move); // Output: Move direction: 0

// Enum with explicit number values
enum StatusCode {
	Success = 200,
	NotFound = 404,
	ServerError = 500
}

let status: StatusCode = StatusCode.NotFound;
console.log('Status code:', status); // Output: Status code: 404

// Enum with string values
enum LogLevel {
	Info = "INFO",
	Warn = "WARN",
	Error = "ERROR"
}

let level: LogLevel = LogLevel.Warn;
console.log('Log level:', level); // Output: Log level: WARN
