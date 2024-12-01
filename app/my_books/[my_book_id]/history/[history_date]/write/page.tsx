export default function MyBookHistoryWritePage({
  params,
}: {
  params: {
    history_date: string;
  };
}) {
  return <div>{params.history_date}Write</div>;
}
