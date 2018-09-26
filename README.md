# Integração da Biblioteca Kamba Checkout Web

> Nota: Esta biblioteca está em fase beta e em desenvolvimento contínuo. Se você encontrar algum erro, crie uma issue para que ela seja corrigida o mais rápido possível.

Ofereça pagamentos de produtos ou serviços em seu website.

Com uma única integração, seus clientes poderão realizar pagamentos com a sua carteira via código QR de pagamento ou Botão de pagamento, além de utilizarem seus dados cadastrados para futuras compras. Notificação para lembretes de finalização de compra, levantamento da quantia para sua conta bancária e vários benefícios técnicos e de negócios à longo termo.


## Pagamento por código QR

O pagamento via código QR é muito útil para comerciantes que desejam receber pagamentos em seu negócio sem a necessidade de cartão. O código QR de pagamento pode ser impresso ou compartilhado para diversos canais sociais o que o torna vantajoso e multicanal.

> Nota: Você acompanha os estados do pagamento, recebe notificações por e-mail e push no seu telemóvel quando pagamentos são bem sucedidos.


## Configuração

Crie uma conta Comerciante entrando em contato com a nossa equipa suporte@usekamba.com para receber sua chave de API `api_key` e outras configurações necessárias para testar a integração no modo SANDBOX.

Não há necessidade de clonar o repositório ou baixar arquivos para sua máquina – basta fazer uma chamada para a biblioteca javascript no cabeçalho da sua página Web `<head></head>`, e adicionar algumas linhas de código no corpo da sua página `<body></body>`. 

Siga as instruções abaixo:

**Passo 1:**
## Página do comerciante
Faça a chamada à biblioteca no cabeçalho da sua página Web ou no corpo da página antes das outras configurações javascript que poderão ser configuradas:

```html
<head>       
  <script src="https://cdn.rawgit.com/usekamba/sandbox-kamba-checkout-js/master/kamba-checkout.js" charset="utf-8">	        	</script>
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
	  api_key: 'SUA_CHAVE_DA_API'
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
- O campo `environment` define qual ambiente poderá ser usado. 
- Use a chave da API que lhe será enviada para substituir o valor do campo `api_key`. Recomenda-se usar variáveis de ambiente sempre, e não deve ser compartilhada ou exposta em sua página html. 
	
**Configurações Checkout `checkout_config`:**
- Para o nosso propósito o valor do campo `channel`, permanecerá igual à **WEB** como no exemplo.
- `initial_amount`, este campo recebe o preço do produto ou serviço a ser comercializado.
- Substitua o valor do campo `notes` por uma anotação ou descrição geral a cerca do pagamento, e coloque o preço do mesmo no valor do campo `initial_amount`.
- O campo `redirect_url_success` recebe o endereço da página na qual pretende-se ser redirecionada após o pagamento com sucesso.	

## Recomendações

> A autenticação deve ser feita com as suas credenciais de conta Comerciante. Veja mais sobre os tipos de credenciais em https://docs.usekamba.com/#autenticacao.

> Por questões de segurança, para não deixar que a sua chave de API `api_key` esteja ao alcance de qualquer pessoa que acesse a sua página Web, recomendamos que estabeleça a sua chave da API utilizando variáveis de ambiente. Podendo utilizar algo como `ENV['API_KEY']` no valor da chave da API e passar a verdadeira chave da API por meio de uma variável de ambiente.

> Nota: Você também pode criar uma issue para deixar o seu feedback ou enviar o seu feedback para suporte@usekamba.com. Nesta fase de implementação a sua opinião é extremamente importante.
