import Tag from '@/components/common/tag';

interface MyBookTagControllerProps {
  tags: MyBookTagType[];
  handlers: {
    openContentHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    openTagHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    editTagHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
    openFormHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
}

export default function MyBookTagController({
  tags,
  handlers,
}: MyBookTagControllerProps) {
  return (
    <>
      {tags.length > 0 ? (
        <div className="py-1 pr-2">
          <Tag
            role="button"
            key="remove-tag"
            className="whitespace-nowrap cursor-pointer"
            onClick={handlers.editTagHandler}
          >
            <span className="font-bold">태그 삭제</span>
          </Tag>
        </div>
      ) : null}
      <div className="py-1 pr-2">
        <Tag
          role="register-tag"
          key="re-delete"
          className="whitespace-nowrap cursor-pointer"
          onClick={handlers.openFormHandler}
        >
          <span className="font-bold">태그 등록</span>
        </Tag>
      </div>
    </>
  );
}
