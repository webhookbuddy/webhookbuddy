export const distinct = (ids: string[]) =>
  ids.filter(
    // only unique values
    (element, index, array) => array.indexOf(element) === index,
  );

export const sort = (ids: string[]) =>
  ids.sort((a, b) => {
    const an = parseInt(a, 10);
    const bn = parseInt(b, 10);

    if (isNaN(an)) return 1;
    if (isNaN(bn)) return -1;

    return bn - an;
  });

export const sortDistinct = (ids: string[]) => sort(distinct(ids));
