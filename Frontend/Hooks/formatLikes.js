export const formatLikedBy = (likedBy) => {
  if (likedBy.length === 0) return "no one yet";
  const names = likedBy.slice(0, 3).map((user) => user.username).join(", ");
  const others = likedBy.length > 3 ? ` and ${likedBy.length - 3} others` : "";
  return names + others;
};
