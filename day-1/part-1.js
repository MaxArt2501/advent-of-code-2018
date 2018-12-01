// Pretty straightforward:
// 1. split the input into lines;
// 2. convert them into numbers;
// 3. sum the numbers.
input.split('\n').map(Number).reduce((sum, num) => sum + num);
