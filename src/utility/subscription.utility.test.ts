import { test, expect } from 'vitest';
import { checkIfSubscriptionCharged, checkIfSubscriptionChargedOngoing } from './subscription.utility';

test('is subscription charged', () => {
     expect(checkIfSubscriptionCharged(4, new Date(2020, 3, 1), new Date(2020, 5, 1), 2020, 6)).toBe(true);
     expect(checkIfSubscriptionCharged(5, new Date(2020, 5, 1), new Date(2020, 6, 1), 2020, 3)).toBe(true);
     expect(checkIfSubscriptionCharged(7, new Date(2020, 7, 4), new Date(2020, 10, 1), 2020, 5)).toBe(true);
     expect(checkIfSubscriptionCharged(8, new Date(2020, 5, 1), new Date(2020, 7, 1), 2020, 5)).toBe(false);
     expect(checkIfSubscriptionCharged(8, new Date(2020, 5, 1), new Date(2020, 8, 16), 2020, 13)).toBe(true);
     expect(checkIfSubscriptionCharged(8, new Date(2020, 5, 1), new Date(2020, 8, 12), 2020, 13)).toBe(false);
     expect(checkIfSubscriptionCharged(5, new Date(2020, 5, 14), new Date(2020, 8, 1), 2020, 13)).toBe(false);
     expect(checkIfSubscriptionCharged(5, new Date(2020, 5, 14), new Date(2022, 8, 1), 2021, 13)).toBe(true);
     expect(checkIfSubscriptionCharged(3, new Date(2020, 3, 14), new Date(2023, 8, 1), 2020, 13)).toBe(true);
     expect(checkIfSubscriptionCharged(6, new Date(2020, 5, 14), new Date(2022, 6, 1), 2022, 13)).toBe(false);
     expect(checkIfSubscriptionCharged(7, new Date(2020, 5, 14), new Date(2022, 7, 14), 2020, 13)).toBe(true);
     expect(checkIfSubscriptionCharged(5, new Date(2020, 5, 14), new Date(2021, 8, 1), 2019, 13)).toBe(false);
});

test('is ongoing subscription charged', () => {
     expect(checkIfSubscriptionChargedOngoing(1, 2021, new Date(2021, 5, 1), 13)).toBe(false);
     expect(checkIfSubscriptionChargedOngoing(2, 2021, new Date(2021, 2, 1), 13)).toBe(true);
     expect(checkIfSubscriptionChargedOngoing(5, 2021, new Date(2022, 6, 3), 12)).toBe(false);
     expect(checkIfSubscriptionChargedOngoing(6, 2022, new Date(2021, 6, 3), 13)).toBe(true);
     expect(checkIfSubscriptionChargedOngoing(3, 2022, new Date(2022, 1, 12), 12)).toBe(true);
     expect(checkIfSubscriptionChargedOngoing(11, 2023, new Date(2023, 6, 11), 29)).toBe(true);
     expect(checkIfSubscriptionChargedOngoing(11, 2023, new Date(2023, 6, 11), 23)).toBe(true);
});
