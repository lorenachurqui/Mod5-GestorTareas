//export type EstadoRegistro = 'Activo' | 'Inactivo';

//export const ESTADOS_REGISTRO: EstadoRegistro[] = Array.from(['Activo', 'Inactivo']) as EstadoRegistro[];

export enum EstadoRegistro {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo'
}

export const ESTADOS_REGISTRO: EstadoRegistro[] = [
  EstadoRegistro.ACTIVO,
  EstadoRegistro.INACTIVO
];
