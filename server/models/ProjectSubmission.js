module.exports = (sequelize, DataTypes) => {
  const ProjectSubmission = sequelize.define('ProjectSubmission', {
    pstId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Instructor Name cannot be empty." },
        is: { args: /^[A-Za-z]+$/, msg: "Only alphabetic characters are allowed." }
      }
    },
    projectLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project Link cannot be empty." }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      }
    },
    batchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Batches',
        key: 'batchId',
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'projectId',
      }
    }
  }, {
    timestamps: true
  });

  ProjectSubmission.associate = models => {
    ProjectSubmission.belongsTo(models.User, { foreignKey: 'userId' });
    ProjectSubmission.belongsTo(models.Batch, { foreignKey: 'batchId' });
    ProjectSubmission.belongsTo(models.Project, { foreignKey: 'projectId' });

    models.User.hasMany(ProjectSubmission, { foreignKey: 'userId' });
    models.Batch.hasMany(ProjectSubmission, { foreignKey: 'batchId' });
    models.Project.hasMany(ProjectSubmission, { foreignKey: 'projectId' });
  };

  return ProjectSubmission;
};
