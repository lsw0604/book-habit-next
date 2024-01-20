'use client';

interface SearchItemHeaderProps {
  title: string;
  search: string;
}

export default function SearchItemHeader({
  title,
  search,
}: SearchItemHeaderProps) {
  const regExp = new RegExp(`(${search})`, 'gi');

  if (search !== '' && title.includes(search)) {
    const split_title = title.split(regExp);

    return (
      <div className="w-full text-lg leading-5 float-left text-start text-ellipsis overflow-hidden whitespace-nowrap mb-2">
        {split_title.map((word, i) =>
          regExp.test(word) ? (
            <div key={i} className="inline-flex text-cyan-400">
              {word}
            </div>
          ) : (
            word
          )
        )}
      </div>
    );
  }

  return (
    <div className="w-full text-lg leading-5 float-left text-start text-ellipsis overflow-hidden whitespace-nowrap mb-2">
      {title}
    </div>
  );
}
