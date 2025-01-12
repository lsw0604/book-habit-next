import { Suspense } from 'react';
import GoogleMapComponent from './_components/google';

export default function MyBookHistoryWritePage({
  params,
}: {
  params: {
    history_date: string;
  };
}) {
  return (
    <div>
      {params.history_date}Write
      <GoogleMapComponent />
    </div>
  );
}
