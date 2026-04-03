import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/projects/").then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.map(p => (
        <div key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: "pointer" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}