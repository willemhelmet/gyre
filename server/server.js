import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { MarbleService } from "./marbleService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

const marbleService = new MarbleService(process.env.MARBLE_API_KEY);

// Marble API Endpoints
app.post("/api/marble/prepare-upload", async (req, res) => {
  try {
    const { filename, extension, kind } = req.body;
    const result = await marbleService.prepareUpload(filename, extension, kind);
    res.json(result);
  } catch (error) {
    console.error("Error in prepare-upload:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/marble/generate-world", async (req, res) => {
  try {
    const { mediaAssetId, model } = req.body;
    const result = await marbleService.generateWorld(mediaAssetId, model);
    res.json(result);
  } catch (error) {
    console.error("Error in generate-world:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/marble/operations/:operationId", async (req, res) => {
  try {
    const { operationId } = req.params;
    const result = await marbleService.getOperation(operationId);
    res.json(result);
  } catch (error) {
    console.error("Error in get-operation:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/marble/worlds/:worldId", async (req, res) => {
  try {
    const { worldId } = req.params;
    const result = await marbleService.getWorld(worldId);
    res.json(result);
  } catch (error) {
    console.error("Error in get-world:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  const player = {
    id: socket.id,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    room: "default",
  };

  if (!rooms.has("default")) {
    rooms.set("default", new Set());
  }
  rooms.get("default").add(player);
  socket.join("default");

  const roomPlayers = Array.from(rooms.get("default"));
  socket.emit("players", roomPlayers);
  socket.to("default").emit("players", roomPlayers);

  socket.on("move", (position, rotation) => {
    player.position = position;
    player.rotation = rotation;
    const currentRoomPlayers = Array.from(rooms.get(player.room));
    socket.to(player.room).emit("players", currentRoomPlayers);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (rooms.has(player.room)) {
      rooms.get(player.room).delete(player);
      const remainingPlayers = Array.from(rooms.get(player.room));
      io.to(player.room).emit("players", remainingPlayers);
    }
  });
});