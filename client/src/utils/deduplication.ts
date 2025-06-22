// Global state for tracking ongoing operations
const ongoingOperations = new Map<string, Promise<unknown>>();

/**
 * Prevents duplicate operations by returning the existing promise if the same operation is already in progress
 * @param key - Unique identifier for the operation
 * @param operation - The async operation to perform
 * @returns Promise that resolves to the operation result
 */
export const deduplicateOperation = async <T>(key: string, operation: () => Promise<T>): Promise<T> => {
  // Check if this operation is already in progress
  if (ongoingOperations.has(key)) {
    return ongoingOperations.get(key) as Promise<T>;
  }

  // Start the operation
  const promise = operation().finally(() => {
    // Clean up after completion (success or failure)
    ongoingOperations.delete(key);
  });

  // Store the promise to prevent duplicates
  ongoingOperations.set(key, promise);

  return promise;
};

/**
 * Clear a specific operation from the deduplication cache
 * @param key - The operation key to clear
 */
export const clearOperation = (key: string): void => {
  ongoingOperations.delete(key);
};

/**
 * Clear all ongoing operations (useful for cleanup)
 */
export const clearAllOperations = (): void => {
  ongoingOperations.clear();
};
