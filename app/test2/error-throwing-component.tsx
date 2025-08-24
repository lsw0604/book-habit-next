'use client';

export default function ErrorThrowingComponent() {
  throw new Error('I am an intentional error!');
  return <p>This should not be rendered.</p>;
}
