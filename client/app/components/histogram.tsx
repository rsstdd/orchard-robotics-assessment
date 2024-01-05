'use client';

import { Card, Text } from '@tremor/react';
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
    ? ''
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

  console.log(noResultsMsgStr.length)

  return (
    <section>
      {didFetch && growthPredictionData?.length > 0 ? (
        <Card className="mt-8 flex items-center justify-center">
          <Text>The query did not produce any results</Text>
        </Card>
      ) : null}
      {isFetching ? (
        <Card className="mt-8 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent" />
        </Card>
      ) : (
        growthPredictionData.length > 0 ? (
          <Card className="mt-8 flex items-center justify-center">
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
          </Card>
        ) : null)}
    </section >
  );
};

export default Histogram;
