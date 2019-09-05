Feature: As a patient I want to calculate my BMI online so I can track my weight

    @BMI_Calculator
    Scenario: Calculate BMI from height in cm and weight in kg
        When "173" and "100" are entered into the calculator
        Then the BMI should be "33.4"


