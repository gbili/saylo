import 'dotenv/config';
import { expect } from 'chai';
import MysqlDump from '../src/MysqlDump';
import MysqlReq from '../src/MysqlReq';

describe(`MysqlDump`, function() {
  describe(`MysqlDump.executeSqlFile({filePath})`, function() {
    it('should execute sql in file with multiple statements on env connection settings and disconnect', async function() {
      const filePath = `${__dirname}/schema.sql`;
      await MysqlDump.executeSqlFile({filePath});
      expect(await MysqlReq.isConnected()).to.be.equal(false);
    });

    it('should execute sql in file with multiple statements with connection settings and disconnect', async function() {
      const filePath = `${__dirname}/schema.sql`;
      const connectionConfig = {
        envVarNames : {
          host: 'TEST_DB_HOST',
          user: 'TEST_DB_USER',
          password: 'TEST_DB_PASSWORD',
          database: 'TEST_DB_DATABASE',
        },
      };
      await MysqlDump.executeSqlFile({filePath, connectionConfig});
      expect(await MysqlReq.isConnected()).to.be.equal(false);
    });

    it('should execute sql in file with multiple statements with connection settings and not disconnect', async function() {
      const filePath = `${__dirname}/schema.sql`;
      const connectionConfig = {
        envVarNames : {
          host: 'TEST_DB_HOST',
          user: 'TEST_DB_USER',
          password: 'TEST_DB_PASSWORD',
          database: 'TEST_DB_DATABASE',
        },
      };
      await MysqlDump.executeSqlFile({filePath, connectionConfig, disconnectOnFinish: false});
      expect(await MysqlReq.isConnected()).to.be.equal(true);
      await MysqlReq.removeConnection();
    });
  });
});
