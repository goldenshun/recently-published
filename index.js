#!/usr/bin/env node
const program = require('commander');
const npm = require('npm');
var pkg = require('./package.json');

program
  .version(pkg.version)
  // .option('-p, --peppers', 'Add peppers')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq-sauce', 'Add bbq sauce')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate()-100);

npm.load({outfd: null}, () => {
  Object.keys(pkg.dependencies).forEach(dependency => {
    const version = pkg.dependencies[dependency];
    npm.commands.view([dependency, 'time'], false, (er, tree) => {
      const datePublished = new Date(tree[version].time[version]);
      if (datePublished > yesterday) {
        console.log(dependency, version, datePublished);
      }
    });
  });
});

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);