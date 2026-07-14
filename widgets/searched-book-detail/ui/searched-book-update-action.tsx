import { MyBookDetail } from "@/entities/my-book"

interface SearchedBookUpdateActionProps {
  data: MyBookDetail;
}

export function SearchedBookUpdateAction({ data }: SearchedBookUpdateActionProps) {

  return (
    <div>수정 및 삭제 컴포넌트</div>
  )
}