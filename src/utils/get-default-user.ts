export const getDefaultUser = (id: string) => ({
  defaultName: `user ${id.slice(0, 6)}`,
  defaultImage: `https://honghong.me/api/avatar/${id}`
})
