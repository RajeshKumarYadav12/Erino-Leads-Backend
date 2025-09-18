import dotenv from "dotenv";
import faker from "faker";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Lead from "../models/Lead.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    await Lead.deleteMany();
    await User.deleteMany();

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
    });

    const leads = [];
    for (let i = 0; i < 120; i++) {
      leads.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        company: faker.company.companyName(),
        city: faker.address.city(),
        state: faker.address.state(),
        source: faker.random.arrayElement([
          "website",
          "facebook_ads",
          "google_ads",
          "referral",
          "events",
          "other",
        ]),
        status: faker.random.arrayElement([
          "new",
          "contacted",
          "qualified",
          "lost",
          "won",
        ]),
        score: faker.datatype.number({ min: 0, max: 100 }),
        lead_value: faker.finance.amount(100, 10000, 2),
        last_activity_at: faker.date.recent(),
        is_qualified: faker.datatype.boolean(),
      });
    }

    await Lead.insertMany(leads);

    console.log("Seed complete: 1 test user + 120 leads");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();
