import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import CreateIssue from "../components/CreateIssue";

export default function Issues() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  const fetchIssues = useCallback(() => {
  API.get(`/issues/project/${id}`).then(res => setIssues(res.data));
}, [id]);

useEffect(() => {
  fetchIssues();
}, [fetchIssues]);
  return (
    <div>
      <h2>Issues</h2>

      <CreateIssue projectId={id} refresh={fetchIssues} />

      {issues.map(i => (
        <div key={i.id} onClick={() => navigate(`/issues/${i.id}`)} style={{ cursor: "pointer" }}>
          <h4>{i.title}</h4>
          <p>{i.status} | {i.priority}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}