import Sensor from '../models/Sensor.js';

class SensorService {
  async createReading({ userId, hortalicaId, temperatura, umidade, luminosidade, nutrientes }) {
    const reading = new Sensor({
      user: userId,
      hortalica: hortalicaId,
      temperatura,
      umidade,
      luminosidade,
      nutrientes
    });
    await reading.save();
    return reading;
  }

  async getLatestByHortalica(userId, hortalicaId) {
    const reading = await Sensor.findOne({ user: userId, hortalica: hortalicaId })
      .sort({ createdAt: -1 });
    return reading;
  }

  async getHistoryByHortalica(userId, hortalicaId, limit = 7) {
    const history = await Sensor.find({ user: userId, hortalica: hortalicaId })
      .sort({ createdAt: -1 })
      .limit(limit);
    return history.reverse();
  }
}

export default new SensorService();


