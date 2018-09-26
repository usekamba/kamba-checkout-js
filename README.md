# kamba-checkout-js

Integração do Checkout nas páginas Web



> Nota: Esta biblioteca está em fase beta e em desenvolvimento contínuo. Se você encontrar algum erro, crie uma issue para que ela seja corrigida o mais rápido possível.

Ofereça pagamentos de produtos ou serviços em seu website.

Com uma única integração, seus clientes poderão realizar pagamentos com a sua carteira via código QR de pagamento ou Botão de pagamento, além de utilizarem seus dados cadastrados para futuras compras em 2 cliques. Notificação para lembretes de finalização de compra, levantamento da quantia para sua conta bancária em até 72 horas e muito mais benefícios técnicos e de negócios à longo termo.


## Pagamento por código QR

O pagamento via código QR é muito útil para comerciantes com ponto físico que desejam digitalizar os pagamentos do seu negócio ou para organizadores de eventos para vendas de ingressos, etc. O código pode ser impresso ou enviado para diversos canais sociais.

> Nota: Você acompanha os estados do pagamento, recebe notificações por e-mail, push quando pagamentos são bem sucedidos.


## Configuração inicial

Crie uma conta Comerciante entrando em contato com a nossa equipe de suporte. Você receberá uma chave da nossa API (api_key) e outras configurações necessárias para testar essa implementação no modo SANDBOX.


## Página do comerciante

Não há necessidade de clonar o repositório ou baixar arquivos para sua máquina – basta fazer uma chamada para Plugin Javascript na sua página Web, e adicionar pequenas linhas de código no corpo da sua página, observe os passos abaixo:

Passo 1:

Faça chamada ao Plugin Javascript no cabeçalho da sua página Web ou no corpo da página antes das outras configurações Javascript que poderão ser configuradas:

```html
	<head>     
	      
	    <script src="https://cdn.rawgit.com/usekamba/sandbox-kamba-checkout-js/master/kamba-checkout.js" charset="utf-8"></script>

	</head>
```
Passo 2:

Faça a inclusão do botão "pagar com a Kamba" dentro do corpo da sua página em qualquer lugar onde desejas que ela seja apresentada. 

```html
	<body>
		
    		<button class="btnOpenWidgetKamba" onclick="start_payment()"></button>

	</body>
```

Passo 3:

 - Cole o código Javascrip abaixo dentro da tag "body" no corpo da sua página Web, de preferência no final da página.

```html
	<body>
	 	<script type="text/javascript">

			function start_payment()
			{
			
				kamba(
						api_config = 
						{
							environment: 'sandbox', // production || sandbox
							api_key: 'SUA_CHAVE_DA_API'
						},

						checkout_config =
						{ 
							channel: 'WEB',
							initial_amount: 3000,
							notes: 'Curso API Iniciantes',
							redirect_url_success: 'http://amarildolucas.com/curso/api-iniciantes'
						}
					 );
			}
     	</script>
			       
	</body>
	
```

 - Configurações Iniciais (initial_config)

		- Para o nosso propósito o valor do campo "channel", permanecerá igual à WEB como no exemplo.

		- initial_amount, este campo recebe o preço do produto ou serviço a ser comercializado.

		- Substitua o valor do campo "notes" por uma anotação a cerca do pagamento, e coloque o preço do mesmo no valor do campo "initial_amount".

		- O campo "redirect_url_success" recebe o endereço da página que na qual pretende-se ser redirecionada.

		- Para o resto dos campos acima as configurações no exemplo são suficientes.

 - Configurações secundárias (secondary_config)

		- O campo "environment" define qual ambiente poderá ser usado. Que podem ser:

		 	- Ambiente de teste (sandbox).
		 	- Ambiente de produção (production).

		 	Nota: Porém neste momento usaremos o ambiente de teste (sandbox).

		- Use a chave da API que lhe será enviada para substituir o valor do campo "api_key".


	
## Recomendações

	> A autenticação deve ser feita com as suas credenciais de conta Comerciante. Veja mais sobre os tipos de credenciais em https://docs.usekamba.com/#autenticacao.

	> Por questões de segurança, para não deixar que a sua chave de API (api_key) esteja ao alcance de qualquer pessoa que acesse a sua página Web recomendamos que estabeleça a sua chave da API utilizando as variáveis de ambiente. Podendo utilizar algo como ENV["API_KEY"] no valor da chave da API e passar a verdadeira chave da API por meio de uma variável de ambiente.

	> Por este período de testes recomendamos a utilização dos navegadores Google Chrome e Mozilla Firefox (Versões actualizadas).


> Nota: Você também pode criar uma issue para deixar o seu feedback ou enviar o seu feedback para a nossa equipa. Nesta fase de implementação a sua opinião é extremamente importante.