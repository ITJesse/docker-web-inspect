const config = {
  socketPath: process.env.DOCKER_SOCKET_PATH
    ? process.env.DOCKER_SOCKET_PATH
    : '/var/run/docker.sock',
  host: process.env.DOCKER_HOST ? process.env.DOCKER_HOST : null,
  port: process.env.DOCKER_PORT ? process.env.DOCKER_PORT: null,
  name: process.env.WEB_AUTH_NAME ? process.env.WEB_AUTH_NAME: "docker",
  pass: process.env.WEB_AUTH_PASS ? process.env.WEB_AUTH_PASS: "docker"
};

export default config;
