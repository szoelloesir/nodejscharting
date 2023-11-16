"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundColourPlugin = void 0;
class BackgroundColourPlugin {
    constructor(_fillStyle) {
        this._fillStyle = _fillStyle;
        this.id = 'chartjs-plugin-chartjs-node-canvas-background-colour';
    }
    beforeDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = this._fillStyle || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
}
exports.BackgroundColourPlugin = BackgroundColourPlugin;
//# sourceMappingURL=backgroundColourPlugin.js.map