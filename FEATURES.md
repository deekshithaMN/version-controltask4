# Features — Exam Duty Scheduler

## 1. Exam Setup
- Add exam dates and optional labels, such as a subject name.
- Prevent duplicate exam dates.
- Display configured exam dates.
- Remove dates that are no longer needed.

## 2. Exam Room Management
- Add rooms using a room number and capacity.
- Prevent duplicate room numbers.
- Display room information.
- Remove rooms from the setup.

## 3. Teacher Management
- Add a teacher's name, department, designation, email, and leave dates.
- Display a list of teachers.
- Show the total number of teachers and departments.
- Remove teachers from the list.
- Use teacher initials and colors to make the list easier to scan.

## 4. Scheduling Rules
- Configure the number of invigilators assigned to each room per exam day.
- Configure the number of relievers needed per day.
- Set a maximum duty limit per teacher.
- Exclude teachers on recorded leave dates from assignments.
- Avoid assigning the same teacher to multiple roles on the same day.

## 5. Automatic Exam Duty Scheduling
- Generate room-wise invigilator assignments for configured exam dates.
- Assign relievers separately from room invigilators.
- Use duty counts to try to distribute assignments fairly.
- Show a warning in the browser console when there are not enough eligible teachers for a requested assignment.

## 6. Duty Statistics
- Display the number of exam days, rooms, and teachers.
- Calculate the average invigilator duties per teacher.
- Show each teacher's invigilator-duty count.
- Use visual count bars to compare duty totals.

## 7. Data Persistence
- Store teachers, exam dates, rooms, and the generated schedule in the browser's Local Storage.
- Reload saved data when the application starts in the supported implementation.
- Data is stored in the current browser, not in a shared online database.

## 8. Print Support
- Provide a print option for the generated schedule.
- Apply print-specific styles to make the schedule more suitable for printing.

## 9. User Interface
- Provide Setup, Teachers, Schedule, and Statistics sections.
- Use cards, tables, status labels, and responsive layouts.
- Use a dark navy theme with blue, teal, and gold accents.

## 10. Current Scope and Limitations
- This is a front-end browser application; no server-side database or user authentication is included.
- Local Storage data is browser-specific and is not automatically shared with other users or computers.
- Scheduling fairness is an attempt based on duty counts; it does not guarantee a mathematically optimal assignment in every case.
- Review the modular JavaScript imports and run-time behavior before presenting the modular version as fully tested.
