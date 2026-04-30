export const GameState = {
    capacity: 15, // Shared capacity for both knapsack problems
    
    // Items for Fractional Knapsack (Greedy)
    greedyItems: [
        { id: 'g1', name: 'Gold Dust', weight: 4, value: 20, color: '#ffd700' },
        { id: 'g2', name: 'Silver Dust', weight: 6, value: 18, color: '#c0c0c0' },
        { id: 'g3', name: 'Bronze Dust', weight: 5, value: 10, color: '#cd7f32' },
        { id: 'g4', name: 'Gem Shards', weight: 2, value: 14, color: '#00ffff' }
    ],
    
    // Items for 0/1 Knapsack (DP)
    armoryItems: [
        { id: 'a1', name: 'Excalibur', weight: 10, value: 60 },
        { id: 'a2', name: 'Helm of Awe', weight: 4, value: 20 },
        { id: 'a3', name: 'Dragon Shield', weight: 6, value: 30 },
        { id: 'a4', name: 'Health Potion', weight: 2, value: 10 },
        { id: 'a5', name: 'Magic Ring', weight: 1, value: 15 }
    ]
};
