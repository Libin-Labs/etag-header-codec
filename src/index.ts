export interface EntityTag {
  readonly weak: boolean;
  readonly value: string;
}
export function parseEtags(header: string): EntityTag[] | '*' {
  if (typeof header !== 'string') throw new TypeError('Expected header text');
  if (header.length > 8192) throw new RangeError('Header too long');
  const text = header.trim();
  if (text === '*') return '*';
  if (!text) throw new RangeError('Empty entity-tag list');
  const tags: EntityTag[] = [];
  let i = 0;
  while (i < text.length) {
    while (text[i] === ' ' || text[i] === '\t') i++;
    let weak = false;
    if (text.startsWith('W/', i)) {
      weak = true;
      i += 2;
    }
    if (text[i] !== '"') throw new RangeError('Expected quoted entity tag');
    i++;
    let value = '';
    while (i < text.length && text[i] !== '"') {
      const code = text.charCodeAt(i);
      if (code < 0x21 || code === 0x7f) throw new RangeError('Invalid entity-tag character');
      value += text[i++]!;
    }
    if (text[i++] !== '"') throw new RangeError('Unterminated entity tag');
    tags.push({ weak, value });
    while (text[i] === ' ' || text[i] === '\t') i++;
    if (i === text.length) break;
    if (text[i++] !== ',') throw new RangeError('Expected comma');
    if (i === text.length) throw new RangeError('Trailing comma');
  }
  return tags;
}
