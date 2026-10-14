export enum Gender {
  male = 'M',
  female = 'F',
  other = 'O',
}

export type Employee = {
  employeeNumber: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  hireDate: Date;
  gender: Gender;
  title?: string;
};

export type EmployeeFilterOptions = {
  limit?: number;
  title?: string;
};

export type EmployeePatch = Partial<Employee>;
export type NewEmployee = Omit<Employee, 'employeeNumber'>;
