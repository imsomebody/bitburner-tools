import { getHaxes } from "/useables/hax.js";

/**
 * @typedef {Object} ExploitCollection
 * @property {String} file The name of the file.
 * @property {Function} run A function that receives (ns, hostname) used to run the exploit
 */

/**
 * @typedef {Object} MachineResult
 * @property {Number} ram The ammount of ram on the machine
 * @property {ExploitCollection} exploits A collection of exploits. Filtered if options.exploits.filterExploits is true
 * @property {Number} numPortsRequired The ammount of ports required to hack
 */

/**
 * @typedef {Object} ExploitLoadingConfig
 * @property {Boolean} useExploits If true, loads the .exe exploits that the machine contains
 * @property {Boolean} filterExploits If true filters the exploit list to only contain the ones that actually exist in the hostname
 * @property {Boolean} search The search to be used when running ls. Defaults to .exe
 */

/**
 * @typedef {Object} MachineLoadingOptions
 * @property {Boolean} loadRam If true loads the ammount of ram in the hostname
 * @property {Boolean} loadMoney If true loads money information from the hostname
 * @property {Boolean} loadNumPorts If true loads the required ammount of ports required to hack the machine
 * @property {String} hostname The target hostname. Defaults to home
 * @property {ExploitLoadingConfig} exploits Exploit configuration. This is actually used to run exploits on another machine, not to run exploits on the machine being loaded.
 */

/**
 * Gets information from a machine.
 * Default options is a basic search for the local machine home.
 * @param {BitburnerAPI} ns
 * @param {MachineLoadingOptions} options
 * @returns MachineResult
 */
export default function useMachine(
  ns,
  options = {
    loadRam: false,
    loadMoney: false,
    loadNumPorts: false,
    hostname: "home",
    exploits: {
      useExploits: true,
      filterExploits: true,
      search: ".exe",
    },
  }
) {
  const machine = {
    ram: options.loadRam ? ns.getServerRam("home") : null,
    exploits: null,
  };

  // Exploit mapping
  if (options.exploits.useExploits) {
    const ls = ns.ls(
      options.hostname,
      options.exploits.search
    );
    const haxesList = getHaxes();

    machine.exploits = options.exploits.filterExpoits
      ? haxesList.filter(({ file }) => {
          return ls.includes(file);
        })
      : haxesList;
  }

  // Required Ports Ammount
  if (options.loadNumPorts) {
    machine.numPortsRequired = ns.getServerNumPortsRequired(
      options.hostname
    );
  }

  if (options.loadMoney) {
    // Security
    machine.money.securityLevel = ns.getServerSecurityLevel(
      options.hostname
    );
    machine.money.minSecurityLevel =
      ns.getServerMinSecurityLevel(options.hostname);

    // Money
    machine.money.moneyAmmount = ns.getServerMoneyAvailable(
      options.hostname
    );
    machine.money.maxMoneyAmmount = ns.getServerMaxMoney(
      options.hostname
    );
  }

  return machine;
}
