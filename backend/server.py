from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
import mysql.connector
from mysql.connector import pooling
import uuid
from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(title="API TEC AN-NAHL")

# ============================================================
# CORS — harus SEBELUM include_router
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ganti * dengan alamat frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# ============================================================
# KONEKSI DATABASE — pakai connection pool
# supaya koneksi tidak putus kalau server jalan lama
# ============================================================
db_pool = pooling.MySQLConnectionPool(
    pool_name="tec_pool",
    pool_size=5,
    host="localhost",
    user="root",
    password="",
    database="tec_an_nahl"
)

def get_db():
    """Ambil koneksi dari pool, pakai, lalu kembalikan otomatis."""
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    return conn, cursor

# ============================================================
# MODEL
# ============================================================
class RegistrationCreate(BaseModel):
    name: str    = Field(..., min_length=2, max_length=100)
    phone: str   = Field(..., min_length=8, max_length=20)
    email: str   = Field(default="", max_length=100)
    age: int     = Field(..., ge=3, le=100)   # minimal 3 tahun, maksimal 100
    program: str = Field(..., pattern="^(anak|akhwat|akhi)$")  # hanya 3 pilihan
    message: str = Field(default="", max_length=500)

class Registration(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    age: int
    program: str
    message: str
    status: str
    created_at: datetime

class StatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|confirmed|cancelled)$")

# ============================================================
# ROUTES
# ============================================================

@api_router.get("/")
def root():
    return {"message": "API TEC AN-NAHL running ✓"}


# -- CREATE pendaftaran baru --
@api_router.post("/registrations", response_model=Registration, status_code=201)
def create_registration(input: RegistrationCreate):
    conn, cursor = get_db()
    try:
        new_id     = str(uuid.uuid4())
        created_at = datetime.now()

        sql = """
        INSERT INTO registrations 
        (id, name, phone, email, age, program, message, status, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        val = (
            new_id,
            input.name,
            input.phone,
            input.email,
            input.age,
            input.program,
            input.message,
            "pending",
            created_at
        )

        cursor.execute(sql, val)
        conn.commit()

        return {
            "id": new_id,
            "name": input.name,
            "phone": input.phone,
            "email": input.email,
            "age": input.age,
            "program": input.program,
            "message": input.message,
            "status": "pending",
            "created_at": created_at
        }

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Gagal menyimpan data: {str(e)}")

    finally:
        cursor.close()
        conn.close()  # kembalikan koneksi ke pool


# -- GET semua pendaftaran --
@api_router.get("/registrations", response_model=List[Registration])
def get_registrations():
    conn, cursor = get_db()
    try:
        cursor.execute("SELECT * FROM registrations ORDER BY created_at DESC")
        result = cursor.fetchall()
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal mengambil data: {str(e)}")

    finally:
        cursor.close()
        conn.close()


# -- GET satu pendaftaran by ID --
@api_router.get("/registrations/{registration_id}", response_model=Registration)
def get_registration(registration_id: str):
    conn, cursor = get_db()
    try:
        cursor.execute(
            "SELECT * FROM registrations WHERE id = %s", (registration_id,)
        )
        result = cursor.fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Pendaftaran tidak ditemukan")

        return result

    finally:
        cursor.close()
        conn.close()


# -- UPDATE status pendaftaran --
@api_router.patch("/registrations/{registration_id}/status")
def update_status(registration_id: str, body: StatusUpdate):
    """
    Ubah status pendaftaran: pending → confirmed atau cancelled
    Berguna untuk admin nanti
    """
    conn, cursor = get_db()
    try:
        cursor.execute(
            "UPDATE registrations SET status = %s WHERE id = %s",
            (body.status, registration_id)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Pendaftaran tidak ditemukan")

        return {"message": f"Status berhasil diubah ke '{body.status}'"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


# -- DELETE pendaftaran --
@api_router.delete("/registrations/{registration_id}")
def delete_registration(registration_id: str):
    conn, cursor = get_db()
    try:
        cursor.execute(
            "DELETE FROM registrations WHERE id = %s", (registration_id,)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Pendaftaran tidak ditemukan")

        return {"message": "Pendaftaran berhasil dihapus"}

    except HTTPException:
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()


# ============================================================
app.include_router(api_router)
