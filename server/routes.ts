import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MERCENARY_TYPES } from "../client/src/data/mercenaries";

export async function registerRoutes(app: Express): Promise<Server> {
  // Player routes
  app.get("/api/player/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      let player = await storage.getPlayerByWallet(walletAddress);
      
      if (!player) {
        // Create new player if doesn't exist
        player = await storage.createPlayer({
          wallet_address: walletAddress,
          username: `Viking_${Math.floor(Math.random() * 10000)}`
        });
      }
      
      res.json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ error: "Failed to fetch player" });
    }
  });

  app.put("/api/player/:id/gold", async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      
      await storage.updatePlayerGold(parseInt(id), amount);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating player gold:", error);
      res.status(500).json({ error: "Failed to update gold" });
    }
  });

  app.put("/api/player/:id/reputation", async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      
      await storage.updatePlayerReputation(parseInt(id), amount);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating player reputation:", error);
      res.status(500).json({ error: "Failed to update reputation" });
    }
  });

  // Mercenary routes
  app.get("/api/player/:playerId/mercenaries", async (req, res) => {
    try {
      const { playerId } = req.params;
      const mercenaries = await storage.getPlayerMercenaries(parseInt(playerId));
      res.json(mercenaries);
    } catch (error) {
      console.error("Error fetching mercenaries:", error);
      res.status(500).json({ error: "Failed to fetch mercenaries" });
    }
  });

  app.post("/api/player/:playerId/mercenaries", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { mercenaryTypeId, customName } = req.body;
      
      const mercenaryType = MERCENARY_TYPES.find(t => t.id === mercenaryTypeId);
      if (!mercenaryType) {
        return res.status(400).json({ error: "Invalid mercenary type" });
      }

      const mercenary = await storage.createMercenary({
        player_id: parseInt(playerId),
        name: customName || `${mercenaryType.name} ${Math.floor(Math.random() * 1000)}`,
        type: mercenaryType.name,
        icon: mercenaryType.icon,
        health: mercenaryType.baseStats.health,
        current_health: mercenaryType.baseStats.health,
        attack: mercenaryType.baseStats.attack,
        defense: mercenaryType.baseStats.defense,
        speed: mercenaryType.baseStats.speed,
      });
      
      res.json(mercenary);
    } catch (error) {
      console.error("Error creating mercenary:", error);
      res.status(500).json({ error: "Failed to create mercenary" });
    }
  });

  app.put("/api/mercenaries/:id/health", async (req, res) => {
    try {
      const { id } = req.params;
      const { health } = req.body;
      
      await storage.updateMercenaryHealth(parseInt(id), health);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating mercenary health:", error);
      res.status(500).json({ error: "Failed to update health" });
    }
  });

  app.put("/api/mercenaries/:id/morale", async (req, res) => {
    try {
      const { id } = req.params;
      const { morale } = req.body;
      
      await storage.updateMercenaryMorale(parseInt(id), morale);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating mercenary morale:", error);
      res.status(500).json({ error: "Failed to update morale" });
    }
  });

  app.put("/api/mercenaries/:id/experience", async (req, res) => {
    try {
      const { id } = req.params;
      const { experience } = req.body;
      
      await storage.updateMercenaryExperience(parseInt(id), experience);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating mercenary experience:", error);
      res.status(500).json({ error: "Failed to update experience" });
    }
  });

  // Raid routes
  app.get("/api/raids", async (req, res) => {
    try {
      let raids = await storage.getRaidContracts();
      
      // If no raids in database, seed with default data
      if (raids.length === 0) {
        console.log("Seeding raid contracts...");
        const seedRaids = [
          {
            title: 'Merchant Caravan Raid',
            description: 'A wealthy merchant caravan travels the trade routes. Easy pickings for seasoned warriors.',
            location: 'Trade Route near Hedeby',
            difficulty: 'Easy' as const,
            required_power: 150,
            duration: '2 hours',
            gold_reward: 200,
            ton_reward: 0,
            reputation_reward: 10,
            experience_reward: 50,
            injury_risk: 15,
            death_risk: 2,
            is_active: true
          },
          {
            title: 'Saxon Village Raid',
            description: 'A prosperous Saxon village ripe for plunder. Expect moderate resistance from local militia.',
            location: 'Wessex Borderlands',
            difficulty: 'Medium' as const,
            required_power: 250,
            duration: '4 hours',
            gold_reward: 400,
            ton_reward: 0.05,
            reputation_reward: 25,
            experience_reward: 100,
            injury_risk: 30,
            death_risk: 8,
            is_active: true
          },
          {
            title: 'Monastery Assault',
            description: 'A wealthy monastery holds great treasures. Heavily defended by warrior monks.',
            location: 'Lindisfarne Abbey',
            difficulty: 'Hard' as const,
            required_power: 400,
            duration: '6 hours',
            gold_reward: 800,
            ton_reward: 0.1,
            reputation_reward: 50,
            experience_reward: 200,
            injury_risk: 45,
            death_risk: 15,
            is_active: true
          }
        ];
        
        for (const raidData of seedRaids) {
          await storage.createRaidContract(raidData);
        }
        raids = await storage.getRaidContracts();
      }
      
      res.json(raids);
    } catch (error) {
      console.error("Error fetching raids:", error);
      res.status(500).json({ error: "Failed to fetch raids" });
    }
  });

  app.post("/api/player/:playerId/raids/complete", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { raidId, victory, goldEarned, tonEarned, reputationEarned, experienceEarned, mercenariesUsed } = req.body;
      
      const completedRaid = await storage.completeRaid({
        player_id: parseInt(playerId),
        raid_id: raidId,
        victory,
        gold_earned: goldEarned,
        ton_earned: tonEarned,
        reputation_earned: reputationEarned,
        experience_earned: experienceEarned,
        mercenaries_used: mercenariesUsed
      });
      
      res.json(completedRaid);
    } catch (error) {
      console.error("Error completing raid:", error);
      res.status(500).json({ error: "Failed to complete raid" });
    }
  });

  app.get("/api/player/:playerId/raids/completed", async (req, res) => {
    try {
      const { playerId } = req.params;
      const completedRaids = await storage.getPlayerCompletedRaids(parseInt(playerId));
      res.json(completedRaids);
    } catch (error) {
      console.error("Error fetching completed raids:", error);
      res.status(500).json({ error: "Failed to fetch completed raids" });
    }
  });

  // Equipment routes (for future use)
  app.get("/api/equipment", async (req, res) => {
    try {
      const equipment = await storage.getEquipment();
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });

  app.get("/api/player/:playerId/equipment", async (req, res) => {
    try {
      const { playerId } = req.params;
      const equipment = await storage.getPlayerEquipment(parseInt(playerId));
      res.json(equipment);
    } catch (error) {
      console.error("Error fetching player equipment:", error);
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
