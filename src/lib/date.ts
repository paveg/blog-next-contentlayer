import 'date-fns';

export const formatDate = (date: string, locale = 'ja-JP') => {
  const row = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return row;
};
