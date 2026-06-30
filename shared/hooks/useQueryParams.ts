import { useSearchParams } from "next/navigation";
import { z } from "zod";

export const useQueryParams = <T extends z.ZodType>(schema: T): z.infer<T> => {
  const searchParams = useSearchParams();
  return schema.parse(Object.fromEntries(searchParams.entries()));
};