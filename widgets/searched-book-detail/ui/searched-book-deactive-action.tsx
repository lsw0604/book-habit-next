import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

interface SearchedBookDeactiveActionsProps {
  isbn: string;
}

export function SearchedBookDeactiveActions({ isbn }: SearchedBookDeactiveActionsProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 gap-3 text-center w-full">
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          독서 기록을 남기고 관리하려면<br />로그인이 필요합니다.
        </p>
        <Button
          type="button" 
          size="sm" 
          onClick={() => router.push(`/login?redirectTo=/book/${isbn}`)}
          className="font-semibold"
        >
          로그인하러 가기
        </Button>
      </div>
  )
}