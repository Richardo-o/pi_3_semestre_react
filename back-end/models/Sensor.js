    import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  hortalica: { type: mongoose.Schema.Types.ObjectId, ref: 'Hortalica', required: true },
  temperatura: { type: Number, required: true }, // °C
  umidade: { type: Number, required: true }, // %
  luminosidade: { type: Number, required: true }, // lux
  nutrientes: { type: Number, required: true }, // % no solo (EC/NPK simplificado)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;


