import { ErrorMessage } from "@/shared/ui/error-message";
import { LabelledSwitch } from "@/shared/ui/labelled-switch";
import { Controller, useFormContext } from "react-hook-form";
import { AddMyBookReviewType } from "../../schema";

export function AddMyBookReviewControllerIsPublic() {
  const { control } = useFormContext<AddMyBookReviewType>();

  return (
    <Controller
      name="isPublic"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <LabelledSwitch
            label="한줄평 공개하기"
            description="체크 시 다른 사람들에게도 나의 한줄평을 공개합니다."
            checked={value}
            onCheckedChange={onChange}
            className="border-none p-0"
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
      )}
    />
  )
}