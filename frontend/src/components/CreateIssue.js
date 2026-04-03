import { useState } from "react";
import API from "../api/api";

export default function CreateIssue({ projectId, refresh }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("LOW");

  const createIssue = () => {
    API.post("/issues/", {
      title,
      description: desc,
      priority,
      project_id: projectId
    }).then(() => {
      setTitle("");
      setDesc("");
      refresh();
    });
  };

  return (
    <div>
      <h3>Create Issue</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)} style={{ cursor: "pointer" }}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <select onChange={e => setPriority(e.target.value)}>
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select>

      <button onClick={createIssue} style={{ cursor: "pointer" }}>Create</button>
    </div>
  );
}