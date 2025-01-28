const prisma = require('../configs/prisma');
const bcrypt = require('bcryptjs');

const registerUser = async (email, name, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

module.exports = {
  registerUser,
  findUserByEmail,
};
