import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

import { jsonData } from '../location';
const prisma = new PrismaClient();

async function main() {
  // const salt = await genSalt(10);
  // const alice = await prisma.user.upsert({
  //   where: {
  //     email: 'test12@gmail.com',
  //   },
  //   update: {},
  //   create: {
  //     email: 'test123@gmail.com',
  //     Password: await hash('1234', salt),
  //   },
  // });

  // console.log({ alice });
  // console.log(jsonData.name);

  const obj = jsonData;
  const countryName = obj.name;
  const phoneCode = obj.phone_code;
  const cnt = await prisma.country.create({
    data: {
      name: countryName,
      phoneCode,
    },
  });
  for (const state of obj.states) {
    const stateEntry = await prisma.state.create({
      data: {
        name: state.name,
        countryId: cnt.id,
        fullName: state.name + ', ' + countryName,
      },
    });
    for (const city of state.cities) {
      await prisma.city.create({
        data: {
          stateId: stateEntry.id,
          name: city.name,
          fullName: city.name + ', ' + stateEntry.name + ', ' + countryName,
        },
      });
      console.log(countryName + ':' + '--' + state.name + '--' + city.name);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
