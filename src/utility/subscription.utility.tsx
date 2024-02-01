interface Subscription {
     id: string;
     subscriptionName: string;
     chargeAmount: number;
     renewalDate: Date;
     dateAdded: Date;
     freeTrial?: boolean;
     category?: subscriptionCategories;
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

export function checkIfSubscriptionCharged(
     monthIndex: number,
     dateSubscribed: Date,
     dateUnsubscribed: Date,
     year: number,
     renewalDay: number,
) {
     const yearSubscribed = dateSubscribed.getFullYear();
     const monthSubscribed = dateSubscribed.getMonth();
     const daySubscribed = dateSubscribed.getDate();
     const yearUnsubscribed = dateUnsubscribed.getFullYear();
     const monthUnsubscribed = dateUnsubscribed.getMonth();
     const dayUnsubscribed = dateUnsubscribed.getDate();

     const currentDay = new Date().getDate();
     const currentMonth = new Date().getMonth();
     /* const currentYear = new Date().getFullYear(); */

     if (year > yearSubscribed && year < yearUnsubscribed) {
          return true;
     } else {
          if (year === yearSubscribed && year === yearUnsubscribed) {
               if (currentMonth === monthIndex && monthUnsubscribed === monthIndex) {
                    if (dayUnsubscribed >= currentDay) {
                         return true;
                    }
               } else {
                    if (monthIndex > monthSubscribed && monthIndex < monthUnsubscribed) {
                         return true;
                    } else {
                         if (monthIndex === monthSubscribed) {
                              if (renewalDay >= daySubscribed) {
                                   return true;
                              } else {
                                   return false;
                              }
                         }
                         if (monthIndex === monthUnsubscribed) {
                              if (renewalDay <= dayUnsubscribed) {
                                   return true;
                              } else {
                                   return false;
                              }
                         }
                    }
               }
          } else if (year === yearSubscribed) {
               if (monthIndex > monthSubscribed && monthIndex < monthUnsubscribed) {
                    return true;
               } else {
                    if (monthIndex === monthUnsubscribed) {
                         if (renewalDay <= dayUnsubscribed) {
                              return true;
                         } else {
                              return false;
                         }
                    }
                    if (monthIndex === monthSubscribed) {
                         return true;
                    }
               }
          } else if (year === yearUnsubscribed) {
               if (monthIndex > monthSubscribed && monthIndex < monthUnsubscribed) {
                    return true;
               } else {
                    if (monthIndex === monthUnsubscribed) {
                         if (renewalDay <= dayUnsubscribed) {
                              return true;
                         } else {
                              return false;
                         }
                    }
                    if (monthIndex === monthSubscribed) {
                         return true;
                    }
               }
          }
     }
     return false;
}

export function checkIfSubscriptionChargedOngoing(
     monthIndex: number,
     year: number,
     dateSubscribed: Date,
     renewalDay: number,
) {
     const yearSubscribed = dateSubscribed.getFullYear();
     const monthSubscribed = dateSubscribed.getMonth();
     const currentYear = new Date().getFullYear();
     const currentMonth = new Date().getMonth();
     const currentDay = new Date().getDate();

     if (yearSubscribed < year) {
          return true;
     } else {
          if (yearSubscribed === year) {
               if (monthIndex >= monthSubscribed) {
                    if (monthIndex > monthSubscribed) {
                         if (monthIndex === currentMonth && year === currentYear) {
                              if (currentDay >= renewalDay) {
                                   return true;
                              } else {
                                   return false;
                              }
                         }
                         return true;
                    } else {
                         if (monthIndex === currentMonth && year === currentYear) {
                              if (currentDay >= renewalDay) {
                                   return true;
                              } else {
                                   return false;
                              }
                         }
                         if (monthIndex === monthSubscribed) {
                              return true;
                         }
                    }
               } else {
                    return false;
               }
          } else {
               return false;
          }
     }
     return false;
}

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
                                   checkIfSubscriptionCharged(
                                        index,
                                        subscription.dateAdded,
                                        subscription.subscriptionStopped,
                                        year,
                                        subscription.dateAdded.getDate(),
                                   )
                              ) {
                                   totalMonthCost += subscription.chargeAmount;
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
                         if (!subscription.subscriptionStopped) {
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
                         } else if (subscription.subscriptionStopped) {
                              if (subscription.category === category && !subscription.freeTrial) {
                                   if (
                                        subscription.dateAdded.getFullYear() === year &&
                                        subscription.subscriptionStopped.getFullYear() === year
                                   ) {
                                        if (
                                             subscription.dateAdded.getMonth() <= index &&
                                             index <= subscription.subscriptionStopped.getMonth()
                                        ) {
                                             if (subscription.subscriptionStopped.getMonth() === index) {
                                                  if (subscription.subscriptionStopped.getFullYear() === currentYear) {
                                                       if (currentDay >= subscription.subscriptionStopped.getDate()) {
                                                            totalMonthCost += subscription.chargeAmount;
                                                       }
                                                  } else {
                                                       totalMonthCost += subscription.chargeAmount;
                                                  }
                                             } else {
                                                  totalMonthCost += subscription.chargeAmount;
                                             }
                                        }
                                   } else if (subscription.dateAdded.getFullYear() === year) {
                                        if (index >= subscription.dateAdded.getMonth()) {
                                             totalMonthCost += subscription.chargeAmount;
                                        }
                                   } else if (subscription.subscriptionStopped.getFullYear() === year) {
                                        if (subscription.subscriptionStopped.getFullYear() === currentYear) {
                                             if (index < subscription.subscriptionStopped.getMonth()) {
                                                  if (subscription.subscriptionStopped.getMonth() === currentMonth) {
                                                       if (currentDay >= subscription.subscriptionStopped.getDate()) {
                                                            totalMonthCost += subscription.chargeAmount;
                                                       }
                                                  } else {
                                                       totalMonthCost += subscription.chargeAmount;
                                                  }
                                             }
                                        } else {
                                             if (index <= subscription.subscriptionStopped.getMonth()) {
                                                  totalMonthCost += subscription.chargeAmount;
                                             }
                                        }
                                   } else if (
                                        subscription.subscriptionStopped.getFullYear() < year &&
                                        subscription.dateAdded.getFullYear() > year
                                   ) {
                                        totalMonthCost += subscription.chargeAmount;
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

export function getCategoryDataAllYears(subscriptionData: Subscription[]) {
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

     const currentYear = new Date().getFullYear();
     let startingYear = new Date().getFullYear();
     subscriptionData.forEach((subscription) => {
          if (subscription.dateAdded.getFullYear() < startingYear) {
               startingYear = subscription.dateAdded.getFullYear();
          }
     });

     const chartCategoryDataArray = [] as ChartYearCategoryData[];

     for (let i = startingYear; i <= currentYear; i++) {
          const dataForCurrentYear = getChartCategoryDataYear(subscriptionData, i);
          dataForCurrentYear?.forEach((category) => {
               chartCategoryDataArray.push(category);
          });
     }

     const categoryChartData = [] as ChartYearCategoryData[];

     let totalCostAllCategories = 0;

     if (chartCategoryDataArray.length > 0) {
          categories.forEach((category) => {
               let totalCostCategory = 0;
               chartCategoryDataArray.forEach((categoryData) => {
                    if (category === categoryData.name) {
                         totalCostCategory += categoryData.totalCost;
                         totalCostAllCategories += categoryData.totalCost;
                    }
               });
               categoryChartData.push({
                    totalCost: totalCostCategory,
                    name: category,
               });
          });
     }

     const returnArrayWithPercentages = categoryChartData.map((category) => {
          const mapObject: ChartYearCategoryData = {
               name: category.name,
               totalCost: category.totalCost,
               percentage: (category.totalCost / totalCostAllCategories) * 100,
          };
          return mapObject;
     });

     return returnArrayWithPercentages;
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
               totalCostForYear: Math.round(yearTotalCost * 100) / 100,
          };
          chartYearData.push(iterationYearData);
     }
     return chartYearData;
}

//Ceck for day when it stopped because if stopped before renewal date shouldn't be calculated
export function getSingleSubscriptionData(subscription: Subscription) {
     let iterationYear = new Date(subscription.dateAdded).getFullYear();
     const months: Months[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

     let totalCostAllYears = 0;
     if (subscription.subscriptionStopped) {
          while (iterationYear <= subscription.subscriptionStopped.getFullYear()) {
               let totalCostYear = 0;
               if (
                    iterationYear === subscription.subscriptionStopped.getFullYear() &&
                    iterationYear === subscription.dateAdded.getFullYear()
               ) {
                    months.forEach((month, index) => {
                         if (
                              index <= subscription.subscriptionStopped!.getMonth() &&
                              index >= subscription.dateAdded.getMonth()
                         ) {
                              if (index === subscription.subscriptionStopped?.getMonth()) {
                                   if (subscription.dateAdded.getDate() >= subscription.subscriptionStopped.getDate()) {
                                        totalCostYear += subscription.chargeAmount;
                                   }
                              } else {
                                   totalCostYear += subscription.chargeAmount;
                              }

                              if (index === subscription.dateAdded.getMonth()) {
                                   totalCostYear += subscription.chargeAmount;
                              }
                         }
                    });
               } else if (iterationYear === subscription.subscriptionStopped.getFullYear()) {
                    months.forEach((month, index) => {
                         if (index <= subscription.subscriptionStopped!.getMonth()) {
                              if (index === subscription.subscriptionStopped?.getMonth()) {
                                   if (subscription.dateAdded.getDate() <= subscription.subscriptionStopped.getDate()) {
                                        totalCostYear += subscription.chargeAmount;
                                   }
                              } else {
                                   totalCostYear += subscription.chargeAmount;
                              }
                         }
                    });
               } else if (iterationYear === subscription.dateAdded.getFullYear()) {
                    months.forEach((month, index) => {
                         if (index >= subscription.dateAdded.getMonth()) {
                              totalCostYear += subscription.chargeAmount;
                         }
                    });
               } else {
                    months.forEach(() => {
                         totalCostYear += subscription.chargeAmount;
                    });
               }
               totalCostAllYears += totalCostYear;
               iterationYear++;
          }
     } else {
          while (iterationYear <= new Date().getFullYear()) {
               let totalCostYear = 0;
               months.forEach((month, index) => {
                    if (
                         checkIfSubscriptionChargedOngoing(
                              index,
                              iterationYear,
                              subscription.dateAdded,
                              subscription.renewalDate.getDate(),
                         )
                    ) {
                         totalCostYear += subscription.chargeAmount;
                    }
               });
               totalCostAllYears += totalCostYear;
               iterationYear++;
          }
     }

     return totalCostAllYears;
}
