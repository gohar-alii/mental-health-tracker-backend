import { Op } from 'sequelize';

export const createLog = async (db, userId, logData) => {
  return await db.Log.create({ ...logData, userId });
};

// export const getLogsByUser = async (db, userId, period = 'week') => {
//   const where = { userId };
//   const now = new Date();
//   let startDate;

//   if (period === 'week') {
//     startDate = new Date(now.setDate(now.getDate() - 7));
//   } else if (period === 'month') {
//     startDate = new Date(now.setMonth(now.getMonth() - 1));
//   } else {
//     return await db.Log.findAll({ where });
//   }

//   where.date = {
//     [Op.gte]: startDate,
//   };

//   return await db.Log.findAll({ 
//     where,
//     order: [['date', 'ASC']]
//   });
// };


export const getLogsByUser = async (db, userId, params = {}) => {
  const where = { userId };
  const { period = 'week', date } = params;
  const now = new Date();


  if (date) {
    where.date = date;
    return await db.Log.findAll({ 
      where,
    });
  }

  let startDate;
  if (period === 'week') {
    startDate = new Date(now.setDate(now.getDate() - 7));
  } else if (period === 'month') {
    startDate = new Date(now.setMonth(now.getMonth() - 1));
  } 

  where.date = {
    [Op.gte]: startDate,
  };

  return await db.Log.findAll({ 
    where,
    order: [['date', 'ASC']]
  });
};

export const updateLog = async (db, logId, updatedData) => {
  try {
    const [affectedCount, updatedLogs] = await db.Log.update(
      { 
        ...updatedData,
        updatedAt: new Date() 
      },
      {
        where: { id: logId },
        returning: true, 
        plain: true     
      }
    );

    if (affectedCount === 0) {
      throw new Error('Log entry not found');
    }

    return updatedLogs; 
  } catch (error) {
    throw error;
  }
};

export const getLogById = async (db, logId, userId) => {
    return await db.Log.findOne({ where: { id: logId, userId } });
};