"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const salt = await (0, bcrypt_1.genSalt)(10);
    const alice = await prisma.user.upsert({
        where: {
            email: 'amir@gmail.com',
        },
        update: {},
        create: {
            email: 'amir2gmail.com',
            Password: await (0, bcrypt_1.hash)('1234', salt),
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
//# sourceMappingURL=seed.js.map