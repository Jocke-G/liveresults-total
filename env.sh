#!/bin/bash

filename="./env.js"

# Recreate config file
rm -rf ${filename}
touch ${filename}

# Add assignment
echo "(function (window) {" >> ${filename}
echo "  window.__env = window.__env || {};" >> ${filename}

varname="sentry_dsn"
value=$(printf '%s\n' "${!varname}")
[[ -n $value ]] && echo "  window.__env.$varname = \"$value\";" >> ${filename}

varname="sentry_environment"
value=$(printf '%s\n' "${!varname}")
[[ -z $value ]] && value="production"
echo "  window.__env.$varname = \"$value\";" >> ${filename}

varname="liveresults_server"
value=$(printf '%s\n' "${!varname}")
[[ -z $value ]] && value="https://liveresultat.orientering.se"
echo "  window.__env.$varname = \"$value\";" >> ${filename}

echo "}(this));" >> ${filename}
