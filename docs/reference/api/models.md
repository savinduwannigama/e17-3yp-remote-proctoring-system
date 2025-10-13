## Data Models (MongoDB via Mongoose)

This section documents key collections and notable schema methods/statics.

### `admins`
Fields: `name`, `email(unique)`, `password(select:false)`, `isRegistered`, `role`, `profile_picture`
- Methods:
  - `matchPasswords(enteredPassword) -> Promise<boolean>`
  - `getSignedToken() -> string` (JWT with `JWT_SECRET_ADMIN`)

### `proctors`
Fields: `name`, `email(unique)`, `password(select:false)`, `isRegistered`, `department`, `recentExam`, `profile_picture`
- Methods:
  - `matchPasswords(enteredPassword) -> Promise<boolean)`
  - `getSignedToken() -> string` (currently uses student secret; consider `JWT_SECRET_PROCTOR`)

### `students`
Fields: `name`, `regNo(unique)`, `email(unique)`, `password(select:false)`, `isRegistered`, `department`, `device`, `profile_picture`
- Methods:
  - `matchPasswords(enteredPassword) -> Promise<boolean)`
  - `getSignedToken() -> string` (JWT with `JWT_SECRET_STUDENT`)

### `courses`
Fields: `shortname(unique)`, `fullname`, `department`, `coordinator`, `semester`, `lecturers: string[]`, `students: string[]`, `hasExam`
- Methods:
  - `removeStudents(toRemove: {regNo:string}[]) -> Promise<number>` — removes listed students by `regNo`.

### `exams`
Fields: `name(unique)`, `startTime`, `duration`, `course_coordinator`, `chief_invigilators: {exam_room,name,email}[]`, `invigilators: {exam_room,name,email}[]`, `total_students`, `students: {regNo,eligible,exam_room}[]`, `course`
- Statics:
  - `addExamRooms({distinct_exam_rooms,name,students,chief_invigilators,invigilators,recordedStudentVideosAt})` — creates corresponding `exam_rooms`.
  - `updateExamOnCourses({course,students,course_coordinator})` — updates course coordinator, students, and `hasExam`.

### `exam_rooms`
Fields: `room_name(unique)`, `exam`, `room_students: {regNo,participation,disconnections?,joined_at?}[]`, `chief_invigilator`, `invigilator`, `recordedStudentVideosAt`

### `devices`
Fields: `issueDate`

### `recordings`
Fields: `date`, `exam_room`, `student`

