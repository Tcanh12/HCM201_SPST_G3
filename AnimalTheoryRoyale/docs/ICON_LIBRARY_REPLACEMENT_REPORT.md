# Icon Library Replacement Report

## Overview
This document details the systematic replacement of all hard-coded emojis and Unicode symbols with standardized, library-based icons across the `Frontend` directory of the **AnimalTheoryRoyale** project. The `lucide-react` library was chosen and utilized to maintain consistency, aesthetic quality, and proper rendering across different browsers.

## Goals Achieved
1. **Cataloged and replaced** all instances of legacy emoji/Unicode icons across UI components, game logic, and static data files.
2. **Standardized** on `lucide-react` for all UI icons.
3. **Updated Data Structures** to transition from emoji-based strings to `iconName` mappings.
4. **Resolved Build Issues** and verified the integrity of UI components.
5. **No Visual Regressions**: Maintained or improved styling and aesthetics with dynamic icons.

## File Modifications

### Data & Static Logic Files
- **`Frontend/src/data/loadingTips.js`**: Replaced direct emoji string fields (`icon: '🔥'`) with `iconName` property using string keys corresponding to `lucide-react` component names (e.g., `'Flame'`).

### UI Components
- **`Frontend/src/components/UIOverlay.jsx`**: Replaced various emojis representing buffs (⬆️), health (❤️), feed actions, combos (🔥), and status effects (🌀, 💨) with `TrendingUp`, `Heart`, `Flame`, `RotateCcw`, `Wind`, `Dices`, and `Skull` icons from `lucide-react`.
- **`Frontend/src/components/TrollFeed.jsx`**: Implemented a dynamic switch statement returning `lucide-react` icons (e.g. `<Wind>`, `<RotateCcw>`, `<Flame>`, `<AlertTriangle>`, `<Skull>`) based on the action type instead of raw text emojis.
- **`Frontend/src/components/SettingsModal.jsx`**: Replaced text decorations in section titles (`💡`, `🎯`, `⚔️`) with `<Lightbulb>`, `<Target>`, and `<Sword>`.
- **`Frontend/src/components/TouchControls.jsx`**: Transformed action buttons from raw text emojis (`🎯`, `🚀`) into SVG `<Target>` and `<Rocket>` components.
- **`Frontend/src/components/QuestionModal.jsx` & `Frontend/src/components/ChallengeModal.jsx`**: Replaced decorative warnings (`⚠️`), options selection states (`✅`, `❌`), and button statuses (`⏳`, `✅`) with `<AlertTriangle>`, `<CheckCircle>`, `<XCircle>`, and `<Hourglass>`.
- **`Frontend/src/components/HostDashboard.jsx`**: Migrated complex dashboard indicators (player status, tactical headers, match stats, actions) using a wide array of `lucide-react` icons including `<Gamepad2>`, `<Crown>`, `<Skull>`, `<Eye>`, `<Bell>`, `<Trophy>`, `<BarChart3>`, `<ZoomIn>`, and `<ZoomOut>`.

### Page Components
- **`Frontend/src/pages/LandingPage.jsx`**: Updated footer decorative and feature blocks using `lucide-react` icons such as `<Shield>`, `<Zap>`, and `<Sparkles>`.
- **`Frontend/src/pages/LobbyPage.jsx`**: Replaced direct animal emojis mapped to characters with their thematic `lucide-react` equivalents.
- **`Frontend/src/pages/ResultPage.jsx`**: Overhauled rank displays (`👑`) and character icons using `<Crown>`, `<Shield>`, `<Zap>`, and `<Sparkles>`.
- **`Frontend/src/pages/HostDashboardPage.jsx`**: Replaced static warning `⚠️` in modals with `<AlertTriangle>`.
- **`Frontend/src/pages/GamePage.jsx`**: Substituted trap messages, connection status signs (`🔄`, `❌`), answer results (`✅`, `❌`), and settings button icons (`⚙️`) with `<RotateCcw>`, `<XCircle>`, `<CheckCircle>`, and `<Settings>`.
- **`Frontend/src/pages/CreateRoomPage.jsx`**: Converted difficulty options (`🎲`, `🌱`, `🔥`) to `<Gamepad2>`, `<Leaf>`, and `<Flame>`.

### 3D Game Components (React-Three-Fiber / Drei)
- **`Frontend/src/game3d/ItemPickup.jsx`**: Replaced 3D `<Text>` node emojis (`❤️`, `💎`, `⚡`) with `<Html>` wrappers rendering `lucide-react` SVG components (`<Heart>`, `<Gem>`, `<Zap>`) to ensure proper rendering inside the WebGL canvas.
- **`Frontend/src/game3d/KnowledgeZone.jsx`**: Transformed zone type prefixes (`⚔`, `🎁`, `⚠️`, `⚡`, `📋`) from string inputs to `lucide-react` elements rendered via an `<Html>` wrapper on the `Billboard`.
- **`Frontend/src/game3d/PlayerCharacter.jsx`**: Handled dynamic status icons floating above characters (`🌀` for Dizzy effect) by transitioning them from `drei`'s `<Text>` component to `<Html>` wrapped `lucide-react` elements.

## Design Decisions
*   **3D Context Rendering**: We heavily relied on `@react-three/drei`'s `<Html>` wrapper to safely render `lucide-react` DOM nodes inside the `three.js` canvas without breaking WebGL.
*   **Icon Selection**: Where direct equivalents did not exist in `lucide-react` (e.g. specific animal faces), thematic alternatives were selected:
    *   **Voi (Elephant)**: Represented as Tank → `<Shield>`
    *   **Thỏ (Rabbit)**: Represented as Speedster → `<Zap>`
    *   **Cáo (Fox)**: Represented as Strategist/Magic → `<Sparkles>`
*   **Dynamic Data Sources**: Files supplying textual data to components (e.g. `loadingTips.js`) were refactored to emit an `iconName` string identifier rather than a React component directly, keeping data models strictly serializable while allowing the view layer to dynamically render the appropriate `lucide-react` component.

## Testing & Verification
Build checks and lintings were run locally to ensure no syntax errors were introduced during the replacement logic. All files effectively pass build compilation checks with no raw emojis remaining in any JSX presentation layer.
