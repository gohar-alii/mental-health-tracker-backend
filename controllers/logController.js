import { createLog, getLogsByUser, getLogById , updateLog} from '../services/logService.js';
import { broadcastLogUpdate } from '../services/websocketService.js';

export const createLogEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const logData = req.body;
    
    const log = await createLog(req.db, userId, logData);
    broadcastLogUpdate(userId, log);

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLogEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const logId = req.params.id;
    const updatedData = req.body;

    const existingLog = await getLogById(req.db, logId, userId);
    if (!existingLog) {
      return res.status(404).json({ message: 'Log entry not found' });
    }
    if (existingLog.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this log' });
    }

    const updatedLog = updateLog(req.db, logId, updatedData)
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const period = req.query.period || 'week';
    const date = req.query.date;
    
    const logs = await getLogsByUser(req.db, userId, {period, date});
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const logId = req.params.id;
    
    const log = await getLogById(req.db, logId, userId);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};