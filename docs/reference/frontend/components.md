## Frontend Components (Proctor web app)

Routing is defined in `Proctor_webapp/src/App.js` and protected via `RouteProtection` which checks `localStorage` for `ptoken` (proctor) or `atoken` (admin).

### RouteProtection
File: `Proctor_webapp/src/components/RouteProtection.js`

- Props:
  - `path`: string
  - `component`: React component
  - `user`: "proctor" | "admin"
- Behavior: If the corresponding token exists in `localStorage`, renders the component. Otherwise redirects to `/`.

Usage example:
```jsx
<RouteProtection path="/dashboard" component={Dashboard} user="proctor" />
```

### High-level pages
- `Portal` — Landing page
- `Login` — Proctor login form; stores `ptoken` on success
- `Register` — Proctor registration
- `Adminlogin` — Admin login; stores `atoken` on success
- `Adminregister` — Admin registration
- `Home`, `Dashboard`, `Schedule`, `Courses`, `CoursePage`, `Settings`, `Help`, `Meeting` — Proctor workspace
- `Admin/Adminhome`, `Admin/Addexam`, `Admin/Database`, `Admin/AdminSettings`, `Admin/AdminHelp` — Admin workspace

All components are default-exports under `Proctor_webapp/src/components/**`. For detailed behavior, inspect each file and associated API usage.

### Example: Calling an API from the frontend
```js
// Login and store token
fetch(`${BASE_URL}/proctor/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
}).then(res => res.json()).then(({ token }) => {
  localStorage.setItem('ptoken', token);
});

// Later, call a protected route
fetch(`${BASE_URL}/proctor/courses/all`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('ptoken')}` }
}).then(r => r.json());
```
