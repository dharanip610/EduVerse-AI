import os

from dotenv import load_dotenv
from pathlib import Path

from supabase import create_client, Client

# Load env vars from backend/.env regardless of current working directory.
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)