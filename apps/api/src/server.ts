import env from "./config/env";
import app from "./app";
import connectDB from "./config/db";

const PORT = env.PORT;

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();