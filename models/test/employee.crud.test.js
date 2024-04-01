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
    
    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const emp = new Employee({ firstName: 'firstName #3', lastName: 'lastName #3', department: 'department #3' });
            await emp.save();
            expect(emp.isNew).to.be.false;
          });
      
        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'firstName #1' }, { $set: { firstName: '=firstName #1=' }});
            const updatedEmp = await Employee.findOne({ firstName: '=firstName #1=' });
            expect(updatedEmp).to.not.be.null;
        });
      
        it('should properly update one document with "save" method', async () => {
            const emp = await Employee.findOne({ lastName: 'lastName #2' });
            emp.lastName = '=lastName #2=';
            await emp.save();
          
            const updatedEmp = await Employee.findOne({ lastName: '=lastName #2=' });
            expect(updatedEmp).to.not.be.null;
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { department: 'Ubdated!' }});
            const updatedEmp = await Employee.find({ department: 'Ubdated!' });
            expect(updatedEmp.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
            await testEmpTwo.save();
          });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'firstName #1' });
            const removeEmployee = await Employee.findOne({ firstName: 'firstName #1' });
            expect(removeEmployee).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
          });
    });
});