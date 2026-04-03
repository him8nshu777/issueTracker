import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import AssignUser from "../components/AssignUser";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState("");

  const loadData = () => {
    API.get(`/issues/${id}`).then(res => setIssue(res.data));
    API.get(`/comments/${id}`).then(res => setComments(res.data));
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const changeStatus = (status) => {
    API.put(`/issues/${id}/status?status=${status}`).then(loadData);
  };

  const addComment = () => {
    API.post(`/comments/${id}`, {
      user_id: 1,
      message: msg
    }).then(() => {
      setMsg("");
      loadData();
    });
  };

  if (!issue) return <div>Loading...</div>;

  return (
    <div>
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>

      <p>Status: {issue.status}</p>
      <button onClick={() => changeStatus("OPEN")}>OPEN</button>
      <button onClick={() => changeStatus("IN_PROGRESS")}>IN_PROGRESS</button>
      <button onClick={() => changeStatus("DONE")}>DONE</button>

      <p>Priority: {issue.priority}</p>
      <AssignUser 
  issueId={id} 
  currentUser={issue.assigned_to} 
  refresh={loadData} 
/>
      <p>
  Assigned To: {issue.assigned_user ? issue.assigned_user.name : "Not Assigned"}
</p>
      <h3>Comments</h3>
      {comments.map(c => (
        <p key={c.id}>{c.message}</p>
      ))}

      <input
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Add comment"
      />
      <button onClick={addComment} style={{ cursor: "pointer" }}>Add</button>
    </div>
  );
}