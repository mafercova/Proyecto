const experiments = [
  {
    id: 'balance',
    title: 'Equilibrio',
    description: 'Mantén el teléfono nivelado y observa la gravedad.',
    sensor: 'Acelerómetro',
    sensorType: 'accelerometer',
    objective: 'Mantener el teléfono aproximadamente nivelado y quieto durante 3 segundos.',
    instructions:
      'Coloca el teléfono sobre tu mano y nivélalo suavemente. Mantén una posición estable hasta completar el reto.',
    safety: 'Sujeta el teléfono con firmeza y realiza la actividad sentado o en un lugar seguro.',
    resultTitle: 'Has mantenido el equilibrio.',
    resultDescription:
      'El acelerómetro detectó principalmente la aceleración asociada con la gravedad mientras el teléfono permanecía nivelado.',
  },
  {
    id: 'acceleration',
    title: 'Detecta una aceleración',
    description: 'Mueve el teléfono y observa cómo cambia la aceleración total.',
    sensor: 'Acelerómetro',
    sensorType: 'accelerometer',
    objective: 'Superar suavemente el nivel de aceleración de un teléfono en reposo.',
    instructions:
      'Mueve el teléfono de forma controlada con la mano hasta que la aceleración total supere el umbral.',
    safety: 'Mueve el teléfono con la mano. No lo lances ni realices movimientos peligrosos.',
    resultTitle: 'Has detectado una aceleración.',
    resultDescription:
      'La aceleración puede aparecer cuando cambia la velocidad o la dirección del movimiento de un objeto.',
  },
  {
    id: 'rotation',
    title: 'Rotación',
    description: 'Gira el teléfono para detectar su velocidad angular.',
    sensor: 'Giroscopio',
    sensorType: 'gyroscope',
    objective: 'Detectar una velocidad de rotación clara alrededor de alguno de los ejes.',
    instructions: 'Gira lentamente el teléfono hacia un lado y observa cómo responden los tres ejes.',
    safety: 'Sujeta el teléfono con ambas manos si lo necesitas y evita movimientos bruscos.',
    resultTitle: 'Has detectado una rotación.',
    resultDescription:
      'El giroscopio mide la velocidad angular del dispositivo alrededor de sus tres ejes, expresada en rad/s.',
  },
  {
    id: 'magnetic-field',
    title: 'Campo magnético',
    description: 'Observa cómo cambia el campo magnético alrededor del teléfono.',
    sensor: 'Magnetómetro',
    sensorType: 'magnetometer',
    objective: 'Detectar una variación clara respecto a la lectura magnética inicial.',
    instructions:
      'Cambia la orientación del teléfono o acércalo cuidadosamente a un objeto metálico y observa la lectura.',
    safety: 'No acerques imanes muy fuertes ni objetos peligrosos al dispositivo.',
    resultTitle: 'Has detectado un cambio magnético.',
    resultDescription:
      'El magnetómetro detecta cambios en la intensidad del campo magnético alrededor del dispositivo.',
  },
];

export default experiments;
