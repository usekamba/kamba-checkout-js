

Ofereça pagamentos de produtos ou serviços na sua página Web a partir da Internet.

Com uma única implementação, seus clientes poderão realizar pagamentos com a sua carteira via código QR de pagamento, além de utilizarem seus dados cadastrados para futuras compras em 2 cliques. Notificação para lembretes de finalização de compra, levantamento da quantia para sua conta bancária em até 72 horas e muito mais benefícios técnicos e de negócios à longo termo.

Nota: A autenticação deve ser feita com as suas credenciais de conta Comerciante. Veja mais sobre os tipos de credenciais em https://docs.usekamba.com/#autenticacao.


Atenção:

O kamba-checkout-js está em fase beta. Para fazer parte desta fase você precisa seguir alguns passos antes:

	•	Enviar um e-mail para suporte@usekamba.com informando um telefone de contato e o e-mail para a sua conta Comerciante.
	•	Assim que possível, nossa equipa entrará em contato com você para obter mais informações e liberar a funcionalidade para a sua conta Comerciante.

Assim que você implementar o kamba-checkout-js na sua página Web, envie o endereço da sua página Web e até mesmo feedback para a nossa equipa. Nesta fase de implementação a sua opinião é extremamente importante.


Forma atual de pagamento

Pagamento via QR com um código de pagamento (muito útil para comerciantes com ponto físico que desejam digitalizar os pagamentos do seu negócio ou para organizadores de eventos para vendas de ingressos, etc, o código pode ser impresso ou enviado para diversos canais sóciais).

Nota: Você acompanha os estados do pagamento, recebe notificações por e-mail, push quando pagamentos são bem sucedidos.


Configuração inicial

Crie uma conta Comerciante com nosco entrando em contato com nossa equipe de suporte. Você receberá uma api_key e outras configurações necessárias para testar a biblioteca no modo SANDBOX.

Nota: Esta biblioteca está em fase beta e em desenvolvimento contínuo. Se você encontrar algum erro, crie uma issue para que ela seja corrigida o mais rápido possível.


Página do Comerciante

Não há necessidade de clonar o repositório ou baixar arquivos para sua máquina – basta fazer uma chamada para Plugin Javascript na página Web, e adicionar as linhas de código à baixo onde deseja que o botão de pagamento com a Kamba esteja:

Passo 1:

Inclua o Plugin Javascript no cabeçalho da página ou no final antes das outras configurações Javascript de acordo com a sua necessidade de carregamento da sua página Web.


	<head>     
	      
	    <script src="https://usekamba/kamba-web-sdk.js"charset="utf-8"></script>

	</head>

Passo 2:

Inclua o botão "pagar com Kamba" dentro do corpo da página em qualquer espaço que se pretende que ela seja apresentada. 

	<body>
		
		<button class="btnOpenWidgetKamba" onclick="start_payment()">Pagar com Kamba</button>

	</body>


Passo 3:

Use as configurações que lhe foram enviada e faça a configuração do produto ou serviço que pretende comercializar com este suporte da Kamba no script a baixo:


	<script type="text/javascript">

	       function start_payment() {
	      
	        	kamba(initial_config =
	            { 
	              channel: 'WEBSITE',
	              currency: 'AOA',
	              initial_amount: 10500,
	              notes: 'Curso API Iniciantes',
	              redirect_url_success: 'http://amarildolucas.com/curso/api-iniciantes',
	              payment_method: 'WALLET'
	            },
	            api_key = 'Token soaO7K9kcFSbG3n0DHaDFwtt');

	      }


	      /*
	      * Você pode personalizar o visual do botão "Pagar com a Kamba" alterando os valores dos * seguintes campos abaixo
	      */
	      var btnOpenWidgetKamba = document.querySelector(".btnOpenWidgetKamba");
	      btnOpenWidgetKamba.style.backgroundImage = 'linear-gradient(to left, #00ff5f, #00FFB3)';
	      btnOpenWidgetKamba.style.border = 'none';
	      btnOpenWidgetKamba.style.padding = '1rem';
	      btnOpenWidgetKamba.style.cursor = 'pointer';
	      btnOpenWidgetKamba.style.fontSize = '1rem';
	      btnOpenWidgetKamba.style.borderRadius = '0.3rem';
	      btnOpenWidgetKamba.style.fontFamily = "'Montserrat', sans-serif";

	</script>
