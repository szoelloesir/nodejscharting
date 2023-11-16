const { Chart } = require('chart.js');
const annotationPlugin = require('chartjs-plugin-annotation');
const { ChartJSNodeCanvas } = require('./ChartJsNodeCanvas');
const express = require('express')
const app = express()
const port = 3000;

const canvases = {};

Chart.register(annotationPlugin);

app.post('/', (req, res) => {
    try{
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                res.statusCode = 200;
                var config = JSON.parse(body);
                res.setHeader('Content-Type', config.general.options.mime);
                res.end(await RenderChart(config));
            } catch (exception) {
                console.log(exception)
                res.status(500).json({
                    status: 500,
                    message: exception.message || 'Internal Server Error',
                });
            }
        });
    } catch(exception){
        console.log(exception)
        res.status(500).json({
            status: 500,
            message: exception.message || 'Internal Server Error',
        })
    }
});

async function RenderChart(config) {
    const canvas = {
        type: config.general.options.type,
        width: config.general.size.width,
        height: config.general.size.height,
        backgroundColour: config.general.options.backgroundColor
    };

    const canvasKey = JSON.stringify(canvas);

    if (!canvases[canvasKey]) {
        canvases[canvasKey] = new ChartJSNodeCanvas(canvas);
    }

    return canvases[canvasKey].renderToBufferSync(config.config, config.general.options.mime);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
