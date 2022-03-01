export const help = [
  {
    noDividers: true,
    text: "The script enumerates all hosts inside the --origin and farms em all.\nThe entire farming process should be automatic, meaning you dont need to have hacked the server to use the script against it.\nAll arguments passed for this script should have a shorthand flag. If you can do --deep you should be able to do -d",
  },
  {
    title: "Example",
    text: "run discovery.js --origin foodnstuff | run discovery.js -o foodnstuff",
  },
  {
    title: "Options",
    text: `\n${[
      "-h or --help: shows help for the script (what ur seeing right now baby",
      "-o or --origin: sets the target for the script. Must be provided.",
      "-d or --deep: defines if the script should upload itself to hacked machines and run copies to farm servers inside the network. Defaults to false.",
    ].join("\n")}`,
  },
];

function conditionalPrintDivider(ns, options, forceOff) {
  if (options.dividers && !forceOff) {
    ns.tprint("==========================");
  }
}

export const useHelp = (
  ns,
  options = {
    dividers: true,
  }
) => {
  help.forEach(
    ({ title = false, text, noDividers = false }) => {
      conditionalPrintDivider(ns, options, noDividers);
      ns.tprint(title ? `${title} > ${text}` : `${text}`);
    }
  );

  return 0;
};
