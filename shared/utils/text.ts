export const truncateText = (text?: string, maxLength = 70): string => {
  if (!text) {
    return '';
  }

  const newlineIndex = text.indexOf('\n');

  if (newlineIndex !== -1) {
    const firstLine = text.substring(0, newlineIndex);
    if (firstLine.length > maxLength) {
      return `${firstLine.substring(0, maxLength)}...`;
    }
    if (text.length > firstLine.length) {
      return `${firstLine}...`;
    }
    return firstLine;
  }

  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }

  return text;
};
