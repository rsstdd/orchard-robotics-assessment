'use client';

import { Card } from '@tremor/react';
import { Chart } from 'react-google-charts';

export type GrowthPredictionDataResponse = {
  location: string;
  volume: string;
};

export type GrowthPredictionData = [string, string][];

type GrowthPredictionDataItem = [string, string];

interface GrowthPredictionProps {
  growthPredictionData?: GrowthPredictionDataItem[];
}

const Histogram: React.FC<GrowthPredictionProps> = ({ growthPredictionData = [] }) => {
  const growthPredictionDataWithTitle: GrowthPredictionData = [
    ['lat / lng', 'volume'],
    ...growthPredictionData,
  ];

  console.log(growthPredictionDataWithTitle, 'growthPredictionDataWithTitle')

  return (
    <section>
      {growthPredictionData && (
        <Card className="mt-8">
          <Chart
            chartType="Histogram"
            data={growthPredictionDataWithTitle}
            height="400px"
            width="100%"
            options={{
              title: 'Fruit Size Distribution, in millimeters',
              legend: { position: 'bottom', maxLines: 2 },
              vAxis: { scaleType: 'mirrorLog' },
            }}
            chartEvents={[
              {
                eventName: "ready",
                callback: ({ chartWrapper, google }) => {
                  const chart = chartWrapper.getChart();
                  google.visualization.events.addListener(chart, "onmouseover", e => {
                    const { row, column } = e;
                    console.warn("MOUSE OVER ", { row, column });
                  });
                  google.visualization.events.addListener(chart, "onmouseout", e => {
                    const { row, column } = e;
                    console.warn("MOUSE OUT ", { row, column });
                  });
                }
              }
            ]}
          />
        </Card>
      )}
    </section>
  );
};

export default Histogram;
