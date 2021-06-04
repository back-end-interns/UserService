module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        department_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middlename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_no: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        person_to_contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emergency_contact: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school_year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        placeOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        guardian: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    return User;
  };
  
