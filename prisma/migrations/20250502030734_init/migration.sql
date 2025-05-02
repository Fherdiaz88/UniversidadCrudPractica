-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dictan" (
    "id" SERIAL NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Dictan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocenteCarrera" (
    "id" SERIAL NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "DocenteCarrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarreraMaterias" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CarreraMaterias_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CarreraMaterias_B_index" ON "_CarreraMaterias"("B");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dictan" ADD CONSTRAINT "Dictan_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dictan" ADD CONSTRAINT "Dictan_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteCarrera" ADD CONSTRAINT "DocenteCarrera_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocenteCarrera" ADD CONSTRAINT "DocenteCarrera_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarreraMaterias" ADD CONSTRAINT "_CarreraMaterias_A_fkey" FOREIGN KEY ("A") REFERENCES "Carrera"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarreraMaterias" ADD CONSTRAINT "_CarreraMaterias_B_fkey" FOREIGN KEY ("B") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
