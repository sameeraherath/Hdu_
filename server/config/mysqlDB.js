import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineBed from "../models/BedMySQL.js";
import definePatient from "../models/PatientMySQL.js";
import defineUser from "../models/UserMySQL.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const BedMySQL = defineBed(sequelize);
const PatientMySQL = definePatient(sequelize);
const UserMySQLModel = defineUser(sequelize);

BedMySQL.belongsTo(PatientMySQL, { foreignKey: "patientId" });
PatientMySQL.hasMany(BedMySQL, { foreignKey: "patientId" });

const connectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await PatientMySQL.sync({ alter: true });
    await BedMySQL.sync({ alter: true });
    await UserMySQLModel.sync({ alter: true });

    const patientCount = await PatientMySQL.count();
    if (patientCount === 0) {
      const initialPatients = [
        {
          fullName: "John Doe",
          age: 45,
          birthDate: "1979-05-15",
          sex: "Male",
          condition: "Fever and cough",
          contactDetails: "123-456-7890",
          frequencyMeasure: "Red",
        },
        {
          fullName: "Jane Smith",
          age: 32,
          birthDate: "1992-08-22",
          sex: "Female",
          condition: "Broken leg",
          contactDetails: "234-567-8901",
          frequencyMeasure: "Green",
        },
        {
          fullName: "Alex Lee",
          age: 60,
          birthDate: "1964-03-10",
          sex: "Other",
          condition: "Diabetes",
          contactDetails: "345-678-9012",
          frequencyMeasure: "Blue",
        },
        {
          fullName: "Mary Johnson",
          age: 28,
          birthDate: "1996-11-30",
          sex: "Female",
          condition: "Asthma",
          contactDetails: "456-789-0123",
          frequencyMeasure: "Yellow",
        },
        {
          fullName: "Tom Brown",
          age: 50,
          birthDate: "1974-07-19",
          sex: "Male",
          condition: "Hypertension",
          contactDetails: "567-890-1234",
          frequencyMeasure: "Brown",
        },
      ];
      await PatientMySQL.bulkCreate(initialPatients);
      console.log("Initial patients seeded.");
    }

    const bedCount = await BedMySQL.count();
    if (bedCount === 0) {
      const patients = await PatientMySQL.findAll({ limit: 5 });
      const initialBeds = Array.from({ length: 10 }, (_, i) => ({
        bedNumber: `B${i + 1}`,
        patientId: i < patients.length ? patients[i].id : null,
      }));
      await BedMySQL.bulkCreate(initialBeds);
      console.log("Initial beds seeded.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize, connectMySql, BedMySQL, PatientMySQL, UserMySQLModel };
