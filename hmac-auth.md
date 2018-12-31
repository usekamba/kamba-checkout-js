Post exemplo:
```sh
curl -X POST \
  https://API-URL/checkouts \
  -H 'authorization: Token SUA_CHAVE_DA_API' \
  -H 'content-type: application/json' \
  -H 'signature: fNrnAwHhSmEB+SkCQlGZUm4+VyQ=' \
  -H 'time: Wed, 19 Dec 2018 10:01:43 GMT' \
  -d '{
  "channel": "WEB",
  "initial_amount": 5500,
  "notes": "Alguma note exemplo.",
  "redirect_url_success": "http://amarildolucas.com/curso/aplicativo-movel-com-swift/sucesso"
}'
```

Resposta:
Success 200:
```sh
{
    "id": "0dfa1cb8-1490-4131-bc72-542e316e3722",
    "transaction_type": "CHECKOUT",
    "status": "WAITING",
    "redirect_url_success": "http://amarildolucas.com/curso/aplicativo-movel-com-swift/sucesso",
    "initial_amount": 5500,
    "fee": 0,
    "total_amount": 5500,
    "notes": "Alguma note exemplo.",
    "merchant": {
        "id": "79247905-737f-4772-9880-64adb02cc992",
        "business_name": "Restaurante Picasso",
        "phone_number": "929793316",
        "email": "airtodddncpu@hotmail.com"
    },
    "expires_at": "2018-12-21T10:02:32.904Z",
    "qr_code": "<?xml version=\"1.0\" stand..</svg>"
}
```
Error 4xx:
```
{
    "errors": [
        {
            "message": "requisição não autenticada. A assinatura (signature) não é válida."
        }
    ]
}
```
```
{
    "errors": [
        {
            "message": "requisição não autentica."
        }
    ]
}
```

```
{
    "errors": [
        {
            "message": "requisição expirada."
        }
    ]
}
```

```
{
    "errors": [
        {
            "message": "parâmetros em falta no header da requisição."
        }
    ]
}
```
```
{
    "errors": [
        {
            "message": "o parâmetro time não está no formato RFC 2616."
        }
    ]
}
```
```
{
    "errors": [
        {
            "message": "assinatura repetida."
        }
    ]
}
```
```
{
    "errors": [
        {
            "message": "chave secreta espirada."
        }
    ]
}
```
A key time representa o tempo em que a requisição foi gerada.
É criada uma assinatura hmac-sha1 da canonial_string usuando a secret_key do merchante. Essa assinatura é então codifica usando base64-encode, a gerando o valor da key signature.

Estrutura da canonical_string:
```sh
canonical_string = "{http-method},{content-Type},{body-md5},{endpoint-uri},{time}"
Exemplo: "POST,application/json,/WaMa6Hp0P90XRLMKl2IAQ==,/v1/checkouts,Wed, 19 Dec 2018 11:48:48 GMT"
```

* http-method - representa o método http da requisição
* content-Type - application/json
* body-md5 - representa a string md5 calculada a partir do json do body em forma de string.
* endpoint-uri - /v1/checkouts
* time - representa o tempo em que a requisição foi gerada, no formato RFC 2616, o mesmo valor presente na key time


Json em forma de string:
```
"{"channel":"WEB","initial_amount":5500,"notes":"Alguma note exemplo.","redirect_url_success":"http://amarildolucas.com/curso/aplicativo-movel-com-swift/sucesso"}"
```
