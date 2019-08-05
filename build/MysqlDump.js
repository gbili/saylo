"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _MysqlReq = _interopRequireDefault(require("./MysqlReq"));

var _logger = _interopRequireDefault(require("./utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MysqlDump {
  static async executeSqlFileOnExistingConnection(filePath) {
    if (!(0, _fs.existsSync)(filePath)) {
      throw new Error('File path does not exists ');
    }

    _logger.default.log('executeSchemaOntoExistingConnection');

    await _MysqlReq.default.query({
      sql: (0, _fs.readFileSync)(filePath, 'utf-8')
    });
  }

  static async executeSqlFile({
    filePath,
    connectionConfig,
    disconnectOnFinish
  }) {
    _logger.default.log(`MysqlDump:executeSqlFile(${filePath})`);

    if (!connectionConfig) {
      let letMysqlReqLoadDefaultEnvConfig = true;
      connectionConfig = letMysqlReqLoadDefaultEnvConfig && {};
    }

    let {
      multipleStatements,
      ...connectionConfigWithoutMS
    } = connectionConfig;

    _MysqlReq.default.setConnectionConfig({
      multipleStatements: true,
      ...connectionConfigWithoutMS
    });

    await MysqlDump.executeSqlFileOnExistingConnection(filePath);

    if (typeof disconnectOnFinish === 'undefined') {
      disconnectOnFinish = true;
    }

    if (disconnectOnFinish) {
      await _MysqlReq.default.disconnect();
    }
  }

}

var _default = MysqlDump;
exports.default = _default;