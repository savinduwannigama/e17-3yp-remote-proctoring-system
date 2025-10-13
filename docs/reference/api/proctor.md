## Proctor API
Base path: `BASE_URL/proctor`

Most endpoints require `Authorization: Bearer <PROCTOR_TOKEN>`.

### Auth
- `POST /register` — Set password for an existing proctor by email. Body: `{ email, password0, password1 }`.
- `POST /login` — Obtain JWT. Body: `{ email, password }`.
- `POST /profilePicture` — Upload profile image. Form field: `profile_picture`.

### Self profile
- `GET /proctors/self` — Get current proctor profile.
- `PUT /proctors/self` — Update self. Body: `{ name, email }`.
- `POST /proctors/self/recentExam` — Set recent exam. Body: `{ recentExam }`.

### Courses
- `GET /courses/all` — List all courses.
- `GET /courses/chief_invigilating/self` — List course shortnames where proctor is chief invigilator.
- `GET /courses/invigilating/self` — List course shortnames where proctor is invigilator.

### Exams
- `GET /exams/self` — Returns array of objects: `{ exam_name, exam_startTime, exam_duration, course_shortname, exam_room_name, duty }` for all rooms involving the proctor.
- `GET /exams/chief_invigilator/self` — Array of `[exam_room, exam]` pairs where proctor is chief invigilator.
- `GET /exams/invigilator/self` — Array of `[exam_room, exam]` pairs where proctor is invigilator.

### Example
```bash
# Get all courses
curl "$BASE_URL/proctor/courses/all" -H "Authorization: Bearer $PTOKEN"

# Update profile
curl -X PUT "$BASE_URL/proctor/proctors/self" \
  -H "Authorization: Bearer $PTOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Dr. Smith","email":"smith@uni.edu"}'
```