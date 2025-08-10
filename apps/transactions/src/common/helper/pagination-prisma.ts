export function pagination_prisma(
  limit,
  page,
): {} | { skip: number; take: number } {
  if (!limit || !page) return {};
  return {
    skip: (page - 1) * limit || 0,
    take: Number(limit),
  };
}
