## Student API
Base path: `BASE_URL/student`

Most endpoints require `Authorization: Bearer <STUDENT_TOKEN>`.

### Auth
- `POST /register` — Set password for an existing student by email. Body: `{ email, password0, password1 }`.
- `POST /login` — Obtain JWT. Body: `{ email, password }`.
- `POST /profilePicture` — Upload profile image. Form field: `profile_picture`.

### Self profile
- `GET /students/self` — Get current student profile.
- `PUT /students/self` — Update self. Body: `{ name, regNo, email, department, device }`.

### Courses
- `GET /courses/self` — List courses where the student has or had an exam.

### Exams
- `GET /exams/self` — Returns array of `[exam_room, exam]` pairs for all rooms involving the student.

### Exam rooms
- `PUT /exam_rooms/disconnections` — Update disconnections for the current student in a room.
  - Body: `{ roomName: string, disconnections: string[] }
  - Fails if `roomName` does not match an existing room.

### Example
```bash
# Get my exams
curl "$BASE_URL/student/exams/self" -H "Authorization: Bearer $STOKEN"

# Update my profile
curl -X PUT "$BASE_URL/student/students/self" \
  -H "Authorization: Bearer $STOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","regNo":"S1234","email":"jane@example.com","department":"CSE","device":"Laptop"}'
```