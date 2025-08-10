# Banking MicroServices

## Pré-requisitos

- Docker
- Docker Compose
- Node.js 20+

## Instalando

1.  Clone o repositório
```
git clone https://github.com/prasiso/banking-microservices.git
```

2.Suba os serviços com docker
```
npm run dev
```


## Sobre o Uso da IA - TESTE
Utilizei para somente um teste unitário para teste por não saber se viola as lei fiz somente em um apps\transactions\test\unit\transaction\get-one.spec.ts
gerei um prompt
Quero que você atue como um gerador de testes unitários.
Vou enviar um código-fonte (função, classe, serviço, controller, etc.), e você deve gerar testes unitários completos para ele, seguindo as regras abaixo:

1.Use Jest como framework de testes.

2.Os testes devem ser autoexplicativos e bem organizados.

3.Inclua casos de sucesso, falha e exceções.

4.Use mocks para dependências externas.

5.Garanta que o teste seja isolado.

Retorne apenas o código do teste.


## Sobre o uso de IA - RESPONSE DTO SWAGGER
Segundo caso foi para gerar as response 200 do dto do objeto. segue o prompt:
Transforme o seguinte JSON em um DTO TypeScript para ser usado como resposta no Swagger (@ApiResponse).

Regras:
1.Use class com export.

2.Adicione os decorators @ApiProperty do @nestjs/swagger para cada campo, com description, example e type (quando necessário).

3.Se o campo for opcional, use @ApiPropertyOptional.

4.Campos que são arrays devem ter isArray: true no @ApiProperty.

5.Datas devem ter type: String e format: 'date-time'.

6.Para objetos aninhados, crie classes internas e use @Type do class-transformer para mapear.

7.Mantenha os nomes das propriedades exatamente como no JSON.

8.Converta todos os null do exemplo para valores representativos no example.

JSON:
{
  "id_transaction": 16,
  "id_client_send": 1,
  "id_client_receiver": 2,
  "status": "PENDING",
  "amount": 5,
  "description": "Teste",
  "created_at": "2025-08-09T00:00:00.000Z",
  "updated_at": "2025-08-09T00:00:00.000Z",
  "send": {
    "id_client": 1,
    "name": "Maria Oliveira"
  },
  "receiver": {
    "id_client": 1,
    "name": "Maria Oliveira"
  }
}

resposta: 
export class ClientInfoDto {
  @ApiProperty({
    description: 'Identificador único do cliente',
    example: 1,
  })
  id_client: number;

  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'Maria Oliveira',
  })
  name: string;
}

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Identificador único da transação',
    example: 16,
  })
  id_transaction: number;

  @ApiProperty({
    description: 'Identificador do cliente que enviou',
    example: 1,
  })
  id_client_send: number;

  @ApiProperty({
    description: 'Identificador do cliente que recebeu',
    example: 2,
  })
  id_client_receiver: number;

  @ApiProperty({
    description: 'Status atual da transação',
    example: 'PENDING',
  })
  status: string;

  @ApiProperty({
    description: 'Valor da transação',
    example: 5,
  })
  amount: number;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'Teste',
  })
  description: string;

  @ApiProperty({
    description: 'Data e hora de criação da transação',
    example: '2025-08-09T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  created_at: string;

  @ApiProperty({
    description: 'Data e hora da última atualização da transação',
    example: '2025-08-09T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updated_at: string;

  @ApiProperty({
    description: 'Informações do cliente que enviou',
    type: ClientInfoDto,
  })
  @Type(() => ClientInfoDto)
  send: ClientInfoDto;

  @ApiProperty({
    description: 'Informações do cliente que recebeu',
    type: ClientInfoDto,
  })
  @Type(() => ClientInfoDto)
  receiver: ClientInfoDto;
}



