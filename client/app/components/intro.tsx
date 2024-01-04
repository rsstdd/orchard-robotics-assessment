'use client'

import {
  Bold,
  Subtitle,
  Text,
  Title
} from '@tremor/react'

const Intro = () => (
  <section>
    <Title>Growth Rate Estimation</Title>
    <Subtitle>
      Given a range of dates and an estimated growth rate, this tool
      calculates the expected volume of fruit.
    </Subtitle>

    <Text className="mt-4">
      <Bold>1.</Bold> Select a <Bold>“scan date”</Bold> and a
      <Bold>“harvest date”</Bold> using the calendar date selector component.
      The scan date indicates when the fruit scan was performed, and the
      harvest date indicates the date for which the harvest size should be
      predicted.
    </Text>

    <Text className="mt-4">
      <Bold>2.</Bold> Select a <Bold>“fruit growth rate”</Bold>, represented
      as cubic millimeters per day, that indicates the daily fruit growth
      rate.
    </Text>


    <Text className="mt-4">
      <Bold>3.</Bold> Select a <Bold>minimum and a maximum fruit diameter</Bold>,
      represented as cubic millimeters per day, to define the range of fruit
      sizes to include in the model. The default minimum diameter is 20mm, and
      the maximum is 120mm. For example, if the scan date is 10/01 and the
      harvest date is 10/11, there is a 10-day difference between the scan and
      harvest dates. This means that all the fruit grew for 10 days at the
      specified growth rate.
    </Text>

    <Text className="mt-4">
      For example, if the scan date is 10/01, and the harvest date is 10/11,
      there is a 10 day delta between scan and harvest. This means that all
      of the fruit grew for a total of 10 days, and at the rate specified.
    </Text>

    <Text className="mt-4">
      If the user specifies a growth rate of 1000 mm^3/day, each volume is
      expected to increase by 1000 cubic millimeters daily. So, for
      a 10-day difference, each fruit would increase in volume by 10,000 cubic
      millimeters to reach its final predicted volume at harvest time.
    </Text>
  </section>
)

export default Intro
