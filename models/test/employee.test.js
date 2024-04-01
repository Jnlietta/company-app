const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no "firstName, lastName, department" arg', async () => {
        const dep = new Employee({}); 
    
      dep.validateSync(err => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });  
    });

    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [{}, []];
        for (let data of cases) {
            const employee = new Employee({ 
                firstName: data,
                lastName: data,
                department: data
            });
      
          employee.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }
    });
});

after(() => {
    mongoose.models = {};
  });

  //pytania do mentora 30.2 nie rozumiem jak ma działać ten test, niezależnie od tego
  //co wpisze test jest zawsze pozytywny? dlaczego, skad mam pewnosc ze przyjelam sluszne zalozenie?