import { Controller, useFormContext } from "react-hook-form";
import { AddMyBookReviewType } from "../../schema";
import { AutoSizeTextarea } from "@/shared/ui/textarea";

export function AddMyBookReviewControllerReview() {
  const { control } = useFormContext<AddMyBookReviewType>();
  return <Controller
        control={control}
        name="review"
        render={({ field, fieldState: { error } }) => (
          <AutoSizeTextarea
            id="review"
            placeholder="한줄평을 입력하세요..."
            minHeight={160}
            isError={!!error?.message}
            errorMessage={error?.message}
            {...field}
          />
        )}
      />
}