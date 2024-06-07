class NetworkViz {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;
        this.errors=[0.99, 0.80,0.70, 0.5,0.3,0.09,0.02,0.007]
    }

    init() {
        const canvas = this.$refs.networkCanvas;
        const ctx = canvas.getContext("2d");

        // Define positions for nodes
        const inputPositions = this.getNodePositions(50, 50, this.inputNodes);
        const hiddenPositions = this.getNodePositions(200, 30, this.hiddenNodes);
        const outputPositions = this.getNodePositions(350, 90, this.outputNodes);

        // Draw nodes
        this.drawNodes(ctx, inputPositions);
        this.drawNodes(ctx, hiddenPositions);
        this.drawNodes(ctx, outputPositions);

        // Draw connections
        this.drawConnections(ctx, inputPositions, hiddenPositions);
        this.drawConnections(ctx, hiddenPositions, outputPositions);

        this.drawErrorCurve()
    }

    getNodePositions(startX, startY, count) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push({ x: startX, y: startY + (i * 50) });
        }
        return positions;
    }

    drawNodes(ctx, positions) {
        positions.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = "lightblue";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        });
    }

    drawConnections(ctx, fromPositions, toPositions) {
        toPositions.forEach(toNode => {
            fromPositions.forEach(fromNode => {
                ctx.beginPath();
                ctx.moveTo(fromNode.x + 20, fromNode.y);
                ctx.lineTo(toNode.x - 20, toNode.y);
                ctx.strokeStyle = "gray";
                ctx.stroke();
                ctx.closePath();
            });
        });
    }

    drawErrorCurve() {
        const errorCanvas = this.$refs.errorCanvas;
        const errorCtx = errorCanvas.getContext("2d");
        const errors = this.errors
       
        // Clear the error canvas
        errorCtx.clearRect(0, 0, errorCanvas.width, errorCanvas.height);

        // Set the styles for the error curve
        errorCtx.strokeStyle = "blue";
        errorCtx.lineWidth = 2;

        // Start drawing the error curve
        errorCtx.beginPath();
        errorCtx.moveTo(0, errorCanvas.height); // Start from the bottom-left corner

        // Calculate the x and y positions for each error point
        const stepX = errorCanvas.width / (errors.length - 1);
        for (let i = 0; i < errors.length; i++) {
            const x = i * stepX;
            const y = errorCanvas.height - errors[i] * errorCanvas.height; // Invert the y-axis
            errorCtx.lineTo(x, y); // Draw a line to the error point
        }

        // Draw the error curve
        errorCtx.stroke();
        errorCtx.closePath();
    }
}