interface MyBookTagProps {
  myBookId: number;
  tags: MyBookTagType[];
}

export default function MyBookTag({ myBookId, tags }: MyBookTagProps) {
  return (
    <>
      {tags.map((tag) => (
        <div key={tag.id}>{tag.tag}</div>
      ))}
    </>
  );
}
