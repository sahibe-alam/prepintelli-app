export const isValidIndianMobileNumber: (number: string) => boolean = (
  number: string
): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(number);
};

export const isValidEmail: (email: string) => boolean = (
  email: string
): boolean => {
  // Regular expression for basic email validation
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
