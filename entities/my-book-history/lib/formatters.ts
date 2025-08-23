export function calculatePages(startPage: number, endPage: number): number {
  return endPage - startPage + 1;
}

export function messagesPickRandom(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function pagesPerMinutes(pages: number, minutes: number): number {
  if (minutes <= 0 || pages <= 0) {
    return 0;
  }
  return pages / minutes;
}
