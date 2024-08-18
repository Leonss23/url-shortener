export async function attempt<T>(callback: () => T) {
  try {
    const result = await callback()
    return { result }
  } catch (error) {
    return { error }
  }
}
