module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project Name cannot be empty." },
        is: { args: /^[A-Za-z0-9\s-]+$/, msg: "Project Name can only contain alphanumeric characters, spaces, and hyphens." }
      }
    },
    projectDeadline: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project Deadline cannot be empty." }
      }
    },
    batchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Batches',
        key: 'batchId'
      }
    }
  }, {
    timestamps: true 
  });

  Project.associate = models => {
    Project.belongsTo(models.Batch, { foreignKey: 'batchId' });
    models.Batch.hasMany(Project, { foreignKey: 'batchId' });
  };

  return Project;
};
