# Node.js Backend com Express e Knex

Este é um backend desenvolvido em Node.js utilizando o framework Express e o Knex.js como query builder para interação com o banco de dados.

## Requisitos
Certifique-se de ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados suportado pelo Knex (MySQL, PostgreSQL, SQLite, etc.)

## Instalação
1. Clone este repositório:

```bash
git clone https://github.com/IdenilsonSantos/autoescola.git
```

2. Acesse o diretório do projeto:

```bash
cd backend
```

3. Instale as dependências:

Com npm:
```bash
npm install
```

Com yarn:
```bash
yarn install
```

## Configuração
1. Crie um arquivo `.env` na raiz do projeto baseado no arquivo `.env.example`:

```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu-usuario
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=nome-do-banco
```

3. Configure as migrações do Knex:

```bash
npx knex migrate:latest
```

## Executando o Projeto
Para iniciar o servidor de desenvolvimento, execute:

Com npm:
```bash
npm run dev
```

Com yarn:
```bash
yarn dev
```

O servidor será iniciado em `http://localhost:3333` (ou na porta configurada no arquivo `.env`).

## Scripts Disponíveis
- `dev`: Inicia o servidor em modo de desenvolvimento com hot reload (usando ts-node).
- `build`: Cria o build da aplicação.
- `teste`: Inicia o servidor em modo de teste usando jest.
- `start`: Inicia o servidor em modo de produção.
- `knex:migrate`: Executa todas as migrações pendentes do Knex.
- `knex:rollback-all`: Reverte a última migração executada.

## Estrutura do Projeto

```plaintext
src/server
|-- controllers/   # Controladores para a lógica de negócio
|-- database/ # Configurações do Knex e migrações
   |-- models  # Modelos para interação com o banco de dados    
   |-- providers  # Repositorios para interação
   |-- migrations  # Criação das tabelas
|-- middlewares/   # Middlewares personalizados   
|-- routes/        # Arquivos de rota
tests # Arquivos de testes
```

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- [dotenv](https://github.com/motdotla/dotenv) para gerenciar variáveis de ambiente

# Aplicação React com Vite, Vitest, Tailwind e DaisyUI

Este é um frontend desenvolvido em React utilizando o Vite como ferramenta de build, o Vitest para testes, e estilização com Tailwind CSS e DaisyUI.

## Requisitos
Certifique-se de ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação
1. Clone este repositório:

```bash
git clone https://github.com/IdenilsonSantos/autoescola.git
```

2. Acesse o diretório do projeto:

```bash
cd frontend
```

3. Instale as dependências:

Com npm:
```bash
npm install
```

Com yarn:
```bash
yarn install
```

4. Configure o Tailwind CSS e DaisyUI (já pré-configurados no projeto):
   - Certifique-se de que os arquivos de configuração `tailwind.config.js` e `postcss.config.js` estão corretos.

## Executando o Projeto
Para iniciar o servidor de desenvolvimento, execute:

Com npm:
```bash
npm run dev
```

Com yarn:
```bash
yarn dev
```

O aplicativo será iniciado em `http://localhost:5173` por padrão.

## Scripts Disponíveis
- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Compila o aplicativo para produção.
- `preview`: Visualiza a versão compilada do aplicativo.
- `test`: Executa os testes usando o Vitest.

## Configuração para Testes
Os testes utilizam o Vitest. Para configurar novos testes, adicione arquivos com a extensão `.test.js` ou `.test.tsx` na estrutura do projeto. 

Para rodar os testes, execute:

Com npm:
```bash
npm run test
```

Com yarn:
```bash
yarn test
```

## Estilização
Este projeto utiliza o [Tailwind CSS](https://tailwindcss.com/) para estilização e o [DaisyUI](https://daisyui.com/) para componentes prontos e temas.

### Temas
Para alterar o tema, edite o arquivo `tailwind.config.js` e atualize a configuração do DaisyUI.

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake"],
},
```

### Personalização
Você pode personalizar as classes no arquivo `tailwind.config.js` para atender às necessidades do projeto.

## Estrutura do Projeto

```plaintext
src/
|-- components/    # Componentes reutilizáveis
|-- Pages/         # Páginas do aplicativo
|-- utils/         # Hooks ou arquivos de auxilio  personalizados
|-- __tests__/         # Arquivos de teste
|-- main.tsx       # Ponto de entrada do aplicativo
```

## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) para testes
- [Testing Library](https://testing-library.com/) para testes de UI
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [DaisyUI](https://daisyui.com/) para componentes de UI
- [ESLint](https://eslint.org/) para linting de código

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

