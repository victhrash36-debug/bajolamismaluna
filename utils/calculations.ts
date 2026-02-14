
/**
 * Calculates the number of full lunar cycles (synodic months) between two dates.
 * A synodic month is approximately 29.53059 days.
 */
export const calculateLunas = (startDate: Date, endDate: Date = new Date()): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const lunarMonth = 29.53059;
  return Math.floor(diffDays / lunarMonth);
};

export const START_DATE = new Date('2019-09-08');
