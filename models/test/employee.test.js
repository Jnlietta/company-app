const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no "firstName, lastName, department" arg', async () => {
        const dep = new Employee({}); 
    
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });  
    });

    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [{}, []];
        for(let data of cases) {
          const dep = new Employee({ data });
      
          dep.validateSync(err => {
            expect(err.errors.data).to.exist;
          });
        }
    });
});

after(() => {
    mongoose.models = {};
  });

  //pytania do mentora 30.2