# Ionic - Moments App

Moments é um aplicativo móvel que permite aos usuários registrar momentos marcantes de suas vidas. Funciona como uma espécie de diário moderno, facilitando o registro e acesso a memórias valiosas. A ideia surgiu do hábito pessoal de registrar eventos positivos ao longo do ano, ajudando a lembrar de motivos para gratidão.

---

## **Estrutura do Projeto**

```bash
src/
├── app/
│   ├── core/         # Serviços essenciais, guards e interceptors
│   ├── features/     # Módulos e páginas principais do aplicativo
│   ├── shared/       # Componentes reutilizáveis, pipes e diretivas
│   └── app.module.ts # Módulo raiz da aplicação
├── assets/           # Imagens, ícones e outros arquivos estáticos
├── environments/     # Configurações de ambiente (dev, prod)
└── theme/            # Arquivos de estilo globais
```

---

## **Como Rodar o Projeto**

Antes de tudo, certifique-se de ter o **Node.js**, **Ionic CLI** e **Angular CLI** instalados globalmente.

### 1. Clonar o repositório

```bash
git clone https://github.com/by-scottlucas/ionic-moments.git
cd ionic-moments
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar os arquivos de ambiente

O projeto utiliza variáveis de ambiente para configurar o **Firebase** e outros serviços.

1. Vá até a pasta `src/environments/`.
2. Duplique o arquivo `environment.example.ts` duas vezes:
   * Renomeie uma cópia para `environment.ts` (para ambiente de desenvolvimento)
   * Renomeie a outra para `environment.prod.ts` (para ambiente de produção)
3. Substitua os valores de exemplo pelas suas credenciais reais do Firebase.

### 4. Executar em modo de desenvolvimento

```bash
ionic serve
```

O projeto será iniciado e poderá ser acessado no navegador em:

```
http://localhost:8100/
```

### 5. (Opcional) Rodar no dispositivo Android

```bash
ionic cap run android
```

---

## **Tecnologias utilizadas**

* [Ionic Framework](https://ionicframework.com/) — Framework para desenvolvimento de aplicativos móveis híbridos com aparência e desempenho nativos.
* [Angular](https://angular.io/) — Framework front-end para construção de aplicações modulares e escaláveis.
* [TypeScript](https://www.typescriptlang.org/) — Superset do JavaScript que adiciona tipagem estática e maior segurança ao código.
* [Tailwind CSS](https://tailwindcss.com/) — Framework utilitário para criação de interfaces modernas e responsivas.
* [ngx-tailwind](https://www.npmjs.com/package/ngx-tailwind) — Integração do Tailwind CSS com Angular, facilitando a configuração e uso em componentes.
* [Lucide Icons](https://lucide.dev/) — Biblioteca open source de ícones minimalistas e personalizáveis.
* [Firebase](https://firebase.google.com/) — Plataforma Backend-as-a-Service usada para autenticação, banco de dados e armazenamento em nuvem.

---

## **Licença**

Este projeto está licenciado sob a [Licença MIT](./LICENSE).

---

## **Autor**

Este projeto foi desenvolvido por **Lucas Santos Silva**, Desenvolvedor Full Stack, graduado pela **Escola Técnica do Estado de São Paulo (ETEC)** nos cursos de **Informática (Suporte)** e **Informática para Internet**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/bylucasss/)
