# The Algorithmic Dungeon

The Algorithmic Dungeon is an interactive, single-page web dashboard designed to make learning computer science algorithms fun and visual. Built entirely with simple HTML5, CSS3, and Vanilla JavaScript, the project uses a "Dark RPG" aesthetic to explain complex logic through mini-games.

## Core Features

1. **The Dungeon Grid (Minimum Path Sum)**
   Watch Dynamic Programming in action! The app generates a grid of random "stamina costs". When you run the algorithm, it calculates the cheapest route from the top-left to the bottom-right. It uses an HTML5 Canvas overlay to draw a glowing animated path showing exactly how the algorithm navigated the grid.

2. **The Loot Pouch (Fractional Knapsack)**
   This section visualizes the Greedy Algorithm. You control a pouch capacity slider. The algorithm automatically grabs the best items based on their value-to-weight ratio. It proves how the greedy approach works by splitting items (like taking only 50% of Gold Dust) to perfectly fill the remaining space in a dynamic progress bar.

3. **The Armory (0/1 Knapsack)**
   This module tackles Dynamic Programming where you can only take *whole* items. It automatically builds a mathematical 2D table on the screen to calculate the maximum value you can carry. By hovering over the final answer, it backtracks and highlights exactly which items were chosen for the best loadout.

## Technologies Used
- **HTML5 & CSS3:** Utilizes CSS Grid for the dashboard layout and a modern Glassmorphism design (blurry, transparent backgrounds).
- **Vanilla JavaScript:** All logic is written in clean, modular ES6 JavaScript without relying on heavy frameworks like React.
- **Canvas API:** Used for drawing smooth, frame-by-frame pathfinding animations.

## How to Run Locally
Because the project uses JavaScript ES6 modules, it must be run on a local server. 
1. Open your terminal in the project folder.
2. Run `python -m http.server 8000` or `npx http-server -p 8000`.
3. Open your browser to `http://localhost:8000`.
