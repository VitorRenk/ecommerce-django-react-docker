import psycopg2
import os

try:
    conn = psycopg2.connect(
        dbname=os.environ["POSTGRES_DB"],
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
        host=os.environ["POSTGRES_HOST"],
        port=os.environ["POSTGRES_PORT"]
    )
    print("Conexão bem-sucedida!")
    conn.close()
except Exception as e:
    print(f"Erro ao conectar: {e}")
