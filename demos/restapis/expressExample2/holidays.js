const express = require("express");
const holidays = express();
const port = 4000;
holidays.use(express.json());

let holidaysArray = [ {
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



holidays.listen (port, () => {
    console.log(`Server running on ${port}`);
});

holidays.get ("/holidays", (req,res) => {
    res.status(200).json(holidaysArray);

});

holidays.get ("/holidays/:id", (req,res)=>{
    let matchingHoliday= holidaysArray.find(holiday=>holiday.id==req.params.id);
    if (matchingHoliday){
        res.status(200).json(matchingHoliday);
    }
    else {
        res.status(404).json({message: "This holiday does not exist"});
    }
    



});
holidays.post("/holidays",(req,res)=>{
    let newHoliday = req.body;
    holidays.push(newHoliday);
    res.status(201).json({message:"holiday has been added successfully"});
});

isis.delete("/holidays/:id", (req, res)=> {
    let matchingHoliday = null;
    let matchingHolidayIndex = holidaysArray.findIndex(holiday => {
        if (holiday.id == req.params.id) {
            matchingHoliday = holiday;
            return true;
        } else {
            return false;
        }
    });
    holidaysArray.splice(matchingHolidayIndex, 1);
    let msg = `PTO for ${matchingHoliday.destination} denied!!!`
    res.status(200).json({
        message: msg
    })
})
