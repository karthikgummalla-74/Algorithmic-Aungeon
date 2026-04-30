export const minPathSum = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    
    const dp = Array(rows).fill(null).map(() => Array(cols).fill(0));
    const parent = Array(rows).fill(null).map(() => Array(cols).fill(null));

    dp[0][0] = grid[0][0];

    // First row
    for (let j = 1; j < cols; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
        parent[0][j] = [0, j - 1];
    }

    // First col
    for (let i = 1; i < rows; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
        parent[i][0] = [i - 1, 0];
    }

    // Rest of the grid
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (dp[i - 1][j] < dp[i][j - 1]) {
                dp[i][j] = dp[i - 1][j] + grid[i][j];
                parent[i][j] = [i - 1, j];
            } else {
                dp[i][j] = dp[i][j - 1] + grid[i][j];
                parent[i][j] = [i, j - 1];
            }
        }
    }

    // Backtrack path
    const path = [];
    let curr = [rows - 1, cols - 1];
    while (curr) {
        path.unshift(curr);
        curr = parent[curr[0]][curr[1]];
    }

    return { minCost: dp[rows - 1][cols - 1], path };
};

export const fractionalKnapsack = (items, capacity) => {
    const sorted = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let currentWeight = 0;
    let totalValue = 0;
    const fractions = [];

    for (let item of sorted) {
        if (currentWeight + item.weight <= capacity) {
            currentWeight += item.weight;
            totalValue += item.value;
            fractions.push({ item, fraction: 1, weightTaken: item.weight });
        } else {
            const remain = capacity - currentWeight;
            if (remain > 0) {
                totalValue += item.value * (remain / item.weight);
                fractions.push({ item, fraction: remain / item.weight, weightTaken: remain });
                currentWeight += remain;
            }
            break;
        }
    }

    return { totalValue, fractions, weightUsed: currentWeight };
};

export const zeroOneKnapsack = (items, capacity) => {
    const n = items.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            const item = items[i - 1];
            if (item.weight <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - item.weight] + item.value
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Find selected items
    const selectedIndices = [];
    let w = capacity;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedIndices.push(i - 1);
            w -= items[i - 1].weight;
        }
    }

    return { maxValue: dp[n][capacity], dpTable: dp, selectedIndices };
};
