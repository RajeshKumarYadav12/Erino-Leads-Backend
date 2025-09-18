const buildFilters = (query) => {
  const filters = {};

  // String contains
  if (query.email_contains)
    filters.email = { $regex: query.email_contains, $options: "i" };
  if (query.company_contains)
    filters.company = { $regex: query.company_contains, $options: "i" };
  if (query.city_contains)
    filters.city = { $regex: query.city_contains, $options: "i" };

  // Equals
  if (query.status) filters.status = query.status;
  if (query.source) filters.source = query.source;
  if (query.is_qualified) filters.is_qualified = query.is_qualified === "true";

  // Numbers
  if (query.score_gt)
    filters.score = { ...filters.score, $gt: Number(query.score_gt) };
  if (query.score_lt)
    filters.score = { ...filters.score, $lt: Number(query.score_lt) };
  if (query.lead_value_gt)
    filters.lead_value = {
      ...filters.lead_value,
      $gt: Number(query.lead_value_gt),
    };
  if (query.lead_value_lt)
    filters.lead_value = {
      ...filters.lead_value,
      $lt: Number(query.lead_value_lt),
    };

  // Dates
  if (query.created_after)
    filters.created_at = {
      ...filters.created_at,
      $gte: new Date(query.created_after),
    };
  if (query.created_before)
    filters.created_at = {
      ...filters.created_at,
      $lte: new Date(query.created_before),
    };
  if (query.last_activity_after)
    filters.last_activity_at = {
      ...filters.last_activity_at,
      $gte: new Date(query.last_activity_after),
    };
  if (query.last_activity_before)
    filters.last_activity_at = {
      ...filters.last_activity_at,
      $lte: new Date(query.last_activity_before),
    };

  return filters;
};

export default buildFilters;
