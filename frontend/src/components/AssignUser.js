import { useEffect, useState } from "react";
import API from "../api/api";

export default function AssignUser({ issueId, currentUser, refresh }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users/").then(res => setUsers(res.data));
  }, []);

  const assign = (userId) => {
  API.put(`/issues/${issueId}/assign?user_id=${userId}`)
    .then(() => {
      refresh();   // ✅ reload issue data
    });
};

  return (
    <div>
      <h4>Assign User</h4>

      <select value={currentUser || ""} onChange={e => assign(e.target.value)} style={{ cursor: "pointer" }}>
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
}