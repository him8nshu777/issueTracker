from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter(prefix="/issues")

@router.post("/")
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    i = models.Issue(**issue.dict())
    db.add(i)
    db.commit()
    db.refresh(i)
    return i

@router.get("/project/{project_id}")
def get_issues(project_id: int, db: Session = Depends(get_db)):
    return db.query(models.Issue).filter(models.Issue.project_id == project_id).all()

@router.put("/{issue_id}/status")
def update_status(issue_id: int, status: str, db: Session = Depends(get_db)):
    issue = db.query(models.Issue).get(issue_id)
    issue.status = status
    db.commit()
    return issue

@router.put("/{issue_id}/assign")
def assign_issue(issue_id: int, user_id: int, db: Session = Depends(get_db)):
    issue = db.query(models.Issue).get(issue_id)
    issue.assigned_to = user_id
    db.commit()
    return issue

@router.get("/{issue_id}", response_model=schemas.IssueOut)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    return db.query(models.Issue).filter(models.Issue.id == issue_id).first()