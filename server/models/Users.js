module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "This field cannot be empty." },
        is: { args: /^[A-Za-z-]+$/, msg: "Only alphabetic characters and hyphens are allowed." }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "This field cannot be empty." },
        is: { args: /^[A-Za-z-]+$/, msg: "Only alphabetic characters and hyphens are allowed." }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Email field cannot be empty." },
        isEmail: { msg: "Must be a valid email address." }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password field cannot be empty." },
        is: { args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, msg: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character." }
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'student', 'instructor'), 
      allowNull: false
    }
  }, {
    timestamps: true 
  });

  return User;
};
