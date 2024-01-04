# Orchard Robotics Take Home Challenge

Orchard Robotics Take-Home coding challenge - building an end-to-end web application capable of predicting a harvest size estimate, given the growth rate of the fruit.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

## Dependencies

### Part 1 – Creating SQL database
---

In this part, you will need to create a SQL database hosted on the internet. We recommend Google Cloud Cloud SQL, which will let you easily spin up a MySQL or PostgreSQL database on the same platform as your Google Cloud server from Part 0.

After this database is created, the next step is to load in the data from the spreadsheet of fruits. This is fairly open ended, and there are a variety of ways you may choose to load in this data.

**You may structure the SQL database in any format you’d like. We just ask that you document and write a short explanation about how you structured the database and why.**


### Part 2 – Flask Backend
---

The next part of this challenge involves spinning up a Flask backend on your Google Cloud server / instance. We recommend using the smallest possible instance, as this application you are building will not be computationally intensive in any way.

As part of this Flask backend, you should be able to query data from the SQL database you set up previously. You should also be able to make your application viewable from the internet. This may require additional setup as part of Google Cloud’s networking settings for the instance.

When configuring your Google Cloud server, networking settings, SQL database, etc, please make sure to document (and screenshot) any relevant configurations you made, and include short descriptions of these decisions you made in your submission.


### Part 3 – React Frontend
---

The penultimate step of this challenge involves building out a frontend for the web application.

This frontend can be as rudimentary as you would like. It is more important that the frontend is functional, putting functionality over form.

This frontend should contain a couple components:
1. Two calendar / date selectors, one for “scan date” and another for “harvest date”
2. A textbox for inputting “fruit growth rate” as a float decimal value, in mm^3/day
3. A simple range selector for selecting a float decimal range in millimeters
  a. [0] o====o----- [20]
  b. The min/max bounds for this should be 20mm to 120mm
4. A “submit” button to calculate results
5. The ability to display a histogram graph, either as an interactive component or as a static image of a histogram graph


### Part 4 – Functionality
---

When a user visits the webpage, they should be able to select a “scan date” and a “harvest date” using the calendar date selector components. The “scan date” will indicate what day the scan of the fruit was performed, and the “harvest date” will indicate what date the harvest size should be predicted for.

The user will also enter a “fruit growth rate” in cubic millimeters per day. This indicates how much each fruit grows daily. For example, if the scan date is 10/01, and the harvest date is 10/11, there is a 10 day delta between scan and harvest. This means that all of the fruit grew for a total of 10 days, and at the rate specified.

If the user specifies a growth rate of, for example, 1000 mm^3/day, this means that each fruit’s volume is expected to increase by 1000 cubic millimeters each day. So for a 10 day delta, this means each fruit would have increased in volume by 10,000 cubic millimeters, to arrive at it’s final predicted volume at harvest time.

You can calculate the starting volume of each fruit, as the database contains data for the three ellipsoidal axes of each fruit. So the final volume of each fruit, on the harvest date, will be = to the original volume + how much the fruit has grown between those two dates.

However, the user also has the ability to specify which fruit they want to take part in this harvest size estimate prediction. This is what the range selector is for. The user will specify a minimum fruit diameter, and a maximum fruit diameter. For all of the fruit in the database, if the average fruit axis diameter (defined as the average of all three axes) is larger than the minimum user-specified value, and smaller than the maximum user-specified value, then that fruit should be a part of the harvest size estimate calculations. Otherwise, if the fruit is larger than the max value or smaller than the min value, the fruit should not be queried from the database, nor included in the harvest estimate calculation.

The Flask backend should run this calculation for all of the applicable fruit. Afterwards, the result will be some subset of all of the fruit in the database, each fruit with a predicted harvest volume, after “growing” the fruit based on the growth rate.

This data should be displayed on the frontend in a histogram format to the user on the front end. The frontend should also display the average fruit size of the fruit in the harvest size estimate.

***Bonus Points: It is always great to see advanced design elements, great UI/UX, and functionality extending this core challenge. We encourage you to be creative and take agency in developing extensions to this app you think might be fun/useful/aesthetically pleasing to users.***

## Authors

Contributors names and contact info

[Ross Todd](rssmtdd@gmail.com)
