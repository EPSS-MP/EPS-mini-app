module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    batchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    batchName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberOfGroups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Number of Groups must be an integer." },
        min: { args: [1], msg: "Number of Groups must be at least 1." }
      }
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Instructor's Name cannot be empty." },
        is: { args: /^[A-Za-z]+$/, msg: "Instructor's Name can only contain alphabetic characters" }
      }
    }
  }, {
    timestamps: true 
  });

  return Batch;
};
