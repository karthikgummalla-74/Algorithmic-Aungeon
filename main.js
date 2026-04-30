import { DungeonRenderer } from './DungeonRenderer.js';
import { InventoryRenderer } from './InventoryRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main UI components
    const dungeonRenderer = new DungeonRenderer();
    const inventoryRenderer = new InventoryRenderer();
    
    console.log('The Algorithmic Dungeon initialized.');
});
