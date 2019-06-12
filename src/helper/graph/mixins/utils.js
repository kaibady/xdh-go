export function nodeCanDelete(data) {
  let canDel = false;
  if (!['solid', 'dashed', 'mainCase', 'other', 'custom'].includes(data.category)) {
    canDel = true
  }
  return canDel
}
export function linkCanDelete(data) {
  let canDel = false;
  if (['custom'].includes(data.category)) {
    canDel = true
  }
  return canDel;
}
