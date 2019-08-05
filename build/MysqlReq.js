"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _logger = _interopRequireDefault(require("./utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mysqlConnection = null;
let connectionConfig = null;
let locked = false;
let lockedStatePromise = null;

class MysqlReq {
  static setConnectionConfig({
    host,
    user,
    password,
    database,
    envVarNames,
    ...rest
  }) {
    MysqlReq.disconnect();

    if (!envVarNames) {
      envVarNames = {
        host: 'DB_HOST',
        user: 'DB_USER',
        password: 'DB_PASSWORD',
        database: 'DB_NAME'
      };
    }

    connectionConfig = {
      host: host || envVarNames && process.env[envVarNames.host] || null,
      user: user || envVarNames && process.env[envVarNames.user] || null,
      password: password || envVarNames && process.env[envVarNames.password] || null,
      database: database || envVarNames && process.env[envVarNames.database] || null,
      ...rest
    };
    return connectionConfig;
  }

  static getConnectionConfig() {
    return connectionConfig || MysqlReq.setConnectionConfig({});
  }

  static createConnection() {
    if (null !== mysqlConnection) {
      throw new Error('Cannot create another connection');
    }

    mysqlConnection = _mysql.default.createConnection(MysqlReq.getConnectionConfig());

    _logger.default.log('MysqlReq.createConnection(), Connection created');
  }

  static hasConnection() {
    return mysqlConnection !== null;
  }

  static getConnection() {
    if (!MysqlReq.hasConnection()) {
      throw new Error('You must create a connection first');
    }

    return mysqlConnection;
  }

  static async removeConnection() {
    let didRemove = false;

    if (MysqlReq.hasConnection()) {
      await MysqlReq.disconnect();

      _logger.default.log('MysqlReq.removeConnection(), Connection removed', mysqlConnection);

      mysqlConnection = null;
      didRemove = true;
    }

    return didRemove;
  }

  static getThreadId() {
    return MysqlReq.hasConnection() && MysqlReq.getConnection().threadId || null;
  }

  static async isConnected() {
    await MysqlReq.awaitLockStatePromises();
    return MysqlReq.hasConnection() && Number.isInteger(MysqlReq.getThreadId());
  }

  static async connect() {
    await MysqlReq.awaitLockStatePromises();

    if (await MysqlReq.isConnected()) {
      _logger.default.log('MysqlReq:connect(), Already connected');

      return MysqlReq.getThreadId();
    }

    if (!MysqlReq.hasConnection()) {
      _logger.default.log('MysqlReq:connect(), No connection');

      MysqlReq.createConnection();
    }

    _logger.default.log('MysqlReq:connect(), Connecting...');

    try {
      _logger.default.log('MysqlReq:connect(), locking');

      MysqlReq.lock(new Promise((resolve, reject) => {
        MysqlReq.getConnection().connect(err => err && reject(err) || resolve(true));
      }));
      await MysqlReq.awaitLockStatePromises();

      _logger.default.log(`MysqlReq:connect(), Connected to database, threadId: ${MysqlReq.getThreadId()}`);
    } catch (err) {
      _logger.default.log('MysqlReq:connect(), trouble connecting threw: ', err);
    }

    return MysqlReq.getThreadId();
  }

  static async disconnect() {
    await MysqlReq.awaitLockStatePromises();

    if (!(await MysqlReq.isConnected())) {
      _logger.default.log('MysqlReq:disconnect(), isConnected: false');

      return;
    }

    _logger.default.log('MysqlReq:disconnect(), isConnected: true', MysqlReq.getThreadId());

    try {
      _logger.default.log('MysqlReq:disconnect(), locking');

      MysqlReq.lock(new Promise((resolve, reject) => {
        MysqlReq.getConnection().end(err => err && reject(err) || resolve(true));
      }));
      await MysqlReq.awaitLockStatePromises();
      mysqlConnection = null;
    } catch (err) {
      _logger.default.log('MysqlReq:disconnect(), difficulties disconnecting', err);
    }

    let isConn = await MysqlReq.isConnected();

    _logger.default.log('MysqlReq:disconnect() end isConnected:', isConn, ' threadId', MysqlReq.getThreadId());
  }

  static async query({
    sql,
    values,
    after
  }) {
    let res = null;
    await MysqlReq.awaitLockStatePromises();
    let isConn = await MysqlReq.isConnected();

    if (!isConn) {
      _logger.default.log('MysqlReq.query() You did not connect manually, attempting automatic connection');

      await MysqlReq.connect();
    }

    try {
      res = await new Promise((resolve, reject) => {
        const cb = (err, result) => err ? reject(err) : resolve(result);

        if (values) MysqlReq.getConnection().query(sql, values, cb);else MysqlReq.getConnection().query(sql, cb);
      });
    } catch (err) {
      _logger.default.log('MysqlReq.query() failed', {
        sqlMessage: err.sqlMessage,
        sql: err.sql,
        sqlState: err.sqlState
      }, err);
    }

    if (typeof after === 'function') {
      after(res);
    }

    return res;
  }

  static async awaitLockStatePromises() {
    if (MysqlReq.isLocked()) {
      try {
        await lockedStatePromise;

        _logger.default.log('MysqlReq:awaitLockStatePromises(), finished waiting lockedStatePromise');

        MysqlReq.unlock();
      } catch (err) {
        _logger.default.log('MysqlReq:awaitLockStatePromises(), error', err);
      }
    }
  }

  static lock(promise) {
    lockedStatePromise = promise;
    locked = true;

    _logger.default.log('MysqlReq:lock(), locked:', locked);
  }

  static unlock() {
    lockedStatePromise = null;
    locked = false;

    _logger.default.log('MysqlReq:unlock(), locked:', locked);
  }

  static isLocked() {
    _logger.default.log('MysqlReq:isLocked(), locked:', locked);

    return locked;
  }

}

var _default = MysqlReq;
exports.default = _default;