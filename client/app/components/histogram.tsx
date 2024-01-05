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
  // Event listeners on graph slow page. Will kill page with enough data
  const isHoverEnabled = growthPredictionData.length > 500;
  const growthPredictionDataWithTitle: GrowthPredictionData = [
    ['lat / lng', 'volume'],
    ...growthPredictionData,
  ];

  const smallDataOnlyOptions = {
    enableInteractivity: false,
    tooltip: { trigger: 'none' },
  }

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
              async: true,
              legend: { position: 'bottom', maxLines: 2 },
              title: 'Fruit Size Distribution, in millimeters',
              vAxis: { scaleType: 'mirrorLog' },
              ...(isHoverEnabled && smallDataOnlyOptions)
            }}
          />
        </Card>
      )}
    </section>
  );
};

export default Histogram;
