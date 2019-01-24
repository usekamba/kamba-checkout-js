# Integração da Biblioteca Kamba Checkout Web

> Nota: Esta biblioteca está em fase beta e em desenvolvimento contínuo. Se você encontrar algum erro, crie uma issue para que ela seja corrigida o mais rápido possível.

Ofereça pagamentos de produtos ou serviços em seu website.

Com uma única integração, seus clientes poderão realizar pagamentos com a sua carteira via código QR de pagamento ou Botão de pagamento, além de utilizarem seus dados cadastrados para futuras compras. Notificação para lembretes de finalização de compra, levantamento da quantia para sua conta bancária e vários benefícios técnicos e de negócios à longo termo.

## Formas atuais de pagamento

Pagamento via QR Os usuários adicionam produtos para seu carrino, e no checkout escolhem pagar com Kamba como meio de pagamento. Ao clicar "place order" será gerado um código qr que poderá ser escaneado com a carteira Kamba.

Pagamento Web2App Caso os usuários estejam a navegar no smarphone eles não poderão escanear o código QR. Para efectuar o pagamento neste caso o usuário poderá clicar no botão "Pagar com Kamba" para terminar o pagamento com a carteira Kamba.

> Nota: Você acompanha os estados do pagamento, recebe notificações por e-mail e push no seu telemóvel quando pagamentos são bem sucedidos.

## Configuração

Crie uma conta em <http://comerciante.usekamba.com/> para obter o registro como comerciante e no menu do painel clique na opção `Integrações`. Copie a sua chave de API `api_key` e outras configurações necessárias para integrar o Checkout Js.

Não há necessidade de clonar o repositório ou baixar arquivos para sua máquina – basta fazer uma chamada para a biblioteca javascript no cabeçalho da sua página Web `<head></head>`, e adicionar algumas linhas de código no corpo da sua página `<body></body>`. 

Siga as instruções abaixo:

**Passo 1:**
## Página do comerciante
Faça a chamada à biblioteca no cabeçalho da sua página Web ou no corpo da página antes das outras configurações javascript que poderão ser configuradas:

```html
<head>       
  <script src="https://comerciante.usekamba.com/checkout/0.0.1/kamba-web-sdk.js" charset="utf-8"></script>
</head>
```

**Passo 2:**
Faça a inclusão do botão "Pagar com KAMBA" dentro do corpo da sua página Web em qualquer lugar onde desejar que o botão seja apresentado. 

```html
<body>
  <button class="btnOpenWidgetKamba" onclick="start_payment()"></button>
</body>
```

**Passo 3:**
Cole o código Javascrip abaixo dentro da tag html `<body></body>` no corpo da sua página Web, de preferência no final da página.

```html
<body>
  <script type="text/javascript">
    function start_payment() {
      kamba(api_config = {
      environment: 'sandbox',
      api_key: 'SUA_CHAVE_DA_API',
      checkout_signature: 'ASSINATURA_DO_CHECKOUT'
	},
	checkout_config = { 
	  channel: 'WEB',
	  initial_amount: 10800,
	  notes: 'Curso API Iniciantes',
	  redirect_url_success: 'https://seusite.com/curso/api-iniciantes'
      });
    }
  </script>
</body>
```
**Configurações API `api_config`:**
- O campo `environment` define qual ambiente poderá ser usado. Durante a fase de desenvolvimento deve-se usar o ambiente ```sandbox``` e quando estiver pronto 
para produção deve-se usar ```production```.
- Use a chave da API que copio no seu painel de comerciante para substituir o valor do campo `api_key`. Recomenda-se usar variáveis de ambiente sempre, e não deve ser compartilhada ou exposta em sua página html. 
NOTE: A chave de API para sandbox e production são diferentes. 
- Campo `checkout_signature` recebe o valor da assinatura do checkout que poderá ser gerada.
	
**Configurações Checkout `checkout_config`:**
- Para o nosso propósito o valor do campo `channel`, permanecerá igual à **WEB** como no exemplo.
- `initial_amount`, este campo recebe o preço do produto ou serviço a ser comercializado.
- Substitua o valor do campo `notes` por uma anotação ou descrição geral a cerca do pagamento, e coloque o preço do mesmo no valor do campo `initial_amount`.
- O campo `redirect_url_success` recebe o endereço da página na qual pretende-se ser redirecionada após o pagamento com sucesso.	



 ## Geração de assinaturas

Por questões de segurança no processo de integração com o `Checkout Js` é necessário gerar uma assinatura que poderá ser passada para preencher o valor do campo `checkout_signature`. Esta assinatura poderá ser gerada usando uma linguagem de programação *Server Side* (Php, Java, Python, Ruby...) utilizada na própria página que deseja-se integrar o Checkout Js.

> **Selecione uma Linguagem de Programação a baixo e veja como gerar a assinatura usando esta linguagem:**

| [Ruby](https://github.com/usekamba/kamba_generate_signature_ruby) | Php | Java |
| ------ | ------ |------ |


## Recomendações

> A autenticação deve ser feita com as suas credenciais de conta Comerciante. Veja mais sobre os tipos de credenciais em https://docs.usekamba.com/#autenticacao.

> Por questões de segurança, para não deixar que a sua chave de API `api_key` esteja ao alcance de qualquer pessoa que acesse a sua página Web, recomendamos que estabeleça a sua chave da API utilizando variáveis de ambiente. Podendo utilizar algo como `ENV['API_KEY']` no valor da chave da API e passar a verdadeira chave da API por meio de uma variável de ambiente.

---
Nota: Você também pode criar uma issue para deixar o seu feedback ou enviar o seu feedback para suporte@usekamba.com. Nesta fase de implementação a sua opinião é extremamente importante.
