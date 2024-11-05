import Tag from '@/components/common/tag';
import { cn } from '@/utils/class-name';
import MyBookTag from './my-book-tag';
import useMyBookInfo from '@/hooks/my-book/useMyBookInfo';
import MyBookTagForm from './my-book-tag-form';
import MyBookTagButtons from './my-book-tag-buttons';
import MyBookTagToggle from './my-book-tag-toggle';

interface MyBookInfoTagProps {
  data: Pick<ResponseGetMyBookDetail, 'book' | 'tag'>;
}

export default function MyBookInfoTag({ data }: MyBookInfoTagProps) {
  const { book, tag } = data;
  const { authors, publisher, translators, isbn } = book;

  const { openTag, handlers, navigateToTagSearch, editTag, openForm } =
    useMyBookInfo();

  return (
    <>
      <div className="relative flex my-2">
        <div
          className={cn(
            'relative flex overflow-hidden',
            openTag ? 'flex-wrap' : 'flex-nowrap'
          )}
        >
          {authors.map((author) => (
            <div className="py-1 pr-2" key={author.name}>
              <Tag
                className="whitespace-nowrap"
                onClick={() => navigateToTagSearch(author.name, 'person')}
              >
                <span className="font-bold">지은이</span> {author.name}
              </Tag>
            </div>
          ))}
          <div className="py-1 pr-2" key={publisher}>
            <Tag
              key={publisher}
              className="whitespace-nowrap"
              onClick={() => navigateToTagSearch(publisher, 'publisher')}
            >
              <span className="font-bold">출판사</span> {publisher}
            </Tag>
          </div>
          {translators.map((translator) => (
            <div className="py-1 pr-2" key={translator.name}>
              <Tag className="whitespace-nowrap">
                <span className="font-bold">번역가</span> {translator.name}
              </Tag>
            </div>
          ))}
          {isbn.map((isbn) => (
            <div className="py-1 pr-2" key={isbn}>
              <Tag
                key={isbn}
                className="whitespace-nowrap"
                onClick={() => navigateToTagSearch(isbn, 'isbn')}
              >
                <span className="font-bold">ISBN</span> {isbn}
              </Tag>
            </div>
          ))}
          {tag.map((tag) => (
            <MyBookTag tagProps={tag} key={tag.myBookTagId} editTag={editTag} />
          ))}
          <MyBookTagButtons tags={tag} handlers={handlers} />
        </div>
        <MyBookTagToggle
          openTag={openTag}
          openTagHandler={handlers.openTagHandler}
        />
      </div>
      {openForm && <MyBookTagForm />}
    </>
  );
}
