## Aplicação React para gerenciamento de empresas e locais

Essa é uma aplicação web React para gerenciar empresas e seus respectivos locais. A aplicação tem a funcionalidade de criação e autenticação de usuário, permitindo que apenas usuários autenticados possam acessar as funcionalidades de gerenciamento.

## Tecnologias utilizadas

. React
. Material UI
. SASS
. Axios
. Nookies
. Context API
. React Toastify
. React Router DOM
. Framer Motion
. Yup
. React Hook Form
. TypeScript

## Funcionalidades

. Sistema de criação e autenticação de usuário
. Gerenciamento de empresas, permitindo a criação, listagem, edição e exclusão de empresas pertencentes ao usuário autenticado
. Gerenciamento de locais, permitindo a criação, listagem, edição e exclusão de locais pertencentes a uma empresa específica do usuário autenticado

## Como executar a aplicação

Caso queira ver o deploy da aplicação, acesse o link: https://hub-frontend-xi.vercel.app/

1. Clone o repositório para o seu computador
2. Na pasta raiz do projeto, execute o comando npm install para instalar as dependências necessárias
3. Execute o comando npm start para iniciar a aplicação
4. Acesse a aplicação em http://localhost:3000

Obs: A aplicação está consumindo uma api já em deploy! Caso esteja tendo problemas com o consumo da api ou incompatibilidades, recomendo que vá até a pasta src/services/axios.ts e mude para http://localhost:3333, assim, a aplicação irá consumir a api em local host. Lembrando, que para consumir o backend em localhost, deverá clonar o repositório hub-backend, e na pasta src/index.ts, no trecho de código cors({}), o valor origin deverá ser mudado e apontado para o localHost do front-end => http://localhost:3000.

## Como utilizar a aplicação

Ao acessar a aplicação, você será redirecionado para a página de login. Caso não tenha um usuário cadastrado, clique no botão "criar conta" para se cadastrar. Após o login, você será redirecionado para a página inicial, onde poderá criar e gerenciar suas empresas e locais.

## Gerenciamento de empresas

Na página inicial, você poderá visualizar a lista de suas empresas cadastradas. Para criar uma nova empresa, clique no botão "Nova empresa" e preencha o formulário com as informações necessárias. Ao clicar em "Adicionar", a nova empresa será adicionada à lista.

Para editar ou excluir uma empresa, basta clicar no ícone correspondente na lista de empresas. Ao clicar no ícone de edição, você poderá alterar as informações da empresa. Ao clicar no ícone de exclusão, a empresa será removida da lista.

## Gerenciamento de locais

Ao clicar em uma empresa na lista de empresas, você será redirecionado para a página de gerenciamento de locais da empresa selecionada. Nessa página, você poderá visualizar a lista de locais pertencentes à empresa selecionada.

Para criar um novo local, clique no botão "Adicionar local" e preencha o formulário com as informações necessárias. Ao clicar em "Adicionar", o novo local será adicionado à lista.

Para editar ou excluir um local, basta clicar no ícone correspondente na lista de locais. Ao clicar no ícone de edição, você poderá alterar as informações do local. Ao clicar no ícone de exclusão, o local será removido da lista.

## Conclusão

Essa é uma aplicação React completa para gerenciamento de empresas e locais, com funcionalidades de autenticação e controle de acesso. A aplicação utiliza uma variedade de tecnologias modernas do ecossistema React, incluindo Material UI, React Router DOM, Framer Motion, TypeScript, entre outras.

Sinta-se à vontade para clonar o repositório e experimentar a aplicação você mesmo! 😊