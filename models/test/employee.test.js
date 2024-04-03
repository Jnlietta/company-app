const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no "firstName, lastName, department" arg', async () => {
      const employee = new Employee({}); 
      const error = employee.validateSync();
      expect(error.errors.firstName).to.exist;
      expect(error.errors.lastName).to.exist;
      expect(error.errors.department).to.exist;
  });

  it('should throw an error if "firstName, lastName, department" is not a string', () => {
      const cases = [{}, []];
      for (let data of cases) {
          const employee = new Employee({ 
              firstName: data,
              lastName: data,
              department: data
          });
          const error = employee.validateSync();
          expect(error.errors.firstName).to.exist;
          expect(error.errors.lastName).to.exist;
          expect(error.errors.department).to.exist;
      }
  });
});