import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();
//SEED CRIADO DEVIDO A NÃO TER END POINT DE CRIAR CLIENTE, FEITO PARA POPULAR
async function main() {
  const clients = [
    {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      address: 'Rua das Flores, 123',
      profile_picture: null,
      banking: {
        create: {
          agency: '0012',
          account: '123456-7',
        },
      },
    },
    {
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      address: 'Avenida Central, 456',
      profile_picture: null,
      banking: {
        create: {
          agency: '0023',
          account: '234567-8',
        },
      },
    },
    {
      name: 'Carlos Pereira',
      email: 'carlos.pereira@example.com',
      address: 'Travessa da Paz, 789',
      profile_picture: null,
      banking: {
        create: {
          agency: '0034',
          account: '345678-9',
        },
      },
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@example.com',
      address: 'Praça da República, 321',
      profile_picture: null,
      banking: {
        create: {
          agency: '0045',
          account: '456789-0',
        },
      },
    },
  ];
  // FOI ESCOLHIDO FAZER DESSA FORMA DEVIDO AO CREATE MANY NAO ACEITAR CRIAR ANINHADO JUNTO AO BANKING
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
