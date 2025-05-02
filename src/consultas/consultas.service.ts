import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultasService {
  constructor(private prisma: PrismaService) {}

  // Materias y carrera de un estudiante
  async materiasYCarreraDeEstudiante(estudianteId: number) {
    // Obtenemos las inscripciones del estudiante
    const inscripciones = await this.prisma.inscripcion.findMany({
      where: { estudianteId },
      include: { 
        materia: {
          include: {
            registros: {
              include: {
                carrera: true
              }
            }
          }
        },
        estudiante: true
      }
    });

    if (!inscripciones.length) {
      return {
        estudianteId,
        mensaje: 'Estudiante no encontrado o sin inscripciones',
        materias: [],
        carreras: []
      };
    }

    // Extraemos el nombre del estudiante de la primera inscripción
    const nombreEstudiante = inscripciones[0].estudiante.nombre;

    // Extraemos materias y sus carreras asociadas
    const materiasYCarreras = inscripciones.map(inscripcion => ({
      materia: {
        id: inscripcion.materia.id,
        nombre: inscripcion.materia.nombre
      },
      carreras: inscripcion.materia.registros.map(registro => ({
        id: registro.carrera.id,
        nombre: registro.carrera.nombre
      }))
    }));

    return {
      estudiante: {
        id: estudianteId,
        nombre: nombreEstudiante
      },
      materiasYCarreras,
      cantidadMaterias: inscripciones.length
    };
  }

  // Contar estudiantes por carrera
  async contarEstudiantesPorCarrera(carreraId: number) {
    // Verificamos si la carrera existe
    const carrera = await this.prisma.carrera.findUnique({
      where: { id: carreraId }
    });

    if (!carrera) {
      return {
        carreraId,
        nombreCarrera: 'Carrera no encontrada',
        cantidadEstudiantes: 0
      };
    }

    // Obtenemos las materias de la carrera
    const materiasDeCarrera = await this.prisma.registro.findMany({
      where: { carreraId },
      include: { materia: true }
    });

    const materiaIds = materiasDeCarrera.map(registro => registro.materiaId);

    // Contamos estudiantes únicos inscritos en esas materias
    const inscripciones = await this.prisma.inscripcion.findMany({
      where: {
        materiaId: { in: materiaIds }
      },
      distinct: ['estudianteId']
    });

    return {
      carreraId,
      nombreCarrera: carrera.nombre,
      cantidadEstudiantes: inscripciones.length
    };
  }

  // Estudiantes por materia
  async estudiantesPorMateria(materiaId: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id: materiaId }
    });

    if (!materia) {
      return {
        materiaId,
        nombreMateria: 'Materia no encontrada',
        estudiantes: [],
        cantidadEstudiantes: 0
      };
    }

    // Obtenemos los estudiantes inscritos en la materia
    const inscripciones = await this.prisma.inscripcion.findMany({
      where: { materiaId },
      include: { estudiante: true }
    });

    // Buscamos información de carreras para cada estudiante
    const estudiantes = await Promise.all(
      inscripciones.map(async (inscripcion) => {
        // Buscamos en qué carrera está el estudiante (a través de las materias)
        const materiasDelEstudiante = await this.prisma.inscripcion.findMany({
          where: { estudianteId: inscripcion.estudianteId },
          include: { 
            materia: {
              include: {
                registros: {
                  include: {
                    carrera: true
                  }
                }
              }
            }
          }
        });

        // Extraemos todas las carreras únicas donde el estudiante tiene materias
        const carreras = materiasDelEstudiante.flatMap(
          insc => insc.materia.registros.map(reg => ({
            id: reg.carrera.id,
            nombre: reg.carrera.nombre
          }))
        );

        // Eliminamos duplicados de carreras
        const carrerasUnicas = Array.from(
          new Map(carreras.map(item => [item.id, item])).values()
        );

        return {
          id: inscripcion.estudiante.id,
          nombre: inscripcion.estudiante.nombre,
          carreras: carrerasUnicas
        };
      })
    );

    return {
      materiaId,
      nombreMateria: materia.nombre,
      estudiantes,
      cantidadEstudiantes: inscripciones.length
    };
  }

  // Docentes por materia
  async docentesDeMateria(materiaId: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id: materiaId }
    });

    if (!materia) {
      return {
        materiaId,
        nombreMateria: 'Materia no encontrada',
        docentes: []
      };
    }

    const dictados = await this.prisma.dictan.findMany({
      where: { materiaId },
      include: { docente: true }
    });

    return {
      materiaId,
      nombreMateria: materia.nombre,
      docentes: dictados.map(dictado => ({
        id: dictado.docente.id,
        nombre: dictado.docente.nombre
      })),
      cantidadDocentes: dictados.length
    };
  }

  // Relación docentes - carreras
  async docentesPorCarrera(carreraId: number) {
    const carrera = await this.prisma.carrera.findUnique({
      where: { id: carreraId }
    });

    if (!carrera) {
      return {
        carreraId,
        nombreCarrera: 'Carrera no encontrada',
        docentes: []
      };
    }

    // Obtenemos las materias de la carrera
    const registros = await this.prisma.registro.findMany({
      where: { carreraId },
      include: { materia: true }
    });

    const materiaIds = registros.map(registro => registro.materiaId);

    // Obtenemos los docentes que dictan esas materias
    const docentesPorMateria = await this.prisma.dictan.findMany({
      where: {
        materiaId: { in: materiaIds }
      },
      include: {
        docente: true,
        materia: true
      }
    });

    // Agrupamos los resultados por docente
    const docentesAgrupados = docentesPorMateria.reduce((acc, dict) => {
      const docenteId = dict.docente.id;
      
      if (!acc[docenteId]) {
        acc[docenteId] = {
          id: dict.docente.id,
          nombre: dict.docente.nombre,
          materias: []
        };
      }
      
      // Verificamos si la materia ya existe en el arreglo para evitar duplicados
      const materiaExistente = acc[docenteId].materias.find(m => m.id === dict.materia.id);
      if (!materiaExistente) {
        acc[docenteId].materias.push({
          id: dict.materia.id,
          nombre: dict.materia.nombre
        });
      }
      
      return acc;
    }, {} as Record<number, any>);

    return {
      carreraId,
      nombreCarrera: carrera.nombre,
      docentes: Object.values(docentesAgrupados)
    };
  }

  // Obtener todas las materias con sus docentes y conteo de estudiantes
  async obtenerMateriasCompleto() {
    const materias = await this.prisma.materia.findMany({
      include: {
        dictan: {
          include: {
            docente: true,
          },
        },
        inscripciones: true,
        registros: {
          include: {
            carrera: true
          }
        }
      },
    });

    return materias.map(materia => ({
      id: materia.id,
      nombre: materia.nombre,
      docentes: materia.dictan.map(d => ({
        id: d.docente.id,
        nombre: d.docente.nombre
      })),
      cantidadDocentes: materia.dictan.length,
      cantidadEstudiantes: materia.inscripciones.length,
      carreras: materia.registros.map(r => ({
        id: r.carrera.id,
        nombre: r.carrera.nombre
      }))
    }));
  }

  // Obtener todas las carreras con conteo de estudiantes y docentes
 // Obtener todas las carreras con conteo de estudiantes y docentes
async obtenerCarrerasCompleto() {
  const carreras = await this.prisma.carrera.findMany({
    include: {
      registros: {
        include: {
          materia: {
            include: {
              inscripciones: {
                select: {
                  estudianteId: true
                }
              },
              dictan: {
                include: {
                  docente: true
                }
              }
            }
          }
        }
      }
    }
  });

  return Promise.all(carreras.map(async carrera => {
    // Contamos estudiantes únicos en todas las materias de la carrera
    const materiaIds = carrera.registros.map(r => r.materiaId);
    
    const estudiantesUnicos = await this.prisma.inscripcion.findMany({
      where: {
        materiaId: { in: materiaIds }
      },
      distinct: ['estudianteId'],
      select: {
        estudianteId: true
      }
    });
    
    // Recopilamos todos los docentes únicos
    const docentesSet = new Set<number>();
    
    // Define el tipo para docentesInfo explícitamente
    const docentesInfo: Array<{ id: number; nombre: string }> = [];
    
    carrera.registros.forEach(registro => {
      registro.materia.dictan.forEach(dicta => {
        if (!docentesSet.has(dicta.docente.id)) {
          docentesSet.add(dicta.docente.id);
          docentesInfo.push({
            id: dicta.docente.id,
            nombre: dicta.docente.nombre
          });
        }
      });
    });

    return {
      id: carrera.id,
      nombre: carrera.nombre,
      cantidadEstudiantes: estudiantesUnicos.length,
      docentes: docentesInfo,
      cantidadDocentes: docentesInfo.length,
      materias: carrera.registros.map(r => ({
        id: r.materia.id,
        nombre: r.materia.nombre
      })),
      cantidadMaterias: carrera.registros.length
    };
  }));
}
}