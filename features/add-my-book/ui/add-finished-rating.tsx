import { Rating } from "@/shared/ui/rating";

interface AddFinishedRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

export function AddFinishedRating({ rating, onChange }: AddFinishedRatingProps) {
  return (
    <div className="w-full p-4 rounded-xl border transition-all">
      <div className="flex justify-center">
        <Rating rating={rating} onChange={onChange} />
      </div>
    </div>
  )
}