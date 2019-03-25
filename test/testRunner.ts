import fs from 'fs';
import mocha from 'mocha';
import path from 'path';

// Instantiate a Mocha instance.
const mochaInstance = new mocha();

const testDir = './dist/test';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter((file) => {
    // Only keep the .js files
    return file.substr(-7) === 'test.js';

}).forEach((file) => {
    mochaInstance.addFile(
        path.join(testDir, file)
    );
});

// Run the tests.
mochaInstance.run( (failures) => {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});
