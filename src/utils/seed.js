
//run locally to seed remote db after connecting to remote db, include DATABASE_URL in .env file
//command: node src/utils/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function seed(){
    console.log("Seeding database...");
    await prisma.user.createMany({
      data: [
        { email: "admin@servihub.com", role: "admin", name: "Admin User" },
        { email: "user1@servihub.com", name: "User One" },
      ],
    })
    
    await prisma.report.create({
      data: {
        type: "review",
        target_id: 101,
        reason: "Spam content",
        submitted_by: 2
      }
    })
  }
  seed().then(console.log("done"));