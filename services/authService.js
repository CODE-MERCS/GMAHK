const prisma = require('../configs/prisma');
const bcrypt = require('bcryptjs');

const registerUser = async (email, name, password, role, phone) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
      phone
    },
  });

  return user;
};

const findUserByEmailOrPhone = async (email, phone) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { phone }
      ]
    }
  });
  return user;
};

const getPendetaNames = async () => {
  return prisma.user.findMany({
    where: {
      role: 'PENDETA'
    },
    select: {
      id: true,
      name: true
    }
  });
};

module.exports = {
  registerUser,
  findUserByEmailOrPhone,getPendetaNames,
};
