from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PHONE_RE = re.compile(r'^\+?[0-9\s\-()]{8,16}$')


def clean(v):
    return v.strip() if isinstance(v, str) else v


class EnquiryCreate(BaseModel):
    product_slug: str = Field(min_length=1, max_length=80)
    product_name: str = Field(min_length=1, max_length=120)
    quantity: str = Field(min_length=1, max_length=40)
    unit: str = Field(default="pieces", max_length=20)
    length: Optional[str] = Field(default=None, max_length=40)
    width: Optional[str] = Field(default=None, max_length=40)
    thickness: Optional[str] = Field(default=None, max_length=40)
    requirements: Optional[str] = Field(default=None, max_length=1000)
    name: str = Field(min_length=2, max_length=80)
    company: Optional[str] = Field(default=None, max_length=120)
    buyer_type: str = Field(min_length=1, max_length=60)
    phone: str = Field(min_length=8, max_length=16)
    email: Optional[EmailStr] = None
    city: str = Field(min_length=2, max_length=80)
    postcode: Optional[str] = Field(default=None, max_length=12)
    timeline: Optional[str] = Field(default=None, max_length=60)
    notes: Optional[str] = Field(default=None, max_length=1000)
    consent: bool

    @field_validator('phone')
    @classmethod
    def valid_phone(cls, v):
        v = clean(v)
        if not PHONE_RE.match(v):
            raise ValueError('Invalid phone number format')
        return v

    @field_validator('consent')
    @classmethod
    def must_consent(cls, v):
        if not v:
            raise ValueError('Consent is required')
        return v


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=8, max_length=16)
    email: Optional[EmailStr] = None
    subject: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=2000)

    @field_validator('phone')
    @classmethod
    def valid_phone(cls, v):
        v = clean(v)
        if not PHONE_RE.match(v):
            raise ValueError('Invalid phone number format')
        return v


@api_router.get("/")
async def root():
    return {"message": "Sindhu Cement Works API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(payload: EnquiryCreate):
    reference = f"SCW-{uuid.uuid4().hex[:6].upper()}"
    doc = payload.model_dump(mode='json')
    doc = {k: clean(v) for k, v in doc.items()}
    doc['reference'] = reference
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.enquiries.insert_one(doc)
    doc.pop('_id', None)
    return {
        "reference": reference,
        "message": "Enquiry received. Sindhu Cement Works will review your requirement and respond.",
        "product": doc['product_name'],
    }


@api_router.get("/enquiries/{reference}")
async def get_enquiry(reference: str):
    doc = await db.enquiries.find_one(
        {"reference": reference.upper()},
        {"_id": 0, "reference": 1, "product_name": 1, "quantity": 1, "unit": 1, "name": 1, "city": 1, "created_at": 1},
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return doc


@api_router.post("/contact", status_code=201)
async def create_contact(payload: ContactCreate):
    doc = payload.model_dump(mode='json')
    doc = {k: clean(v) for k, v in doc.items()}
    doc['reference'] = f"MSG-{uuid.uuid4().hex[:6].upper()}"
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)
    return {
        "reference": doc['reference'],
        "message": "Message received. The team at Sindhu Cement Works will get back to you.",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
