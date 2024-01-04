import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import Nav from './components/nav';

export const metadata = {
  title: 'Ross Todd | Orchard Robotics Take Home Challenge',
  description:
    `Growth Rate Estimation | Given a range of dates and an estimated growth
    rate, this tool calculates the expected volume of fruit.`
};

const RootLayout = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <html lang="en" className="h-full bg-gray-50" suppressHydrationWarning={true}>
    <body className="h-full">
      <Suspense>
        <Nav />
      </Suspense>
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout
