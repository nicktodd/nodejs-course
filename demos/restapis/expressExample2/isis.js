const express = require("express");
const isis = express();
const port = 4000;
isis.use(express.json());

let holidays = [ {
    id: 1,
    destination: "mauritus",
    startDate: "2025/11/01"
},
{
   id: 2,
    destination: "Brazil",
    startDate: "2026/03/01" 
}

];



isis.listen (port, () => {
    console.log(`Server running on ${port}`);
});

isis.get ("/holidays", (req,res) => {
    res.status(200).json(holidays);

});

isis.get ("/holidays/:id", (req,res)=>{
    let matchingHoliday= holidays.find(holiday=>holiday.id==req.params.id);
    if (matchingHoliday){
        res.status(200).json(matchingHoliday);
    }
    else {
        res.status(404).json({message: "This holiday does not exist"});
    }
    



});
isis.post("/holidays",(req,res)=>{
    let newHoliday = req.body;
    holidays.push(newHoliday);
    res.status(201).json({message:"holiday has been added successfully"});
});

isis.delete("/holidays/:id", (req, res)=> {
    let matchingHoliday = null;
    let matchingHolidayIndex = holidays.findIndex(holiday => {
        if (holiday.id == req.params.id) {
            matchingHoliday = holiday;
            return true;
        } else {
            return false;
        }
    });
    holidays.splice(matchingHolidayIndex, 1);
    let msg = `PTO for ${matchingHoliday.destination} denied!!!`
    res.status(200).json({
        message: msg
    })
})
