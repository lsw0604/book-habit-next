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
        <div className="py-1 pr-2" key={author.id}>
          <Tag
            key={author.id}
            className="whitespace-nowrap"
            onClick={() => navigationToTagSearch(author.name, 'person')}
          >
            <span className="font-bold">지은이</span> {author.name}
          </Tag>
        </div>
      ))}
      <div className="py-1 pr-2" key={publisher}>
        <Tag
          key={publisher}
          className="whitespace-nowrap"
          onClick={() => navigationToTagSearch(publisher, 'publisher')}
        >
          <span className="font-bold">출판사</span> {publisher}
        </Tag>
      </div>
      {translators.map((translator) => (
        <div className="py-1 pr-2" key={translator.id}>
          <Tag className="whitespace-nowrap" key={translator.id}>
            <span className="font-bold">번역가</span> {translator.name}
          </Tag>
        </div>
      ))}
      {isbn.map((isbn) => (
        <div className="py-1 pr-2" key={isbn}>
          <Tag
            key={isbn}
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
