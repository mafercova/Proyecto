const lessons = [
  {
    id: 'motion',
    title: 'Movimiento',
    shortDescription: 'Describe cómo cambia la posición de un objeto.',
    definition:
      'El movimiento es el cambio de posición de un objeto respecto a un punto de referencia a lo largo del tiempo.',
    example:
      'Una bicicleta se mueve cuando su posición cambia con respecto a la calle.',
    realLifeExample: 'Una bicicleta desplazándose por una calle.',
    simulation: 'motion',
    formula: 'd = posición final - posición inicial',
  },
  {
    id: 'speed',
    title: 'Velocidad',
    shortDescription: 'Relaciona la distancia recorrida con el tiempo.',
    definition:
      'La velocidad indica qué tan rápido cambia la posición de un objeto y también considera la dirección del movimiento.',
    example: 'Un tren que avanza a 20 m/s recorre 20 metros cada segundo.',
    realLifeExample: 'Un automóvil recorriendo una distancia determinada en cierto tiempo.',
    simulation: 'speed',
    formula: 'v = d / t',
  },
  {
    id: 'acceleration',
    title: 'Aceleración',
    shortDescription: 'Conoce cómo cambia la velocidad de un objeto.',
    definition:
      'La aceleración representa el cambio de velocidad de un objeto respecto al tiempo.',
    example: 'Un automóvil acelera cuando pasa de 0 a 20 m/s en varios segundos.',
    realLifeExample: 'Un automóvil aumenta su velocidad al arrancar o disminuye al frenar.',
    simulation: 'acceleration',
    formula: 'a = Δv / Δt',
  },
  {
    id: 'gravity',
    title: 'Gravedad',
    shortDescription: 'Comprende la fuerza que atrae los objetos hacia la Tierra.',
    definition:
      'La gravedad es la fuerza de atracción entre los cuerpos. Cerca de la superficie terrestre produce una aceleración aproximada de 9.8 m/s².',
    example: 'Una pelota cae al suelo porque la Tierra la atrae mediante la gravedad.',
    realLifeExample: 'Una pelota que cae al suelo cuando se suelta.',
    simulation: 'gravity',
  },
  {
    id: 'rotation',
    title: 'Rotación',
    shortDescription: 'Estudia el giro de un objeto alrededor de un eje.',
    definition:
      'La rotación es el movimiento de un objeto alrededor de un eje, como el giro de una rueda.',
    example: 'Las aspas de un ventilador realizan un movimiento de rotación.',
    realLifeExample: 'Las aspas de un ventilador o una rueda girando.',
    simulation: 'rotation',
    formula: 'ω = Δθ / Δt',
  },
  {
    id: 'magnetism',
    title: 'Magnetismo',
    shortDescription: 'Explora fuerzas producidas por imanes y corrientes.',
    definition:
      'El magnetismo es un fenómeno físico asociado a ciertos materiales y al movimiento de cargas eléctricas.',
    example: 'Una brújula se orienta gracias al campo magnético de la Tierra.',
    realLifeExample: 'Una brújula que se orienta utilizando el campo magnético terrestre.',
    simulation: 'magnetism',
  },
];

export default lessons;
