import 'jest-extended';
import {
  deleteEmployeeByNumber,
  getEmployeeByNumber,
  insertEmployee,
  listEmployees,
  saveEmployee,
} from '../../../src/employees/mysql';
import db from '../../../src/infra/database/knex';
import { ResourceNotFoundError } from '../../../src/errors';
import { Employee, Gender } from '../../../src/employees/types';

const expectEmployee = () =>
  expect.objectContaining({
    employeeNumber: expect.any(Number),
    firstName: expect.any(String),
    lastName: expect.any(String),
    gender: expect.any(String),
    hireDate: expect.any(Date),
    birthDate: expect.any(Date),
  });

describe('Mysql Persistence', () => {
  const employeeNumber = 10020;
  const employeeNumberWrite = 100;
  const newEmployee: Employee = {
    employeeNumber: employeeNumberWrite,
    firstName: 'testName',
    lastName: 'testLastName',
    gender: Gender.female,
    hireDate: new Date(),
    birthDate: new Date(),
  };

  afterAll(async () => {
    await db.destroy();
  });

  describe('getEmployeeByNumber', () => {
    it('should return employee', async () => {
      const employee = await getEmployeeByNumber(employeeNumber);
      expect(employee).toEqual(expectEmployee());
    });

    it('should throw error when employee does not exist', async () => {
      expect(() => getEmployeeByNumber(-1)).rejects.toThrow(
        ResourceNotFoundError
      );
    });
  });

  describe('insertEmployee', () => {
    it('should insert employee', async () => {
      await insertEmployee(newEmployee);

      const employee = await getEmployeeByNumber(employeeNumberWrite);
      expect(employee.employeeNumber).toEqual(employeeNumberWrite);
      expect(employee.firstName).toEqual(newEmployee.firstName);
      expect(employee.hireDate.toISOString().slice(0, 10)).toEqual(
        newEmployee.hireDate.toISOString().slice(0, 10)
      );
    });
  });

  describe('saveEmployee', () => {
    it('should edit employee', async () => {
      const editedEmployee = {
        ...newEmployee,
        firstName: 'differentName',
      };
      await saveEmployee(editedEmployee);
      const updatedEmployee = await getEmployeeByNumber(
        editedEmployee.employeeNumber
      );

      expect(updatedEmployee.firstName).toEqual(editedEmployee.firstName);
      expect(updatedEmployee.employeeNumber).toEqual(
        editedEmployee.employeeNumber
      );
    });

    it('should throw error when employee does not exist', async () => {
      const editedEmployee = {
        ...newEmployee,
        employeeNumber: -1,
      };
      expect(() => saveEmployee(editedEmployee)).rejects.toThrow(
        ResourceNotFoundError
      );
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee', async () => {
      await deleteEmployeeByNumber(employeeNumberWrite);
      expect(() => getEmployeeByNumber(employeeNumberWrite)).rejects.toThrow(
        ResourceNotFoundError
      );
    });

    it('should throw error if employee does not exist', async () => {
      expect(() => deleteEmployeeByNumber(employeeNumberWrite)).rejects.toThrow(
        ResourceNotFoundError
      );
    });
  });

  describe('listEmployees', () => {
    it('should return 10 employees by default', async () => {
      const employees = await listEmployees({});

      expect(employees).toHaveLength(10);
      expect(employees).toEqual(expect.arrayContaining([expectEmployee()]));
    });

    it('should respect a custom limit', async () => {
      const employees = await listEmployees({ limit: 3 });

      expect(employees).toHaveLength(3);
    });

    it('should filter by title and include the title', async () => {
      const title = 'Engineer';
      const employees = await listEmployees({ title });

      expect(employees).toHaveLength(10);
      employees.forEach((emp) => {
        expect(emp.title?.toLowerCase()).toEqual(title.toLowerCase());
      });
    });

    it('should filter by title and custom limit without duplicates', async () => {
      const employees = await listEmployees({ title: 'Engineer', limit: 25 });
      const numbers = employees.map((e) => e.employeeNumber);

      expect(employees).toHaveLength(25);
      expect(new Set(numbers).size).toEqual(numbers.length);
    });

    it('should return no employees for an unknown title', async () => {
      const employees = await listEmployees({ title: 'not a real title' });

      expect(employees).toEqual([]);
    });

    it('should not include a title when not filtering by title', async () => {
      const employees = await listEmployees({ limit: 1 });

      expect(employees[0].title).toBeUndefined();
    });
  });
});
