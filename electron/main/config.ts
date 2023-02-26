import { join } from "node:path";

const distElectronPath = join(__dirname, "../");
const distPath = join(distElectronPath, "../dist");
const publicPath = process.env.VITE_DEV_SERVER_URL ? join(distElectronPath, "../public") : distPath;

process.env.DIST_ELECTRON = distElectronPath;
process.env.DIST = distPath;
process.env.PUBLIC = publicPath;

const Config = {
    serverUrl: process.env.VITE_DEV_SERVER_URL,
    indexPath: join(process.env.DIST, "index.html"),
    windowWidth: 400,
    windowHeight: 250,
    distElectronPath,
    distPath,
    publicPath,
};

export default Config;
