# Contributing to Viking Mercenaries

Thank you for your interest in contributing to Viking Mercenaries! We welcome contributions from developers, designers, game designers, and players who want to help improve the game.

## 🤝 Ways to Contribute

### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include detailed reproduction steps
- Provide browser/OS information
- Add screenshots or recordings when helpful

### 💡 Feature Requests  
- Submit enhancement ideas via GitHub Issues
- Explain the problem your feature solves
- Consider game balance implications
- Provide mockups or examples when possible

### 🛠️ Code Contributions
- Fix bugs and implement features
- Improve performance and optimization
- Add tests and documentation
- Enhance UI/UX components

### 🎨 Asset Contributions
- 3D models and animations
- Textures and materials
- Sound effects and music
- UI graphics and icons

## 🚀 Getting Started

### 1. Set Up Your Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/viking-mercenaries.git
cd viking-mercenaries

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
npm run db:push

# Start development server
npm run dev
```

### 2. Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Your Changes**
   - Write clean, maintainable code
   - Follow existing code style and patterns
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new mercenary type system"
   # or
   git commit -m "fix: resolve combat animation bug"
   ```

4. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Coding Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Prefer `interface` over `type` for object shapes
- Use meaningful variable and function names

### React Best Practices
- Use functional components with hooks
- Implement proper prop typing
- Avoid inline styles (use Tailwind classes)
- Keep components focused and single-purpose

### Game Development Patterns
- Follow the existing game state management patterns
- Use Zustand stores for global state
- Implement proper cleanup in useEffect hooks
- Maintain 60fps performance in 3D scenes

### File Organization
```
client/src/
├── components/        # React components
│   ├── ui/           # Reusable UI components
│   └── game/         # Game-specific components
├── lib/
│   ├── stores/       # Zustand state stores
│   └── utils/        # Utility functions
├── types/            # TypeScript type definitions
└── data/             # Game data and configurations
```

## 🎮 Game Design Guidelines

### Balance Considerations
- **Mercenary Stats**: New units should fit within existing power curves
- **Raid Rewards**: Maintain risk/reward balance across difficulty levels
- **Economy**: Consider impact on gold/TON balance
- **Progression**: Ensure new features don't break existing progression

### User Experience
- **Accessibility**: Support keyboard navigation and screen readers
- **Performance**: Maintain smooth 3D rendering on mid-range devices  
- **Mobile**: Consider responsive design for smaller screens
- **Clarity**: Use clear visual feedback for all player actions

### Blockchain Integration
- **Security**: Never expose private keys or sensitive wallet data
- **Fallbacks**: Provide offline/demo modes for non-crypto users
- **Gas Efficiency**: Minimize transaction costs and frequency
- **Error Handling**: Gracefully handle network failures

## 🧪 Testing

### Running Tests
```bash
# Run TypeScript type checking
npm run check

# Run unit tests (when available)
npm test

# Test database migrations
npm run db:push
```

### Manual Testing Checklist
- [ ] Game loads without console errors
- [ ] All mercenary types can be recruited
- [ ] Combat system functions correctly
- [ ] Raid contracts generate appropriate rewards
- [ ] TON wallet integration works (testnet)
- [ ] Audio plays correctly
- [ ] UI remains responsive during gameplay

## 📝 Pull Request Guidelines

### PR Title Format
- `feat: add new combat ability system`
- `fix: resolve mercenary health calculation bug`  
- `docs: update installation instructions`
- `style: improve combat UI responsiveness`
- `refactor: reorganize game state management`

### PR Description Template
```markdown
## What Changed
Brief description of your changes

## Why
Explain the problem this solves or feature this adds

## Testing
- [ ] Tested manually in browser
- [ ] Verified no TypeScript errors
- [ ] Checked game balance impact
- [ ] Tested with TON wallet integration

## Screenshots/Videos
Add visual evidence of changes when applicable

## Breaking Changes
List any breaking changes or migration requirements
```

### Review Process
1. **Automated Checks**: Ensure CI passes
2. **Code Review**: Maintainer reviews code quality and design
3. **Game Testing**: Test gameplay impact and balance
4. **Documentation**: Verify docs are updated if needed

## 🎯 Priority Areas

We're particularly interested in contributions to:

### High Priority
- **Performance Optimization**: 3D rendering improvements
- **Mobile Support**: Responsive design and touch controls
- **Security Audits**: Blockchain integration security
- **Accessibility**: Screen reader and keyboard support

### Medium Priority  
- **New Game Features**: Additional mercenary types, raid types
- **UI/UX Improvements**: Better visual feedback and animations
- **Sound Design**: Additional audio effects and music
- **Documentation**: Tutorials and game guides

### Low Priority
- **Advanced Features**: Multiplayer, guilds, advanced combat
- **Platform Expansion**: Mobile apps, desktop apps
- **Marketing Assets**: Promotional materials and media

## 🤔 Questions?

### Getting Help
- **General Questions**: GitHub Discussions
- **Bug Reports**: GitHub Issues
- **Development Help**: Discord community (when available)
- **Game Design**: Feature request discussions

### Communication Guidelines
- Be respectful and constructive
- Search existing issues before creating new ones
- Provide context and details in bug reports
- Stay on topic in discussions

## 🏆 Recognition

Contributors are recognized through:
- **Credits**: Listed in game credits and README
- **Community**: Highlighted in community showcases
- **Swag**: Potential merchandise for significant contributors
- **Early Access**: Preview upcoming features

## 📄 Legal

By contributing to Viking Mercenaries, you agree that:
- Your contributions will be licensed under the project's MIT License
- You have the right to license your contributions
- You understand this is an open source project

---

**Ready to contribute? Check out our [good first issues](https://github.com/yourorg/viking-mercenaries/labels/good%20first%20issue) to get started! ⚔️**