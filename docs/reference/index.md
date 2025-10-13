## Reference

- **Auth & Tokens**: [api/auth.md](./api/auth.md)
- **Admin REST API**: [api/admin.md](./api/admin.md)
- **Proctor REST API**: [api/proctor.md](./api/proctor.md)
- **Student REST API**: [api/student.md](./api/student.md)
- **Data Models**: [api/models.md](./api/models.md)
- **Frontend Components**: [frontend/components.md](../reference/frontend/components.md)

### Quick start
1. Login to obtain a JWT token (admin, proctor, or student).
2. Call protected endpoints with `Authorization: Bearer <token>`.
3. For the frontend, store tokens in `localStorage` as `atoken` (admin) or `ptoken` (proctor) to pass `RouteProtection`.
