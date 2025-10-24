import { Button } from '@/shared/ui/button';

interface MyBookReviewDetailEmptyProps {
  onClick: () => void;
}

export function MyBookReviewDetailEmpty({
  onClick,
}: MyBookReviewDetailEmptyProps) {
  return (
    <div className="pt-7 pb-8 border rounded-lg shadow-lg">
      <div className="px-8">
        <h5 className="text-center mb-4">
          이 작품에 대한 평가를 글로 남겨보세요.
        </h5>
        <div className="mx-16">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClick}
          >
            한줄평 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
