export type EstadoTarea = 'Registrada' | 'Pendiente' | 'Vencida'| 'Realizada';

export const ESTADOS_TAREA: EstadoTarea[] = Array.from(['Registrada', 'Pendiente', 'Vencida', 'Realizada']) as EstadoTarea[];