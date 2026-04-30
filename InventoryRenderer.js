import { fractionalKnapsack, zeroOneKnapsack } from './Algorithms.js';
import { GameState } from './GameState.js';

export class InventoryRenderer {
    constructor() {
        // Greedy Elements
        this.slider = document.getElementById('capacity-slider');
        this.capacityVal = document.getElementById('capacity-val');
        this.pouchBar = document.getElementById('pouch-bar');
        this.greedyList = document.getElementById('greedy-items-list');
        
        // Armory Elements
        this.armoryList = document.getElementById('armory-items-list');
        this.dpTableContainer = document.getElementById('dp-table');
        this.btnCalcArmory = document.getElementById('btn-calc-armory');

        this.init();
    }

    init() {
        this.renderItemsList(GameState.greedyItems, this.greedyList, true);
        this.renderItemsList(GameState.armoryItems, this.armoryList, false);

        // Bind slider
        this.slider.addEventListener('input', (e) => {
            GameState.capacity = parseInt(e.target.value);
            this.capacityVal.textContent = GameState.capacity;
            this.updateGreedyPouch();
            // Clear DP table when capacity changes to avoid stale data
            this.dpTableContainer.innerHTML = '';
        });

        // Initialize pouch
        this.updateGreedyPouch();

        // Bind armory calculate
        this.btnCalcArmory.addEventListener('click', () => this.calculateArmory());
    }

    renderItemsList(items, container, isGreedy) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.id = `item-${item.id}`;
            
            let colorIndicator = isGreedy ? `<div style="width: 10px; height: 10px; border-radius: 50%; background: ${item.color}; margin-bottom: 5px;"></div>` : '';
            
            card.innerHTML = `
                ${colorIndicator}
                <div class="name">${item.name}</div>
                <div class="stats">W: ${item.weight} | V: ${item.value}</div>
                ${isGreedy ? `<div class="vw-ratio">Ratio: ${(item.value / item.weight).toFixed(1)}</div>` : ''}
            `;
            container.appendChild(card);
        });
    }

    updateGreedyPouch() {
        const { fractions, totalValue, weightUsed } = fractionalKnapsack(GameState.greedyItems, GameState.capacity);
        
        this.pouchBar.innerHTML = '';
        
        // Calculate width percentage based on used weight vs total capacity
        const fillPercentage = (weightUsed / GameState.capacity) * 100;
        this.pouchBar.style.width = `${fillPercentage}%`;

        fractions.forEach(f => {
            const segment = document.createElement('div');
            segment.className = 'pouch-segment';
            // Segment width is relative to the filled portion
            segment.style.width = `${(f.weightTaken / weightUsed) * 100}%`;
            segment.style.backgroundColor = f.item.color;
            
            // Add label if it's large enough
            if (f.fraction >= 0.2) {
                segment.textContent = `${(f.fraction * 100).toFixed(0)}%`;
            }
            
            this.pouchBar.appendChild(segment);
        });
    }

    calculateArmory() {
        const items = GameState.armoryItems;
        const capacity = GameState.capacity;
        
        const { maxValue, dpTable, selectedIndices } = zeroOneKnapsack(items, capacity);
        
        this.renderDpTable(dpTable, capacity, items, selectedIndices);
    }

    renderDpTable(dp, capacity, items, selectedIndices) {
        this.dpTableContainer.innerHTML = '';
        
        // +1 for headers
        this.dpTableContainer.style.gridTemplateColumns = `repeat(${capacity + 2}, 40px)`;
        
        // Header Row (Capacities)
        this.createCell('', 'header');
        for (let w = 0; w <= capacity; w++) {
            this.createCell(`W${w}`, 'header');
        }

        // DP Body
        let delay = 0;
        for (let i = 0; i <= items.length; i++) {
            // Row Header
            const rowLabel = i === 0 ? '0' : items[i-1].name.substring(0, 3);
            this.createCell(rowLabel, 'header');

            for (let w = 0; w <= capacity; w++) {
                const cell = this.createCell(dp[i][w], '');
                
                // Fade in animation
                setTimeout(() => {
                    cell.classList.add('visible');
                }, delay);
                delay += 10; // 10ms per cell

                // Highlight final answer
                if (i === items.length && w === capacity) {
                    cell.classList.add('final-answer');
                    cell.addEventListener('mouseenter', () => this.highlightSelectedItems(selectedIndices));
                    cell.addEventListener('mouseleave', () => this.clearHighlights());
                }
            }
        }
    }

    createCell(content, className) {
        const div = document.createElement('div');
        div.className = `dp-cell ${className}`;
        div.textContent = content;
        this.dpTableContainer.appendChild(div);
        return div;
    }

    highlightSelectedItems(indices) {
        indices.forEach(idx => {
            const item = GameState.armoryItems[idx];
            const card = document.getElementById(`item-${item.id}`);
            if (card) card.classList.add('highlight');
        });
    }

    clearHighlights() {
        GameState.armoryItems.forEach(item => {
            const card = document.getElementById(`item-${item.id}`);
            if (card) card.classList.remove('highlight');
        });
    }
}
