import sensorService from '../services/sensorService.js';

const createReading = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { hortalicaId, temperatura, umidade, luminosidade, nutrientes } = req.body;

    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    if (!hortalicaId) return res.status(400).json({ error: 'hortalicaId é obrigatório' });

    const reading = await sensorService.createReading({
      userId,
      hortalicaId,
      temperatura,
      umidade,
      luminosidade,
      nutrientes
    });

    res.status(201).json({ message: '✅ Leitura criada', reading });
  } catch (error) {
    console.log('❌ Erro ao criar leitura de sensor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getLatest = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { vegetableId } = req.query;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    if (!vegetableId) return res.status(400).json({ error: 'vegetableId é obrigatório' });

    const reading = await sensorService.getLatestByHortalica(userId, vegetableId);
    if (!reading) return res.status(200).json({ reading: null });

    res.status(200).json({ reading });
  } catch (error) {
    console.log('❌ Erro ao buscar leitura mais recente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { vegetableId, limit } = req.query;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    if (!vegetableId) return res.status(400).json({ error: 'vegetableId é obrigatório' });

    const history = await sensorService.getHistoryByHortalica(userId, vegetableId, parseInt(limit) || 7);
    res.status(200).json({ history });
  } catch (error) {
    console.log('❌ Erro ao buscar histórico de sensores:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default { createReading, getLatest, getHistory };


