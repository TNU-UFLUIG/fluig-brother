# Brother

Projeto Brother Fluig

### Instalação

Requer [Node.js](https://nodejs.org/) v4+.

Instale as dependências e inicie:

```sh
$ npm install
$ npm start
```

As alterações serão assistidas e o código atualizado será gerado no diretório de projeto no Eclipse (brother-fluig)


Para ambiente de produção...

```sh
$ npm run build
```

Para ambiente de produção assistido...

```sh
$ npm run build:watch
```

No Eclipse, selecione a raiz deste projeto como workspace e crie um novo projeto com o nome nomeDoCliente-fluig.

### Manutenção

Formulários, datasets e widgets devem ser alterados no diretório src 

Scripts do processo devem ser alterados diretamente no diretório do projeto: brother-fluig/workflow/scripts

    - TODO: Trazer scripts do processo para o diretório src e montar task no gulp para atualização no diretório do projeto

O diagrama deve ser editado pelo Eclipse

Para uso de partials nos datasets utilizar /*$$ path/do/partial.js $$*/. Ex.: /*$$ partials/callDatasul.js $$*/

### Exportação

Para exportar em ambiente de cliente, utilizar o script npm run build OU npm run build:watch

Todas as exportações devem ser feitas pelo Eclipse

    - TODO: Criar tasks para exportações via GULP

### Exportação

Estrutura de pastas:

* doc: Documentações (MIF, estimativas, imagens auxiliares) dos projetos. Sugestão: Criar uma pasta para cada projeto.
* brother-fluig: Pasta do projeto no Eclipse. Deverá ser renomeado para nomeDoCliente-fluig.
* src/datasets: Datasets do projeto. Serão compilados pelo gulp e copiados para o diretório nomeDoCliente-fluig/datasets. Na pasta partials encontram-se algumas funções auxiliares que podem ser usadas nos datasets. Para utilizá-las cole no dataset no formato abaixo:

```
/*$$ partials/executaSql.js $$*/
```

* src/forms: Formulários do projeto. Serão compilados pelo gulp e copiados para o diretório nomeDoCliente-fluig/forms. Na pasta partials encontram-se pedaços de marcação HTML que podem ser reaproveitadas no formulário. Para utilizálos cole nos formulários no formato abaixo:

```
<!-- partial:../partials/head.html -->
<!-- partial -->
```

* src/widgets: Widgets do projeto. Serão compilados pelo gulp e copiados para o diretório nomeDoCliente-fluig/widgets.
* tasks: Tarefas do gulp
