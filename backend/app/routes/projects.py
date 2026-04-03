from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter(prefix="/projects")

@router.post("/")
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    p = models.Project(**project.dict())
    db.add(p)
    db.commit()
    db.refresh(p)
    return p

@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@router.get("/{id}")
def get_project(id: int, db: Session = Depends(get_db)):
    return db.query(models.Project).filter(models.Project.id == id).first()