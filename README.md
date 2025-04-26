# FinWise - Sabedoria Financeira

## Objetivo
<p align="justify">
   O <bold>FinWise</bold> é um aplicativo de gerenciamento financeiro pessoal que ajuda os usuários a controlar suas receitas e despesas, visualizar estatísticas detalhadas e receber notificações sobre vencimentos. Com um design intuitivo e funcionalidades avançadas, o aplicativo permite um acompanhamento preciso das finanças, ajudando a manter um orçamento equilibrado.
</p>

## Principais Features
<p align="justify">
   O aplicativo permite que os usuários criem e editem suas contas, registrem receitas e despesas de maneira organizada e acompanhem seu balanço financeiro por meio de gráficos e estatísticas detalhadas. Além disso, oferece notificações para    lembrar do vencimento de despesas e faturas de cartão, permitindo um melhor controle financeiro. O FinWise também possibilita o cadastro de cartões bancários, a definição de limites de gastos por categoria e a personalização do tema do aplicativo. Outra funcionalidade importante é a criação de contas familiares compartilháveis, permitindo um gerenciamento financeiro coletivo.
</p>

## Equipe
- **Erik Neves** - Frontend
- **Gabriel Prudente** - Frontend
- **Gabriella de Lima** - Backend
- **Nicolas Von Dolinger** - Backend

## Tecnologias Utilizadas
- **Linguagem:** TypeScript
- **Frontend:** React Native
- **Backend:** Node.js
- **Banco de Dados:** MySQL

## Backlog do Produto
<p align="justify">
   1. Eu como usuário, gostaria de criar e editar uma conta. </br>
   2. Eu como usuário, gostaria de cadastrar minhas receitas no aplicativo. </br>
   3. Eu como usuário, gostaria de cadastrar minhas despesas no aplicativo. </br>
   4. Eu como usuário, gostaria de visualizar gráficos e estatísticas relacionadas ao meu balanço mensal de transações. </br>
   5. Eu como usuário, gostaria de ser notificado antes do vencimento de despesas não efetivadas. </br>
   6. Eu como usuário, gostaria de cadastrar cartões bancários. </br>
   7. Eu como usuário, gostaria de acessar a fatura do meu cartão e ser notificado do seu vencimento. </br>
   8. Eu como usuário, gostaria de personalizar a paleta de cores do aplicativo. </br>
   9. Eu como usuário, gostaria de definir limites de gastos por categoria para controlar melhor minhas finanças e ser alertado quando estiver próximo do limite. </br>
   10. Eu como usuário, gostaria de criar uma conta familiar que eu possa compartilhar com pessoas da minha escolha. </br>
</p>

## Backlog do Sprint
1. Tarefas de estruturação inicial:
   - Criar e configurar a estrutura inicial do aplicativo [Gabriel Prudente]
   - Criar e configurar o banco de dados [Gabriella]
   - Criar e configurar a estrutura inicial da API [Nicolas]
   - Disponibilizar a API e o banco de dados online [Erik Neves]
   
3. Eu como usuário, gostaria de criar e editar uma conta.
   - Implementar a tela de registro de usuários [Gabriel Prudente]
   - Implementar as rotas de cadastro de usuários na API [Gabriella]
   - Implementar a tela de login [Gabriel Prudente]
   - Implementar as rotas de login na API [Nicolas]
   - Implementar a tela de edição de usuários [Gabriel Prudente]
   - Implementar as rotas de edição de usuários na API [Nicolas]

4. Eu como usuário, gostaria de cadastrar minhas receitas no aplicativo.
   - Implementar a tela de cadastro de receitas [Erik Neves]
   - Implementar as rotas de cadastro de receitas na API []
   - Implementar a tela de edição de receitas [Erik Neves]
   - Implementar as rotas de edição de receitas na API []
   - Implementar a tela de listagem de receitas [Erik Neves]
   - Implementar as rotas de listagem de receitas na API []
  
5. Eu como usuário, gostaria de cadastrar minhas despesas no aplicativo.
   - Implementar a tela de cadastro de despesa [Gabriel Prudente]
   - Implementar as rotas de cadastro de despesas na API [Nicolas]
   - Implementar a tela de edição de despesas [Erik Neves]
   - Implementar as rotas de edição de despesas na API [Nicolas]
   - Implementar a tela de listagem de despesas [Gabriel Prudente]
   - Implementar as rotas de listagem de despesas na API [Nicolas]
  
6. Eu como usuário, gostaria de visualizar gráficos e estatísticas relacionadas ao meu balanço mensal de transações.
   - Implementar a rota de retornar estatísticas [Gabriella]

```mermaid
classDiagram
    class Usuario {
        +String nome
        +String email
        +String senha
        +login()
        +editarPerfil()
    }

    class Conta {
        +String nome
        +Float saldo
        +editarConta()
    }

    class Receita {
        +String descricao
        +Float valor
        +Date data
        +cadastrarReceita()
        +editarReceita()
    }

    class Despesa {
        +String descricao
        +Float valor
        +Date dataVencimento
        +Boolean paga
        +cadastrarDespesa()
        +editarDespesa()
    }

    class Cartao {
        +String numero
        +String nomeTitular
        +Date validade
        +Float limite
        +cadastrarCartao()
    }

    class Categoria {
        +String nome
        +Float limiteGasto
        +definirLimite()
    }

    class Notificacao {
        +String mensagem
        +Date dataHora
        +enviarNotificacao()
    }

    class ContaFamiliar {
        +String nome
        +gerenciarMembros()
    }

    Usuario o-- Conta
    Conta o-- Receita
    Conta o-- Despesa
    Usuario o-- Cartao
    Usuario o-- ContaFamiliar
    Despesa o-- Categoria
    Receita o-- Categoria
    Usuario --> Notificacao
