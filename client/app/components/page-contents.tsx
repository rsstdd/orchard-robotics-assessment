"use client";

import cn from "classnames";
import { ChangeEvent, useState } from "react";

import Slider from "@mui/material-next/Slider";
import {
  Button,
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  NumberInput,
  Text
} from "@tremor/react";

import { calculateDayDelta } from "../util";
import Histogram, {
  GrowthPredictionData,
  GrowthPredictionDataResponse,
} from "./histogram";
import Intro from "./intro";

const FRUIT_DIAMETER_MIN = 20;
const FRUIT_DIAMETER_MAX = 120;

const PageContent = () => {
  let d = new Date();
  d.setMonth(d.getMonth() - 3);
  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerValue>();
  const [fruitDiameter, setFruitDiameter] = useState<number[]>([FRUIT_DIAMETER_MIN, FRUIT_DIAMETER_MAX])
  const [fruitGrowthRate, setFruitGrowthRate] = useState<number>(1)
  const [histogramData, setHistogramData] = useState<GrowthPredictionData>()
  const [calendarError, setCalendarError] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(false)
  const [didFetch, setDidFetch] = useState(false)

  const handleSetDateRangeValue = ({ from, to }: DateRangePickerValue) => {
    setCalendarError(false)
    setDateRangeValue({ from, to })
  }

  const handleChangeGrowthRateSlider = (
    _e: ChangeEvent<HTMLInputElement>,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < FRUIT_DIAMETER_MIN) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - FRUIT_DIAMETER_MIN);
        setFruitDiameter([clamped, clamped + FRUIT_DIAMETER_MIN]);
      } else {
        const clamped = Math.max(newValue[1], FRUIT_DIAMETER_MIN);
        setFruitDiameter([clamped - FRUIT_DIAMETER_MIN, clamped]);
      }
    } else {
      setFruitDiameter(newValue as number[]);
    }
  };

  const handleSetFruitDiameterMin = (e: ChangeEvent<HTMLInputElement>) => {
    const [, max] = fruitDiameter;
    const min = parseFloat(e.target.value) ?? FRUIT_DIAMETER_MIN
    setFruitDiameter([min, max])
  }

  const handleSetFruitDiameterMax = (e: ChangeEvent<HTMLInputElement>) => {
    const [min] = fruitDiameter;
    const max = parseFloat(e.target.value) ?? FRUIT_DIAMETER_MAX
    setFruitDiameter([min, max])
  }

  const handleSetFruitGrowthRate = (e: ChangeEvent<HTMLInputElement>) => {
    setFruitGrowthRate(parseFloat(e.target.value) ?? 0)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      setError(false)

      if (!dateRangeValue?.from && !dateRangeValue?.to) {
        setCalendarError(true)
        console.error('Date range is not defined.');
        return;
      }

      setIsFetching(true)
      setDidFetch(true)

      const { from = new Date(), to = new Date() } = dateRangeValue
      const delta = `delta=${calculateDayDelta(from, to)}`;
      const growth = `growth=${fruitGrowthRate}`;
      const diameter = `diameter=${fruitDiameter[0]},${fruitDiameter[1]}`;
      const qs = `?${delta}&${growth}&${diameter}`;

      const res = await fetch(`${process.env.BASE_URL}/api/scans${qs}`)

      if (!res.ok) {
        throw new Error(`Failed to fetch. Status: ${res}`);
      }
      const { data = [] } = await res.json();
      const transformedToArrays = data?.map(({ location, volume }: GrowthPredictionDataResponse) => [location, volume]);
      setHistogramData(transformedToArrays);
      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      setError(true)
      console.error('Error:', (error) as Error);
    }
  };

  return (
    <>
      <Intro />
      <Card className="mt-8">
        <Text className="">Scan Date - Harvest Date</Text>
        <DateRangePicker
          className="mt-2"
          onValueChange={handleSetDateRangeValue}
          placeholder="Scan - Harvest Dates"
          selectPlaceholder="Quick Select"
          value={dateRangeValue}
          color={'red'}
        />
        <Text className={cn('text-red-900', { 'invisible': !calendarError })}>
          Date Range is Required
        </Text>

        <Text className="mt-4">
          Predicted fruit growth rate in cubic millimeters per day
        </Text>
        <NumberInput
          error={false}
          placeholder="Enter Growth Rate"
          className="mt-2"
          onChange={handleSetFruitGrowthRate}
          value={fruitGrowthRate}
          step={10}
          min={1}
          max={10000}
        />

        <Text className="mt-8">
          Range of fruit diameter to include in growth prediction
        </Text>
        <Flex className="flex-col md:flex-row mt-2">
          <NumberInput
            error={false}
            placeholder="Min Diameter"
            value={fruitDiameter[0]}
            min={0}
            max={120}
            onChange={handleSetFruitDiameterMin}
          />
          <Slider
            aria-labelledby="input-slider-min-to-max-fruit-growth-rate"
            className="ml-8 mr-8"
            disableSwap
            getAriaLabel={() => 'Minimum to Maximum Fruit Growth Rate'}
            max={FRUIT_DIAMETER_MAX}
            min={FRUIT_DIAMETER_MIN}
            onChangeCommitted={handleChangeGrowthRateSlider}
            value={fruitDiameter}
            valueLabelDisplay="auto"
          />
          <NumberInput
            value={fruitDiameter[1]}
            placeholder="Max Diameter"
            error={false}
            min={0}
            max={120}
            onChange={handleSetFruitDiameterMax}
          />
        </Flex>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={handleSubmit}
          disabled={isFetching || calendarError}
        >
          Submit
        </Button>
      </Card >
      {error ? (
        <Card className="mt-8">
          <Text className="text-red-900 center">
            There was an error processing your request. Please try again later.
          </Text>
        </Card>
      ) : <Histogram growthPredictionData={histogramData} isFetching={isFetching} didFetch={didFetch} />}
    </>
  );
}

export default PageContent
