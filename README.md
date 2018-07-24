# kamba-checkout-js

Integração do Checkout nas páginas Web



Nota: Esta biblioteca está em fase beta e em desenvolvimento contínuo. Se você encontrar algum erro, crie uma issue para que ela seja corrigida o mais rápido possível.

Com uma simples implementação do nosso plugin js e pequenas configurações, permita que seus clientes possam realizar pagamentos dos seus serviços ou produtos na internet com a sua carteira Kamba, torne cada vez mais destacado o seu negócio na internet implementado um pagamento via código QR.


Pagamento por código QR

O pagamento via código QR é muito útil para comerciantes com ponto físico que desejam digitalizar os pagamentos do seu negócio ou para organizadores de eventos para vendas de ingressos, etc. O código pode ser impresso ou enviado para diversos canais sociais.

Nota: Você acompanha os estados do pagamento, recebe notificações por e-mail, push quando pagamentos são bem sucedidos.


Configuração inicial

Crie uma conta Comerciante entrando em contato com a nossa equipe de suporte. Você receberá uma chave da nossa API (api_key) e outras configurações necessárias para testar essa implementação no modo SANDBOX.


Página do comerciante

Não há necessidade de clonar o repositório ou baixar arquivos para sua máquina – basta fazer uma chamada para Plugin Javascript na sua página Web, e adicionar pequenas linhas de código no corpo da sua página, observe os passos abaixo:

Passo 1:

Faça chamada ao Plugin Javascript no cabeçalho da sua página Web ou no corpo da página antes das outras configurações Javascript que poderão ser configuradas:


	<head>     
	      
	    <script src="https://usekamba/kamba-web-sdk.js" charset="utf-8"></script>

	</head>

Passo 2:

Faça a inclusão do botão "pagar com a Kamba" dentro do corpo da sua página em qualquer lugar onde desejas que ela seja apresentada. 

	<body>
		
    	<button class="btnOpenWidgetKamba" onclick="start_payment()"></button>

	</body>


Passo 3:

 - Cole o código Javascrip abaixo no corpo da sua página Web, de preferência no final da página.
	
	 	<script type="text/javascript">

	       	function start_payment() {  
	      
		        kamba(
		        	initial_config =
		            { 
		              channel: 'WEBSITE',
		              currency: 'AOA',
		              initial_amount: 10500,
		              notes: 'Curso API Iniciantes',
		              redirect_url_success: 'http://amarildolucas.com/curso/api-iniciantes',
		              payment_method: 'WALLET'
		            },
		           
		            header = 
		            {
		              // production || sandbox
		              enviroment: 'sandbox',
		              api_key: 'Token soaO7K9kcFSbG3n0DHaDFwtt'
		            }
		            );

	      	}

	      	styleButtonPayKamba();

	    </script>
	


 - Configurações Iniciais (initial_config)

		- Substitua o valor do campo "notes" pelo nome do produto ou serviço que desejas comercializar, e coloque o preço do mesmo no valor do campo "initial_amount".

		- O campo "redirect_url_success" serve para receber o endereço da página que está a ser configurada, no entanto subistitua o valor inicial deste campo o endereço da sua página Web.

		- Para o resto dos campos acima as configurações no exemplo são suficientes.

 - Configurações de cabeçalho (header)

		- O campo "enviroment" serve para definir qual ambiente a ser usado, porém neste momento usaremos o ambiente de teste (sandbox).

		- Use a chave da API que lhe será enviada para substituir o valor do campo "api_key".


	
Recomendação: A autenticação deve ser feita com as suas credenciais de conta Comerciante. Veja mais sobre os tipos de credenciais em https://docs.usekamba.com/#autenticacao.


Nota: Você também pode criar uma issue para deixar o seu feedback ou enviar o seu feedback para a nossa equipa. Nesta fase de implementação a sua opinião é extremamente importante.