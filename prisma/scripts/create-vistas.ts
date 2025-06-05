import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
  CREATE OR REPLACE VIEW resumen_carreras AS
  SELECT c.id, c.nombre, COUNT(m.id) AS total_materias
  FROM "Carrera" c
  LEFT JOIN "Materia" m ON m."carreraId" = c.id
  GROUP BY c.id;
`);

main()
  .catch((e) => {
    console.error(' Error  vista:', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
}