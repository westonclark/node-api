import { Type } from '@fastify/type-provider-typebox';
import { errorResponse } from '../infra/web/schemas';

const TEmployeeNumber = Type.Number({
  minimum: 1,
  maximum: 2 ** 31 - 1, // max int32 is 2^31 - 1
});

export const employeeSchema = Type.Object({
  employeeNumber: TEmployeeNumber,
  firstName: Type.String({ minLength: 1, maxLength: 14 }),
  lastName: Type.String({ minLength: 1, maxLength: 16 }),
  birthDate: Type.String({ format: 'date' }),
  hireDate: Type.String({ format: 'date' }),
  gender: Type.Enum({ male: 'M', female: 'F', other: 'O' }),
});

export const newEmployeeSchema = Type.Omit(employeeSchema, ['employeeNumber']);
export const patchEmployeeSchemaBody = Type.Partial(newEmployeeSchema);

export const createEmployeeSchema = {
  body: newEmployeeSchema,
  response: {
    '201': employeeSchema,
  },
};

export const getEmployeesSchema = {
  querystring: Type.Object({
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    title: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
  }),
  response: {
    '200': Type.Array(
      Type.Composite([
        employeeSchema,
        Type.Object({ title: Type.Optional(Type.String()) }),
      ])
    ),
  },
};

export const getEmployeeSchema = {
  params: Type.Object({ employeeNumber: TEmployeeNumber }),
  response: {
    '200': employeeSchema,
    '404': errorResponse,
  },
};

export const patchEmployeeSchema = {
  params: Type.Object({ employeeNumber: TEmployeeNumber }),
  body: patchEmployeeSchemaBody,
  response: {
    '200': employeeSchema,
    '404': errorResponse,
  },
};

export const deleteEmployeeSchema = {
  params: Type.Object({ employeeNumber: TEmployeeNumber }),
  response: {
    '204': Type.Null(),
    '404': errorResponse,
  },
};
