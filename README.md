# Ionic - Moments App

Este projeto é um aplicativo chamado Moments, cujo objetivo é permitir aos usuários registrar momentos marcantes de suas vidas. Funciona como um diário moderno e acessível via celular, facilitando o registro e acesso a memórias valiosas. A ideia surgiu do hábito pessoal de registrar eventos positivos ao longo do ano, ajudando a lembrar de motivos para gratidão nos momentos difíceis.


## Introdução

O aplicativo atualmente permite aos usuários criar uma conta para acesso, onde podem adicionar momentos significativos. Na página inicial, os momentos são exibidos em uma lista abaixo da barra de pesquisa. Para interagir com um momento, basta deslizar o item da lista para a esquerda, revelando opções para editar ou excluir.


## Estrutura do projeto

* **src/assets**: Contém recursos como imagens e arquivos de mídia.

* **src/environments**: Arquivos de configuração do ambiente.

* **src/app/components**: Componentes reutilizáveis do aplicativo.

* **src/app/guards**: Guardas de rota para controle de acesso.

* **src/app/interceptors**: Interceptadores para manipulação de requisições HTTP.

* **src/app/models**: Definições de modelos de dados utilizados na aplicação.

* **src/app/pages**: Páginas principais do aplicativo.

* **src/app/services**: Serviços que encapsulam a lógica de negócios e integração com APIs.


### Pré-requisitos

Após clonar o repositório, instale as dependências do projeto executando o seguinte comando no terminal:

```
npm install
```

O projeto requer uma API que pode ser encontrada no seguinte repositório:

[Nest Moments API](https://github.com/by-scottlucas/nest-moments-api.git)

Certifique-se de configurar e iniciar a API conforme as instruções fornecidas no repositório acima.


## Executando o projeto

Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```
ionic serve
```


## Tecnologias utilizadas:

* TypeScript
* Angular
* Ionic


## Autor

Este projeto foi desenvolvido por Lucas Santos Silva, profissional com formação técnica em Informática (Suporte) e Informática para Internet.


## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).