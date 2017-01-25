import Docker from 'dockerode';
import async from 'async';

import config from './config';
import * as returnCode from './returnCode';

let docker;
if (config.socketPath && config.socketPath !== 'null') {
  docker = new Docker({
    socketPath: config.socketPath,
  });
} else if (config.host && config.port) {
  docker = new Docker({
    host: config.host,
    port: config.port,
  });
} else {
  console.log('Cannot found docker socket config.');
  process.exit();
}

const getAllContainers = () => new Promise((resolve, reject) => {
  docker.listContainers((err, containers) => {
    if (err) {
      return reject(err);
    }
    return resolve(containers);
  });
});

const getContainerByName = async(name) => {
  let containers;
  try {
    containers = await getAllContainers();
  } catch (err) {
    throw new Error(err);
  }
  let result = null;
  for (const container of containers) {
    for (const containerName of container.Names) {
      if (containerName.substr(1) === name) {
        result = container;
        break;
      }
      if (result) break;
    }
  }
  return result;
};

const getContainerById = async(id) => {
  let containers;
  try {
    containers = await getAllContainers();
  } catch (err) {
    throw new Error(err);
  }
  let result = null;
  for (const container of containers) {
    if (container.Id === id) {
      result = container;
      break;
    }
  }
  return result;
};

const getEnv = (id) => {
  const container = docker.getContainer(id);
  return new Promise((resolve, reject) => {
    container.inspect((err, inspect) => {
      if (err) {
        return reject(err);
      }
      return resolve(inspect.Config.Env);
    });
  });
};

const buildContainerStatus = (data, callback) => {
  getEnv(data.Id).then(env => callback(null, {
    id: data.Id,
    name: data.Names[0].substr(1),
    state: data.State,
    status: data.Status,
    ports: data.Ports,
    env,
  })).catch(err => callback(err));
};

const buildResult = containers => new Promise((resolve, reject) => {
  async.map(containers, buildContainerStatus, (err, result) => {
    if (err) {
      return reject(err);
    }
    return resolve(result);
  });
});

export const getByName = async (ctx, name) => {
  let container;
  try {
    container = await getContainerByName(name);
  } catch (err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  if (!container) {
    ctx.body = JSON.stringify(returnCode.containerNotFound(name));
  } else {
    const result = buildContainerStatus(container);
    ctx.body = JSON.stringify(returnCode.resultOk(result));
  }
};

export const getById = async (ctx, id) => {
  let container;
  try {
    container = await getContainerById(id);
  } catch (err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  if (!container) {
    ctx.body = JSON.stringify(returnCode.containerNotFound(id));
  } else {
    const result = buildContainerStatus(container);
    ctx.body = JSON.stringify(returnCode.resultOk(result));
  }
};

export const getAll = async (ctx) => {
  let result = [];
  try {
    const containers = await getAllContainers();
    result = await buildResult(containers);
  } catch (err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  ctx.body = JSON.stringify(returnCode.resultOk(result));
};
