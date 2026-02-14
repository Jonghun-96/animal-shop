

export function searchHighlight(text, keyword) {

  if (!keyword) return text;

  const parts = text.split(keyword);
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index !== parts.length - 1 && (
        <span className="search-highlight">{keyword}</span>
      )}
    </span>
  ));
}