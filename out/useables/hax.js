export const dictionary = {
  "BruteSSH.exe": {
    file: "BruteSSH.exe",
    run: (ns, host) => ns.brutessh(host),
  },
  "FTPCrack.exe": {
    file: "FTPCrack.exe",
    run: (ns, host) => ns.ftpcrack(host),
  },
  "relaySMTP.exe": {
    file: "relaySMTP.exe",
    run: (ns, host) => ns.relaysmtp(host),
  },
  "HTTPWorm.exe": {
    file: "HTTPWorm.exe",
    run: (ns, host) => ns.httpworm(host),
  },
  "SQLInject.exe": {
    file: "SQLInject.exe",
    run: (ns, host) => ns.sqlinject(host),
  },
};

export const getHaxes = () => {
  return Object.values(dictionary);
};
