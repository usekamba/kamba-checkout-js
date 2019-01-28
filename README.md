# Integração da Biblioteca Kamba Checkout

> **Nota:** Esta biblioteca está em **fase beta** e em desenvolvimento contínuo, mas completamente funcional em lojas online. Nos envie feedback ao abrir uma issue diretamente aqui mesmo no Github.

**Ofereça pagamentos de produtos ou serviços em seu website.**

Com uma única **integração multicanal**, seus clientes poderão realizar pagamentos com a carteira móvel via código QR de pagamento ou Botão de pagamento, além de utilizarem seus dados cadastrados para futuras compras. Notificação para lembretes de finalização de compra, levantamento da quantia para sua conta bancária e vários benefícios técnicos e de negócios à longo termo.

## Formas de pagamento

**Pagamento via QR:** Os usuários adicionam produtos para o carrino de compras da loja, e no checkout escolhem **pagar com Kamba** como meio de pagamento. Ao clicar em Finalizar Compra será gerado um código qr que poderá ser escaneado com a carteira móvel.

> **Nota:** O pagamento QR também funciona In-Store (dentro da loja física) do comerciante.

**Pagamento Web2App** Caso os usuários estejam a navegar no smarphone eles não poderão escanear o código QR. Para efectuar o pagamento neste caso, o usuário poderá clicar no botão Pagar com Kamba para finalizar o pagamento com a carteira instalada em seu dispositivo móvel.

> **Nota:** Você acompanha os estados do pagamento através do [painel comerciante](https://comerciante.usekamba.com/entrar), recebe notificações por e-mail e push no seu telemóvel quando pagamentos são bem sucedidos.

## Configuração

Crie uma conta em https://comerciante.usekamba.com/criar-conta para obter as suas credenciais.

Não há necessidade de clonar o repositório ou baixar arquivos para o seu computador – basta adicionar o script da biblioteca javascript no cabeçalho da sua página Web `<head></head>`, e adicionar algumas linhas de código no corpo da sua página `<body></body>`.

Siga as instruções abaixo:

### **1. Adicione o script:**

Antes de tudo, você precisará incluir nossa biblioteca javaScript.

Você deve adicionar o script na sua página de pagamento no cabeçalho como já informado acima `<head></head>`.

```html
<head>
  <script src="https://comerciante.usekamba.com/checkout/0.0.1/kamba-web-sdk.js" charset="utf-8"></script>
</head>
```

Em algum lugar no corpo da sua página, você deverá adicionar um botão que permite aos usuários efetuar um pagamento usando o Kamba. Quando o usuário clicar nesse botão, a biblioteca 'kamba-checkout-js' será chamada, e uma tela de checkout será aberta no navegador do usuário.

```html
<body>
  <button class="btnOpenWidgetKamba" onclick="start_payment()"></button>
</body>
```

**A seguir cole** o código Javascript abaixo dentro da tag html `<body></body>` no corpo da sua página Web, de preferência no final da página.

```html
<body>
  <script type="text/javascript">
    function start_payment() {
      kamba(api_config = {
      environment: 'AMBIENTE_DA_API',
      merchant_id: 'SEU_ID_COMERCIANTE_DA_API',
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
**Configurações do `api_config`:**

| Atributo        | Descrição         |
| ------------- |:-------------:|
| `environment`      | O campo `environment` define qual ambiente poderá ser usado. Durante a fase de desenvolvimento deve-se usar o ambiente ```sandbox``` e quando estiver pronto para produção deve-se usar ```production```.  |
| `merchant_id`       | Use o `merchant_id` (ID de comerciante) que copiou do seu painel de comerciante para substituir o valor do campo `merchant_id`. Recomenda-se usar variáveis de ambiente sempre, e não deve ser compartilhada ou exposta em sua página html. **O ID de comerciante da API para sandbox e production são diferentes e devem sempre ser adicionados diretamente no backend do comerciante.**     |
| `checkout_signature`        | Campo `checkout_signature` recebe o valor da assinatura do checkout gerada através de um algoritmo de mensagem-assinatura.        |

**Configurações do `checkout_config`:**

| Atributo        | Descrição         |
| ------------- |:-------------:|
| `channel`      | Para o nosso propósito o valor do campo `channel`, permanecerá igual à **WEB** como no exemplo. |
|`initial_amount`|`initial_amount`, este campo recebe o preço do produto ou serviço a ser comercializado.|
|`notes`|Substitua o valor do campo `notes` por uma anotação ou descrição geral a cerca do pagamento, e coloque o preço do mesmo no valor do campo `initial_amount`.|
|`redirect_url_success`|O campo `redirect_url_success` recebe o endereço da página na qual pretende-se ser redirecionada após o pagamento com sucesso.|

 ## Geração de assinaturas

Para garantir a segurança do checkout e da transação, uma assinatura é gerada usando a chave secreta atribuída ao comerciante.

A chave secreta designada deve ser mantida em segurança, pois é usada para autenticar o checkout através da API da Kamba.

Implementações de amostra para diferentes linguagens de programação são fornecidas para gerar uma assinatura.

> **Nota:** É altamente recomendável que a assinatura seja gerada no back-end da loja/comerciante e depois passada para a biblioteca `kamba-checkout-js` no frontend do site do comerciante. **Isso é para evitar que ocorra qualquer fraude.**

Selecione uma linguagem de programação a baixo e siga as instruções de como gerar a assinatura:**

|Linguagem| Biblioteca|
| ------ | ------ |
| **Ruby** | [kamba_signature_generation](https://github.com/usekamba/kamba_generate_signature_ruby) |



---
Crie uma issue para deixar o seu feedback ou envie o seu feedback para **suporte@usekamba.com**.
