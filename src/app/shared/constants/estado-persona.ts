export type EstadoPersona = 'Activo' | 'Suspendido' | 'Retirado';

// Tipado explícito y conversión a array mutable
export const ESTADOS_PERSONA: EstadoPersona[] = Array.from(['Activo', 'Suspendido', 'Retirado']) as EstadoPersona[];