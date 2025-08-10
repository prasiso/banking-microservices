import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import axios from 'axios';
interface Swagger {
  name: string;
  url: string;
}
export async function setupUnifiedSwagger(
  app: INestApplication,
  microservice: Swagger[],
) {
  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Documentação unificada')
    .setVersion('0.3')
    .build();
  const gatewayDoc = SwaggerModule.createDocument(app, options);
  const swaggerDocs = await Promise.all(
    microservice.map((service) =>
      axios
        .get(`${service.url}`)
        .then((res) => res.data)
        .catch((err) => {
          return { paths: {}, components: { schemas: {} } };
        }),
    ),
  );
  for (const doc of swaggerDocs) {
    gatewayDoc.paths = { ...gatewayDoc.paths, ...doc.paths };
    gatewayDoc.components = {
      ...gatewayDoc.components,
      schemas: {
        ...gatewayDoc.components?.schemas,
        ...doc.components?.schemas,
      },
    };
  }
  SwaggerModule.setup('documentation', app, gatewayDoc);
}
