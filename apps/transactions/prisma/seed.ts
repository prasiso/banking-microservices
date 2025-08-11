import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();
//SEED CRIADO DEVIDO A NÃO TER END POINT DE CRIAR CLIENTE, FEITO PARA POPULAR
async function main() {
  const clients = [
    {
      id_client:1,
      name: 'João Silva',
      email: 'joao.silva@example.com',
      agency: '0012',
      account: '123456-7',
    },
    {
      id_client:2,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      agency: '0023',
      account: '234567-8',
    },
    {
      id_client:3,
      name: 'Carlos Pereira',
      email: 'carlos.pereira@example.com',
      agency: '0034',
      account: '345678-9',
    },
    {
      id_client:4,
      name: 'Ana Costa',
      email: 'ana.costa@example.com',
      agency: '0045',
      account: '456789-0',
    },
  ];
  await Promise.all(
    clients.map((client) => {
      return prisma.client.create({
        data: client,
      });
    }),
  );
}
main().then(() => {
  prisma.$disconnect();
});
