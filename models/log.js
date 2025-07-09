import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Log = sequelize.define('Log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    moodRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    anxietyLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    sleepHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sleepQuality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    sleepDisturbances: {
      type: DataTypes.STRING,
    },
    physicalActivityType: {
      type: DataTypes.STRING,
    },
    physicalActivityDuration: {
      type: DataTypes.INTEGER,
    },
    socialInteractions: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
    stressLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    depressionSymptoms: {
      type: DataTypes.STRING,
    },
    anxietySymptoms: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    underscored: true,
  });

  return Log;
};