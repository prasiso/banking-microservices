export const pagination_helper = (
  page: any,
  limit: any,
  count: any,
  data: any,
) => {
  return {
    pagination: {
      page: page ? Number(page) : 1,
      lastPage: limit ? Math.ceil(count / limit) : 1,
      totalQuantity: count,
    },
    count: count,
    rows: data,
  };
};
