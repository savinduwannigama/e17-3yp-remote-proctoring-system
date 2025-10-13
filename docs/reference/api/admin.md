## Admin API
Base path: `BASE_URL/admin`

Requires `Authorization: Bearer <ADMIN_TOKEN>` unless noted.

### Auth
- `POST /register` — Set password for an existing admin by email. Body: `{ email, password0, password1 }`.
- `POST /login` — Obtain JWT. Body: `{ email, password }`.
- `POST /profilePicture` — Upload profile image. Form field: `profile_picture`.

Example login:
```bash
curl -X POST "$BASE_URL/admin/login" -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'
```

### Admins
- `POST /admins/single` — Create admin. Body: `{ name, email, role }`.
- `GET /admins/all` — List admins.
- `GET /admins/self` — Get current admin.
- `PUT /admins/self` — Update current admin. Body: `{ name, email, role }`.
- `PUT /admins/single/:email` — Update another admin (requires `role=super-admin`). Body: `{ name, email, role }`.
- `DELETE /admins/single/:email` — Delete admin (requires `role=super-admin`).

```bash
curl -X POST "$BASE_URL/admin/admins/single" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","role":"admin"}'
```

### Students
- `POST /students/single` — Create student. Body: `{ name, regNo, email, department, device }`.
- `POST /students/multiple` — Bulk create from mastersheet.
  - Body shape:
    ```json
    {
      "uploaded_file": "students",
      "details": [
        [/* header row 0 */],
        [/* header row 1 */],
        [1, "S1234", "Jane Doe", "jane@example.com", "CSE"],
        [2, "S5678", "John Roe", "john@example.com", "EEE"]
      ]
    }
    ```
- `GET /students/all` — List students.
- `PUT /students/single/:email` — Update by email. Body: `{ name, regNo, email, department, device }`.
- `DELETE /students/single/:email` — Delete by email.
- `DELETE /students/all` — Delete all students.

### Proctors
- `POST /proctors/single` — Create proctor. Body: `{ name, email, department }`.
- `POST /proctors/multiple` — Bulk create from mastersheet.
  - Body shape:
    ```json
    {
      "uploaded_file": "proctors",
      "details": [
        [/* header row 0 */],
        [/* header row 1 */],
        [1, "Alice Smith", "alice@uni.edu", "CSE"],
        [2, "Bob Lee", "bob@uni.edu", "EEE"]
      ]
    }
    ```
- `GET /proctors/all` — List proctors.
- `PUT /proctors/single/:email` — Update by email. Body: `{ name, email }`.
- `DELETE /proctors/single/:email` — Delete by email.
- `DELETE /proctors/all` — Delete all proctors.

### Courses
- `POST /courses/single` — Create course. Body: `{ shortname, fullname, department, coordinator?, semester }`.
- `POST /courses/mastersheet` — Bulk create courses.
  - Body shape:
    ```json
    {
      "uploaded_file": "courses",
      "details": [
        [/* header row 0 */],
        ["CS101", "Intro to CS", "CSE", 1],
        ["EE210", "Circuits", "EEE", 2]
      ]
    }
    ```
- `GET /courses/all` — List courses.
- `PUT /courses/single/:shortname` — Update by shortname. Body: `{ shortname, fullname, department, coordinator, lecturers, students }`.
- `DELETE /courses/single/:shortname` — Delete by shortname (fails if `hasExam=true`).
- `DELETE /courses/all` — Delete all courses (only if no exams exist).

### Devices
- `POST /devices/single` — Create device. Body: `{ issueDate? }`.
- `GET /devices/all` — List devices.

### Exams
- `POST /exams/mastersheet` — Create a scheduled exam and its rooms.
  - Body shape (indices are significant):
    - `uploaded_file` must be `"mastersheet"`
    - `details` is a 2D array where:
      - `[0][3]` → `name` (full exam name)
      - `[1][3]` → `course` (shortname)
      - `[2][3]` and `[3][3]` → date/time components for `startTime`
      - `[4][3]` → `duration`
      - `[5][4]` → `course_coordinator`
      - rows `>= 15` with length `12` represent students: indices `[1]=regNo`, `[2]=eligible ("TRUE"|"FALSE")`, `[3]=exam_room`, `[4]=upload link`, `[5]=chief CI`, `[6]=invigilator`
- `GET /exams/all` — List exams.
- `DELETE /exams/single/:name` — Delete exam and cascade: exam rooms removed; course updated (may unset `hasExam` and remove students).

### Exam rooms
- `GET /examrooms/all` — List exam rooms.

### Error handling
Most endpoints return `{ status: 'success', ... }` on success and `{ status: 'failure', message, error? }` on failure with appropriate HTTP codes.
