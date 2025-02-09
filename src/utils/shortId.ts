import ShortUniqueId from 'short-unique-id';

export const { randomUUID } = new ShortUniqueId({
  length: 10,
  dictionary: 'alphanum_upper',
});
