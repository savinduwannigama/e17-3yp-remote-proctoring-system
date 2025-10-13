## Auth & Tokens

### Base routes
- `BASE_URL/admin` — Admin APIs
- `BASE_URL/proctor` — Proctor APIs
- `BASE_URL/student` — Student APIs

Replace `BASE_URL` with your server origin (for local dev, often `http://localhost:PORT`).

### Authentication
All protected endpoints require a JWT sent via the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are returned by the respective `POST /login` endpoints:
- `POST /admin/login`
- `POST /proctor/login`
- `POST /student/login`

Typical successful login response:
```json
{ "status": "success", "token": "<JWT>" }
```

Typical error response:
```json
{ "status": "failure", "message": "<reason>", "error": "<optional>" }
```

### Example: Login and call a protected endpoint
```bash
# 1) Login as admin
ADMIN_TOKEN=$(curl -s -X POST "$BASE_URL/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}' | jq -r .token)

# 2) Call a protected route
curl -s "$BASE_URL/admin/admins/self" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Profile picture uploads
All roles can upload profile pictures via `multipart/form-data` using the field name `profile_picture`. Only `.jpg`, `.jpeg`, `.png` are accepted.

- `POST /admin/profilePicture` (protected)
- `POST /proctor/profilePicture` (protected)
- `POST /student/profilePicture` (protected)

Example:
```bash
curl -X POST "$BASE_URL/admin/profilePicture" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "profile_picture=@/path/to/avatar.jpg"
```

### Environment variables
The server expects the following (set via `.env` files under `server/api`):

- Database
  - `DATABASE_URL` (in `config.env`)

- JWT secrets and expirations
  - `JWT_SECRET_ADMIN`, `JWT_EXPIRE_ADMIN` (in `adminSecret.env`)
  - `JWT_SECRET_PROCTOR`, `JWT_EXPIRE_PROCTOR` (in `proctorSecret.env`)
  - `JWT_SECRET_STUDENT`, `JWT_EXPIRE_STUDENT` (in `studentSecret.env`)

Note: In the current code, proctor tokens are signed using the student secret. If unintended, update `proctors.js` and `protectProctor` to use the proctor secret consistently.
