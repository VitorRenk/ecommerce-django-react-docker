# Usa imagem base com Python
FROM python:3.12.3


# Define o diretório de trabalho no container
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd


# Copia o requirements para instalar dependências antes (melhor cache)
COPY requirements.txt .

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . .

# Expõe a porta 8000
EXPOSE 8000

# Comando padrão para iniciar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
