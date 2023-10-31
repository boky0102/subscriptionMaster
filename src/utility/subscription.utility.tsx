interface Subscription {
     id: string;
     subscriptionName: string;
     chargeAmount: number;
     renewalDate: Date;
     dateAdded: Date;
     freeTrial: boolean;
     category: subscriptionCategories;
     subscriptionStopped?: Date;
}

type ChartData = {
     month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
     totalCostForMonth: number;
};

type ChartYearData = {
     year: number;
     totalCostForYear: number;
};

type ChartYearCategoryData = {
     name: subscriptionCategories;
     totalCost: number;
     percentage?: number;
};

type Months = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

export function getChartDataYear(subscriptionData: Subscription[], year: number) {
     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth();
     const currentDay = new Date().getDay();
     const months: Months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     const chartYearDataArray: ChartData[] = [];
     if (subscriptionData) {
          months.forEach((month, index) => {
               let totalMonthCost = 0;
               subscriptionData.forEach((subscription) => {
                    if (subscription.subscriptionStopped) {
                         if (!subscription.freeTrial) {
                              if (
                                   subscription.dateAdded.getFullYear() < year &&
                                   year < subscription.subscriptionStopped.getFullYear()
                              ) {
                                   totalMonthCost += subscription.chargeAmount;
                              } else if (subscription.dateAdded.getFullYear() === year) {
                                   if (
                                        subscription.dateAdded.getMonth() < index &&
                                        index < subscription.subscriptionStopped.getMonth()
                                   ) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getMonth() === index) {
                                        //BUG ON JANUARY CURRENT YEAR
                                        if (
                                             subscription.dateAdded.getDay() <= currentDay &&
                                             subscription.dateAdded.getDay() < subscription.subscriptionStopped.getDay()
                                        ) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   }
                              }
                         }
                    } else {
                         if (!subscription.freeTrial) {
                              if (subscription.dateAdded.getFullYear() < year) {
                                   totalMonthCost += subscription.chargeAmount;
                              } else if (subscription.dateAdded.getFullYear() === year) {
                                   if (subscription.dateAdded.getMonth() < index) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getMonth() === index) {
                                        if (subscription.dateAdded.getDay() <= currentDay) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   }
                              }
                         }
                    }
               });

               const monthChartData: ChartData = {
                    month: month,
                    totalCostForMonth: totalMonthCost,
               };

               console.log('MONTH ', month, 'TOTAL COST', totalMonthCost);

               if (currentYear === year) {
                    if (currentMonth >= index) {
                         chartYearDataArray.push(monthChartData);
                    }
               } else if (currentYear !== year) {
                    chartYearDataArray.push(monthChartData);
               }
          });
     }
     return chartYearDataArray;
}

export function getChartCategoryDataYear(subscriptionData: Subscription[], year: number) {
     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth();
     const currentDay = new Date().getDay();
     const months: Months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     const categories: subscriptionCategories[] = [
          'Streaming service',
          'Gaming',
          'Clothing',
          'Food',
          'Utility',
          'Education',
          'Software',
          'Other',
     ];

     const chartYearCategoryDataArray: ChartYearCategoryData[] = [];
     if (subscriptionData) {
          let totalCostAllCategories = 0;
          categories.forEach((category) => {
               let totalCostYear = 0;
               months.forEach((month, index) => {
                    let totalMonthCost = 0;
                    subscriptionData.forEach((subscription) => {
                         if (subscription.category === category && !subscription.freeTrial) {
                              if (subscription.dateAdded.getFullYear() < year) {
                                   totalMonthCost += subscription.chargeAmount;
                              } else if (subscription.dateAdded.getFullYear() === year) {
                                   if (subscription.dateAdded.getMonth() < index) {
                                        totalMonthCost += subscription.chargeAmount;
                                   } else if (subscription.dateAdded.getMonth() === index) {
                                        if (subscription.dateAdded.getDay() <= currentDay) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   }
                              }
                         }
                    });

                    if (currentYear === year) {
                         if (currentMonth >= index) {
                              totalCostYear += totalMonthCost;
                         }
                    } else if (currentYear !== year) {
                         totalCostYear += totalMonthCost;
                    }
               });

               totalCostAllCategories += totalCostYear;
               const categoryData: ChartYearCategoryData = {
                    name: category,
                    totalCost: totalCostYear,
               };
               if (totalCostYear !== 0) {
                    chartYearCategoryDataArray.push(categoryData);
               }
          });
          const returnArray = chartYearCategoryDataArray.map((category) => {
               const mapObject: ChartYearCategoryData = {
                    name: category.name,
                    totalCost: category.totalCost,
                    percentage: (category.totalCost / totalCostAllCategories) * 100,
               };
               return mapObject;
          });
          return returnArray;
     }
}

export function getChartDataAllYears(subscriptionData: Subscription[]) {
     const currentYear = new Date().getFullYear();
     let lowestYear = currentYear;
     if (subscriptionData) {
          subscriptionData.forEach((subscription) => {
               if (subscription.dateAdded.getFullYear() < lowestYear && !subscription.freeTrial) {
                    lowestYear = subscription.dateAdded.getFullYear();
               }
          });
     }
     const chartYearData: ChartYearData[] = [];
     for (let j = lowestYear; j <= currentYear; j++) {
          let yearTotalCost = 0;
          const yearCostByMonths = getChartDataYear(subscriptionData, j);
          if (yearCostByMonths) {
               yearCostByMonths.forEach((month) => {
                    yearTotalCost += month.totalCostForMonth;
               });
          }
          const iterationYearData: ChartYearData = {
               year: j,
               totalCostForYear: yearTotalCost,
          };
          chartYearData.push(iterationYearData);
     }
     return chartYearData;
}
