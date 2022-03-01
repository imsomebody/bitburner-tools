import useMachine from "./useables/machine";
import { useHelp } from "./useables/help";
import { terror } from "./useables/tools";

export async function main(ns) {
  const args = ns.flags([
    ["help", false],
    ["h", false],
    ["origin", false],
    ["o", false],
    ["d", false],
    ["deep", false],
  ]);

  // --help or -h exit
  if (args.help || args.h) {
    return useHelp(ns);
  }

  if (!args.origin && !args.o) {
    terror(ns, "Argument --origin or -o must be provided");
    return -1;
  }

  const localMachine = useMachine(ns);
  const targetMachine = useMachine(ns, {
    hostname: args.origin,
    loadMoney: true,
    loadNumPorts: true,
    exploits: {
      useExploits: false,
    },
  });
}
