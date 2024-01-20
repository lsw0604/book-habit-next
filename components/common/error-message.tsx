'use client';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="ml-0.5 text-red-300 mt-0.5 text-sm font-bold">{message}</p>
  );
}
