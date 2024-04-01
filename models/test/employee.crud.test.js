const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const allEmployees = await Employee.find();
            const expectedLength = 2;
            expect(allEmployees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const empByFirstName = await Employee.findOne({ firstName: 'firstName #1' });
            const expectedFirstName = 'firstName #1';
            expect(empByFirstName.firstName).to.be.equal(expectedFirstName);

            const empByLastName = await Employee.findOne({ lastName: 'lastName #2' });
            const expectedLastName = 'lastName #2';
            expect(empByLastName.lastName).to.be.equal(expectedLastName);
            
            const empByDepartment = await Employee.findOne({ department: 'department #1' });
            const expectedDepartment = 'department #1';
            expect(empByDepartment.department).to.be.equal(expectedDepartment);
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });
});