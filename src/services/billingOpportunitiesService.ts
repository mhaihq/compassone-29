import { BillingOpportunity } from '@/types/billingOpportunity';
import { populationTasksData } from '@/data/populationTasksData';

/**
 * Aggregates all billing opportunities from tasks across the population
 */
export const getAllBillingOpportunities = (): BillingOpportunity[] => {
  const opportunities: BillingOpportunity[] = [];
  
  populationTasksData.forEach(task => {
    if (task.billingOpportunities && task.billingOpportunities.length > 0) {
      opportunities.push(...task.billingOpportunities);
    }
  });
  
  return opportunities;
};

/**
 * Calculates opportunity metrics for analytics
 */
export const getOpportunityMetrics = (opportunities: BillingOpportunity[]) => {
  const totalEstimatedRevenue = opportunities.reduce((sum, opp) => sum + opp.estimatedRevenue, 0);
  const highPriorityCount = opportunities.filter(opp => opp.priority === 'high').length;
  const highConversionCount = opportunities.filter(opp => opp.conversionLikelihood === 'high').length;
  
  // Group by category
  const categoryBreakdown = opportunities.reduce((acc, opp) => {
    if (!acc[opp.category]) {
      acc[opp.category] = { count: 0, revenue: 0 };
    }
    acc[opp.category].count++;
    acc[opp.category].revenue += opp.estimatedRevenue;
    return acc;
  }, {} as Record<string, { count: number; revenue: number }>);
  
  return {
    totalOpportunities: opportunities.length,
    totalEstimatedRevenue,
    highPriorityCount,
    highConversionCount,
    categoryBreakdown
  };
};