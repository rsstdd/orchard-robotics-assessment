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

const Histogram = ({ growthPredictionData = [] }: GrowthPredictionProps) => {
  const growthPredictionDataWithTitle: GrowthPredictionData = [
    ['lat / lng', 'volume'],
    ...growthPredictionData,
  ];

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
          />
        </Card>
      )}
    </section>
  );
};

export default Histogram;
