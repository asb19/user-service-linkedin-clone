import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const salt = await genSalt(10);
  const alice = await prisma.user.upsert({
    where: {
      email: 'amir@gmail.com',
    },
    update: {},
    create: {
      email: 'amir2gmail.com',
      Password: await hash('1234', salt),
    },
  });

  console.log({ alice });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
