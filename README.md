# Projeto E-commerce

### Introdução

#### Projeto demonstrativo para criação de um site e-commerce de produtos variados, gerenciado por um administrador, com integração de pagamentos via PayPal e cartão de crédito.

#### A aplicação foi desenvolvida utilizando Django no backend e React no frontend, com suporte a Nginx como servidor web e proxy reverso.

#### Para garantir portabilidade, consistência e facilidade de deploy, a aplicação é totalmente containerizada com Docker e orquestrada localmente com Docker Compose, permitindo que todos os serviços (frontend, backend, banco de dados e Nginx) sejam executados de forma integrada.

#### O projeto também foi preparado com foco em escalabilidade, sendo compatível com ambientes baseados em Kubernetes, facilitando o deploy em ambientes de produção distribuídos.

---

### Assista ao vídeo!

📹 [Assista à demonstração do projeto no YouTube](https://youtu.be/OUWk_U099fo?si=CfnlAUHeuvFfw_5F)


---


<p align="center">
  <img src="ecommerce.PNG" alt="react" />
</p>



<p align="center">
  <img src="django.PNG" alt="django" />
</p>

---

### Como utilizar o projeto

Após realizar o clone do repositório, basta criar a pasta de ambiente env dentro da pasta do projeto e então instalar as dependências necessárias no terminal:
```
python -m venv env
pip install -r requirements.txt
```
Obs: o arquivo requirements.txt estará dentro da pasta backend, portanto tenha certeza de estar dentro da pasta correta para a instalação.

Pressione F1 e selecione:
- Python: Select Interpreter
- Selecione o Python da pasta env

Após a instalação dos requirements, ative os scripts da env no terminal:
```
.\env\Scripts\Activate.ps1
```

Agora só falta acionar a api do django:
```
python manage.py makemigrations
python manage.py migrate
```

Prossiga para o diretório backend e então utilize o seguinte comando:
```
python manage.py runserver
```

Com a página do django, é possível criar e personalizar as ordens, criar os produtos e gerenciar toda a infraestrutura do site em si.

Para visualizar a página do react, basta entrar noo diretório do frontend com um novo terminal e utilizar o seguinte comando:
```
npm install
npm start
```

Pronto, agora você pode visualizar o site disponível para os clientes.

(em construção)
obs: algumas partes estão incorretas pois ainda estou no processo de construção da documentação, após a inclusão do docker-compose, algumas partes como a utilização do banco de dados sqlite3 ficaram obsoletas para incluir um banco melhor, portanto em breve estarei atualizando esse documento.
