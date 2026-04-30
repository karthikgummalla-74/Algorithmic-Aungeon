import { minPathSum } from './Algorithms.js';

export class DungeonRenderer {
    constructor() {
        this.gridElement = document.getElementById('dungeon-grid');
        this.canvas = document.getElementById('dungeon-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resultText = document.getElementById('dungeon-result');
        this.grid = [];
        this.rows = 6;
        this.cols = 6;
        this.cellSize = 64; // 60px cell + 4px gap
        this.animationFrameId = null;

        this.init();
    }

    init() {
        this.generateGrid();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        document.getElementById('btn-run-dungeon').addEventListener('click', () => this.runAlgorithm());
        document.getElementById('btn-reset-dungeon').addEventListener('click', () => {
            this.generateGrid();
            this.clearCanvas();
            this.resultText.textContent = '';
        });
    }

    generateGrid() {
        this.gridElement.innerHTML = '';
        this.grid = [];

        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                const cost = Math.floor(Math.random() * 9) + 1; // 1 to 9
                row.push(cost);

                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = cost;
                cell.setAttribute('data-tooltip', `(${i}, ${j}) Cost: ${cost}`);
                
                // Styling start/end distinctively
                if (i === 0 && j === 0) {
                    cell.style.border = '2px solid var(--neon-green)';
                } else if (i === this.rows - 1 && j === this.cols - 1) {
                    cell.style.border = '2px solid var(--gold)';
                }

                this.gridElement.appendChild(cell);
            }
            this.grid.push(row);
        }
    }

    resizeCanvas() {
        // Match canvas strictly to grid dimensions
        const rect = this.gridElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    clearCanvas() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    runAlgorithm() {
        this.clearCanvas();
        const { minCost, path } = minPathSum(this.grid);
        
        this.resultText.textContent = `Minimum Stamina Cost: ${minCost}`;

        // Animate the path
        this.animatePath(path);
    }

    animatePath(path) {
        let index = 0;
        let progress = 0;
        const duration = 30; // frames per segment

        const draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = '#39ff14'; // Neon green
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#39ff14';
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';

            this.ctx.beginPath();
            
            for (let i = 0; i < index; i++) {
                const [r, c] = path[i];
                const x = c * this.cellSize + (this.cellSize / 2) - 2; // -2 for gap approx
                const y = r * this.cellSize + (this.cellSize / 2) - 2;
                
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }

            if (index < path.length - 1) {
                const [r1, c1] = path[index];
                const [r2, c2] = path[index + 1];
                
                const x1 = c1 * this.cellSize + (this.cellSize / 2) - 2;
                const y1 = r1 * this.cellSize + (this.cellSize / 2) - 2;
                const x2 = c2 * this.cellSize + (this.cellSize / 2) - 2;
                const y2 = r2 * this.cellSize + (this.cellSize / 2) - 2;

                const currX = x1 + (x2 - x1) * (progress / duration);
                const currY = y1 + (y2 - y1) * (progress / duration);

                if (index === 0) this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(currX, currY);

                progress++;
                if (progress > duration) {
                    progress = 0;
                    index++;
                }
            } else {
                // Done animating, ensure last point is drawn
                const [r, c] = path[path.length - 1];
                const x = c * this.cellSize + (this.cellSize / 2) - 2;
                const y = r * this.cellSize + (this.cellSize / 2) - 2;
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                return; // Stop loop
            }

            this.ctx.stroke();
            this.animationFrameId = requestAnimationFrame(draw);
        };

        this.animationFrameId = requestAnimationFrame(draw);
    }
}
