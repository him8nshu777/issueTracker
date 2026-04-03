from pydantic import BaseModel
from datetime import datetime

# USER
class UserCreate(BaseModel):
    name: str
    email: str

class UserOut(UserCreate):
    id: int
    name: str
    class Config:
        from_attributes = True

# PROJECT
class ProjectCreate(BaseModel):
    name: str
    description: str
    created_by: int

class ProjectOut(ProjectCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# ISSUE
class IssueCreate(BaseModel):
    title: str
    description: str
    priority: str
    project_id: int

class IssueOut(BaseModel):
    id: int
    title: str
    description: str
    status: str
    priority: str
    assigned_to: int | None
    assigned_user: UserOut | None   # ✅ ADD THIS

    class Config:
        from_attributes = True
        
# COMMENT
class CommentCreate(BaseModel):
    user_id: int
    message: str

class CommentOut(CommentCreate):
    id: int
    issue_id: int
    created_at: datetime
    class Config:
        from_attributes = True