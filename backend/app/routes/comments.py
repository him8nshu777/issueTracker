from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter(prefix="/comments")

@router.post("/{issue_id}")
def add_comment(issue_id: int, comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    c = models.Comment(issue_id=issue_id, **comment.dict())
    db.add(c)
    db.commit()
    return c

@router.get("/{issue_id}")
def get_comments(issue_id: int, db: Session = Depends(get_db)):
    return db.query(models.Comment).filter(models.Comment.issue_id == issue_id).all()