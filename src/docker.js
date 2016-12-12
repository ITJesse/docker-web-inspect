import Docker from 'dockerode';
import config from './config';
import * as returnCode from './returnCode';

let docker;
if(config.socketPath && config.socketPath != 'null') {
  docker = new Docker({ socketPath: config.socketPath });
}
else if(config.host && config.port) {
  docker = new Docker({ host: config.host, port: config.port });
}
else {
  console.log("Cannot found docker socket config.");
  process.exit();
}

const getAllContainers = () => {
  return new Promise((resolve, reject) => {
    docker.listContainers((err, containers) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(containers);
      }
    });
  });
};

const getContainerByName = async (name) => {
  let containers;
  try {
    containers = await getAllContainers();
  } catch(err) {
    throw new Error(err);
  }
  let result = null;
  for(let container of containers) {
    for(let containerName of container.Names) {
      if(containerName.substr(1) == name) {
        result = container;
        break;
      }
      if(result) break;
    }
  }
  return result;
};

const getContainerById = async (id) => {
  let containers;
  try {
    containers = await getAllContainers();
  } catch(err) {
    throw new Error(err);
  }
  let result = null;
  for(let container of containers) {
    if(container.Id == id) {
      result = container;
      break;
    }
  }
  return result;
};

const buildContainerStatus = (data) => {
  return {
    id: data.Id,
    name: data.Names[0].substr(1),
    state: data.State,
    status: data.Status,
    ports: data.Ports
  };
};

export const getByName = async (ctx, name) => {
  let container;
  try {
    container = await getContainerByName(name);
  } catch(err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  if(!container) {
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
  } catch(err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  if(!container) {
    ctx.body = JSON.stringify(returnCode.containerNotFound(id));
  } else {
    const result = buildContainerStatus(container);
    ctx.body = JSON.stringify(returnCode.resultOk(result));
  }
};

export const getAll = async (ctx) => {
  let containers;
  try {
    containers = await getAllContainers();
  } catch(err) {
    ctx.body = JSON.stringify(returnCode.serverError());
    throw new Error(err);
  }
  const result = containers.map((contianer) => {
    return buildContainerStatus(contianer);
  });
  ctx.body = JSON.stringify(returnCode.resultOk(result));
};
