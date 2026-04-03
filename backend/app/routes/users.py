from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter(prefix="/users")

@router.post("/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    u = models.User(**user.dict())
    db.add(u)
    db.commit()
    db.refresh(u)
    return u

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()