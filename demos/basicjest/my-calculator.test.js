const calculator = require("./my-calculator");
beforeEach( () => {
    console.log("runs before each calculator test");
});

it("should return 4 if we add 2 and 2", ()=>{       
    expect(calculator.add(2,2)).toBe(4);
});

it("should return 6 if we add 3 and 3", ()=>{       
    expect(calculator.add(3,3)).toBe(6);
});
