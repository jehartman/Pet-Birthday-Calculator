# Pet-Birthday-Calculator
Determines your pet's life-year in days and calculates your pet's human-relative age


This project creates a pet-birthday calculator that determines on what days your pet would have birthdays using pet years as the standard. In other words, if your pet's relative year is only 120 days, your pet would have 3 birthdays per year. This site would caclulate those birthdays. Since the avverage lifespan of a human is 79 years. this calendar will generate 79 birthdays over the projected life expantancy of your pet.

For this project I store the data in Firebase so multiple pets can be entered at once and the previous pet data can be retained. You can wipe out the data in the database by hitting the Get Rid button, which clears Firebase.

I used mostly moment.js for the time calculations, using both exact moments and durations. Due to the incongruity between the length of human days and pet days, there may be tiny variances in the birthdays generated. This could be solved but I'm leaving it as is for now.

The CSS uses Flex Box to lay out divs. It isn't perfect yet.

In the future it would make sense to allow the user to generate and download a csv or pdf list of all pet birthdays for the expected lifespan of the pet.
