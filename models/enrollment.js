module.exports = (sequelize, DataTypes) => {
    const Enrollment = sequelize.define('enrollment', {
        enrollment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lrn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearlevel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lastschool: {
            type: DataTypes.STRING,
            allowNull: false
        },
        presentbrgy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        datem: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        statuss: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    return Enrollment;
  };
  
