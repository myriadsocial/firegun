const { Firegun } = require("../firegun");
const fg = new Firegun([],"firedb",true);

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

jest.setTimeout(500);

var paths = [];
var count = 10;
var iteration = 10;
for (let k = 0; k < iteration; k++) {
  let s = []
  for (let i = 0; i < randomIntFromInterval(1,10); i++) {
    s.push(`level${i}`);
  }
  let path = s.join("/");
  paths.push(path);
  for (let i = 0; i < count; i++) {
    test(`Writing data to node ${path} entry ${i}`, () => {
      return fg.Put(`${path}/${i}`,{
          "data" : `data-${i}`
      }).then(data => {
        expect(data.ok).toStrictEqual({'' : 1});
      });
    });
  }
}

paths.forEach(path => {
    for (let i = 0; i < count; i++) {
        test(`Reading data from node ${path} entry ${i}`, () => {
            return fg.Get(`${path}/${i}`).then(data => {
                expect(data.data).toStrictEqual(`data-${i}`);
            });
          });                
    }
});