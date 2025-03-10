import { DataTypes } from "sequelize";

const definePatient = (sequelize) => {
  const PatientMySQL = sequelize.define(
    "patients",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      fullName: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      birthDate: { type: DataTypes.DATEONLY, allowNull: false },
      sex: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      condition: { type: DataTypes.TEXT, allowNull: false },
      admitDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      contactDetails: { type: DataTypes.STRING, allowNull: false },
      frequencyMeasure: {
        type: DataTypes.ENUM("Red", "Green", "Blue", "Yellow", "Brown"),
        allowNull: false,
      },
    },
    { timestamps: true, tableName: "patients" }
  );

  return PatientMySQL;
};

export default definePatient;
