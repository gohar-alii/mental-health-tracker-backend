import { body, validationResult } from 'express-validator';

export const validateLogEntry = [
  body('moodRating').isInt({ min: 1, max: 5 }),
  body('anxietyLevel').isInt({ min: 1, max: 5 }),
  body('sleepHours').isFloat({ min: 0, max: 24 }),
  body('sleepQuality').isInt({ min: 1, max: 5 }),
  body('physicalActivityDuration').optional().isInt({ min: 0 }),
  body('socialInteractions').optional().isInt({ min: 0, max: 5 }),
  body('stressLevel').isInt({ min: 1, max: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];