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
  isFetching?: boolean;
  didFetch?: boolean;
}

const Histogram = ({ growthPredictionData = [], isFetching = false, didFetch = false }: GrowthPredictionProps) => {
  // Event listeners on graph slow page. Will kill page with enough data
  const noResultsMsgStr = didFetch && growthPredictionData?.length > 0
    ? 'The query did not produce any results'
    : ''
  const isLargeData = growthPredictionData.length > 50000;
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
      <Card className="mt-8 flex items-center justify-center">
        {isFetching ? (
          <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent" />
        ) : (
          growthPredictionData.length > 0 ? (
            <Chart
              chartType="Histogram"
              data={growthPredictionDataWithTitle}
              height="400px"
              width="100%"
              options={{
                async: true,
                legend: { position: 'bottom', maxLines: 2 },
                title: 'Fruit Size Distribution, in millimeters',
                ...(isLargeData && smallDataOnlyOptions),
              }}
            />
          ) : (
            <p>{noResultsMsgStr}</p>
          )
        )}
      </Card>
    </section>
  );
};

export default Histogram;
