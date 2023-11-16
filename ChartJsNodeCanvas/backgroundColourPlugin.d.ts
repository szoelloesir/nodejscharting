import { Chart as ChartJS, Plugin as ChartJSPlugin } from 'chart.js';
export declare class BackgroundColourPlugin implements ChartJSPlugin {
    private readonly _fillStyle;
    readonly id: string;
    constructor(_fillStyle: string);
    beforeDraw(chart: ChartJS): boolean | void;
}
