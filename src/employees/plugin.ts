import {
  FastifyPluginAsyncTypebox,
  routeOptions,
  ServerPlugin,
} from '../infra/web/types';
import {
  forResponse,
  newEmployeeFromRequest,
  patchEmployeeFromRequest,
} from './mappers';
import {
  createEmployeeSchema,
  deleteEmployeeSchema,
  getEmployeeSchema,
  getEmployeesSchema,
  patchEmployeeSchema,
} from './schemas';
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployee,
  getEmployees,
} from './service';

const createEmployeeOptions = routeOptions({
  schema: createEmployeeSchema,
  async handler(request, reply) {
    const newEmployee = await createEmployee(
      newEmployeeFromRequest(request.body)
    );

    reply.status(201).send(forResponse(newEmployee));
  },
});

const getEmployeesOptions = routeOptions({
  schema: getEmployeesSchema,
  async handler(request, reply) {
    const employees = await getEmployees(request.query);

    reply.send(employees.map(forResponse));
  },
});

const getEmployeeOptions = routeOptions({
  schema: getEmployeeSchema,
  async handler(request, reply) {
    const employee = await getEmployee(request.params.employeeNumber);

    reply.send(forResponse(employee));
  },
});

const patchEmployeeOptions = routeOptions({
  schema: patchEmployeeSchema,
  async handler(request, reply) {
    const updatedEmployee = await editEmployee(
      request.params.employeeNumber,
      patchEmployeeFromRequest(request.body)
    );

    reply.send(forResponse(updatedEmployee));
  },
});

const deleteEmployeeOptions = routeOptions({
  schema: deleteEmployeeSchema,
  async handler(request, reply) {
    await deleteEmployee(request.params.employeeNumber);

    reply.status(204);
  },
});

const plugin: ServerPlugin<FastifyPluginAsyncTypebox> = {
  plugin: async (fastify) => {
    fastify
      .post('/employees', createEmployeeOptions)
      .get('/employees', getEmployeesOptions)
      .get('/employees/:employeeNumber', getEmployeeOptions)
      .patch('/employees/:employeeNumber', patchEmployeeOptions)
      .delete('/employees/:employeeNumber', deleteEmployeeOptions);
  },
};

export default plugin;
