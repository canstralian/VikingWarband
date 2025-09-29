# ⚔️ Viking Mercenaries

A blockchain-powered 3D strategy game where you command a warband of Norse warriors on epic raids and conquests.

## 🎮 Game Overview

Viking Mercenaries is an immersive strategy game built with React Three Fiber that combines classic RPG mechanics with modern blockchain technology. Lead your Viking warband through dangerous raids, recruit legendary warriors, and earn both gold and TON cryptocurrency rewards.

### ✨ Key Features

- **🏺 Mercenary Recruitment**: Hire from 6 unique Viking warrior types, each with distinct abilities
- **⚔️ Strategic Combat**: Real-time 3D combat with tactical positioning and special abilities  
- **🗺️ Raid Contracts**: Accept contracts of varying difficulty for gold, TON, and reputation rewards
- **💰 Blockchain Integration**: Earn and spend TON cryptocurrency alongside traditional game currency
- **📈 RPG Progression**: Level up mercenaries, upgrade equipment, and build reputation
- **🛡️ Warband Management**: Manage morale, health, experience, and equipment for your warriors

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- TON wallet (optional, demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd viking-mercenaries
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Database configuration
   DATABASE_URL="your-postgresql-connection-string"
   
   # Optional: TON blockchain configuration
   TON_NETWORK="testnet" # or "mainnet"
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The game will be available at `http://localhost:5000`

## 🎯 How to Play

### 1. **Connect Your Wallet (Optional)**
- Connect a TON wallet for blockchain features
- Or play in demo mode with virtual currency

### 2. **Recruit Your Warband**
Choose from 6 unique mercenary types:
- **🪓 Berserker** - High damage, low defense glass cannons
- **🛡️ Shield-maiden** - Balanced warriors with defensive expertise  
- **🏹 Norse Archer** - Long-range specialists with high speed
- **⚔️ Huscarl** - Elite heavy infantry with superior armor
- **🎵 Skald** - Support warriors who boost ally morale
- **👑 Jarl** - Legendary commanders with exceptional all-around stats

### 3. **Accept Raid Contracts**
- Browse available contracts by difficulty: Easy → Legendary
- Consider required power level, rewards, and risks
- Higher difficulty = better rewards but greater injury/death risk

### 4. **Manage Your Warriors**
- Monitor health, morale, and experience
- Equip weapons and armor for stat bonuses
- Rest injured mercenaries between raids

## 🏗️ Architecture

### Frontend (`client/`)
- **React 18** with TypeScript
- **React Three Fiber** for 3D graphics and game world
- **Radix UI** components for game interface
- **Zustand** for state management
- **TailwindCSS** for styling
- **Framer Motion** for animations

### Backend (`server/`)
- **Express.js** API server
- **WebSocket** support for real-time features
- **PostgreSQL** with Drizzle ORM
- **Session management** with Express sessions

### Blockchain Integration
- **TON Connect** for wallet connectivity
- **TON Network** integration for cryptocurrency rewards
- Dual currency system (Gold + TON)

## 🎨 Assets

The game includes rich multimedia assets:
- **3D Models**: Characters, environments, and props (`.gltf` format)
- **Textures**: High-quality materials for realistic rendering
- **Audio**: Immersive sound effects and background music
- **Typography**: Custom Viking-themed fonts

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run start      # Start production server
npm run check      # Type checking
npm run db:push    # Push database schema changes
```

### Tech Stack

- **Frontend**: React, Three.js, TypeScript, Vite
- **Backend**: Node.js, Express, WebSocket
- **Database**: PostgreSQL, Drizzle ORM
- **Blockchain**: TON Network
- **Styling**: TailwindCSS, Radix UI
- **Animation**: Framer Motion, GSAP
- **Audio**: Howler.js

### Project Structure

```
viking-mercenaries/
├── client/                 # Frontend React application
│   ├── public/            # Static assets (textures, sounds, models)
│   ├── src/
│   │   ├── components/    # Game screens and UI components
│   │   ├── lib/stores/    # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   └── data/          # Game data and configurations
├── server/                # Backend Express server
├── shared/                # Shared types and schemas
└── docs/                  # Additional documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 Game Design

### Mercenary Stats System
Each warrior has four core attributes:
- **Health**: Hit points and survivability
- **Attack**: Damage output potential
- **Defense**: Damage reduction and armor rating
- **Speed**: Initiative and movement capabilities

### Risk/Reward Balance
- Easy contracts: Low risk, steady income
- Hard contracts: Moderate risk, good rewards  
- Legendary contracts: High risk, exceptional TON rewards

### Progression Systems
- **Experience**: Improves mercenary effectiveness
- **Equipment**: Weapons and armor provide stat bonuses
- **Reputation**: Unlocks access to better contracts
- **Morale**: Affects combat performance

## 🌟 Roadmap

- [ ] **Multiplayer Raids**: Cooperative warband missions
- [ ] **PvP Combat**: Player vs player warband battles  
- [ ] **NFT Integration**: Unique legendary mercenaries as NFTs
- [ ] **Guild System**: Form alliances with other players
- [ ] **Advanced Combat**: Tactical formations and battle commands
- [ ] **Historical Campaigns**: Story-driven single-player missions

## 📞 Support

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join our community discussions
- **Documentation**: Check our [Wiki](wiki/) for detailed guides

---

*Ready your axes and gather your warriors - Valhalla awaits! ⚔️*