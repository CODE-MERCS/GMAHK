const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'pendeta@example.com', name: 'PENDETA', password: 'admin123', role: 'PENDETA' },
      { email: 'sekre@example.com', name: 'SEKRETARIS', password: 'sekre123', role: 'SEKRETARIS' },
      { email: 'ketua@example.com', name: 'Ketua', password: 'ketua123', role: 'KETUADEPARTEMEN' },

    ],
  });
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
