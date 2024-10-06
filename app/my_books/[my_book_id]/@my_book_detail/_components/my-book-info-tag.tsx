import Tag from '@/components/common/tag';

interface MyBookInfoTagProps {
  book: Pick<
    MyBookDetailType,
    'authors' | 'publisher' | 'translators' | 'isbn'
  >;
  navigationToTagSearch: (
    tag: string,
    type: 'person' | 'publisher' | 'isbn'
  ) => void;
}

export default function MyBookInfoTag({
  book,
  navigationToTagSearch,
}: MyBookInfoTagProps) {
  const { authors, publisher, translators, isbn } = book;
  return (
    <>
      {authors.map((author) => (
        <div className="py-1 pr-2" key={author}>
          <Tag
            className="whitespace-nowrap"
            key={author}
            onClick={() => navigationToTagSearch(author, 'person')}
          >
            <span className="font-bold">지은이</span> {author}
          </Tag>
        </div>
      ))}
      <div className="py-1 pr-2" key={publisher}>
        <Tag
          className="whitespace-nowrap"
          onClick={() => navigationToTagSearch(publisher, 'publisher')}
        >
          <span className="font-bold">출판사</span> {publisher}
        </Tag>
      </div>
      {translators.map((translator) => (
        <div className="py-1 pr-2" key={translator}>
          <Tag className="whitespace-nowrap">
            <span className="font-bold">번역가</span> {translator}
          </Tag>
        </div>
      ))}
      {isbn.map((isbn) => (
        <div className="py-1 pr-2" key={isbn}>
          <Tag
            className="whitespace-nowrap"
            onClick={() => navigationToTagSearch(isbn, 'isbn')}
          >
            <span className="font-bold">ISBN</span> {isbn}
          </Tag>
        </div>
      ))}
    </>
  );
}
