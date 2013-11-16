pushd `dirname $0` > /dev/null
../../bin/_node -lp -v -f -c builtins._js
mv builtins.js ../callbacks

../../bin/_node -lp -v -f -c compile._js
cat compile.js | sed -e "s/\/\/\/ \!doc//" > ../callbacks/compile.js
rm compile.js

../../bin/_node -lp -v -f --fibers -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../fibers/builtins.js
rm builtins.js

../../bin/_node -lp -v -f --fibers --fast -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../fibers-fast/builtins.js
rm builtins.js

../../bin/_node -lp -v -f --generators -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../generators/builtins.js
rm builtins.js

../../bin/_node -lp -v -f --generators --fast -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../generators-fast/builtins.js
rm builtins.js

../../bin/_node -lp -v -f -c ../streams/client/streams._js

pushd ../util > /dev/null

../../bin/_node -lp -v -f -c flows._js
mv flows.js ../callbacks

../../bin/_node -lp -v -f --fibers -c flows._js
cat flows.js | sed -e "s/\/\/\/ \!doc//" > ../fibers/flows.js
rm flows.js

../../bin/_node -lp -v -f --fibers --fast -c flows._js
cat flows.js | sed -e "s/\/\/\/ \!doc//" > ../fibers-fast/flows.js
rm flows.js

../../bin/_node -lp -v -f --generators -c flows._js
cat flows.js | sed -e "s/\/\/\/ \!doc//" > ../generators/flows.js
rm flows.js

../../bin/_node -lp -v -f --generators --fast -c flows._js
cat flows.js | sed -e "s/\/\/\/ \!doc//" > ../generators-fast/flows.js
rm flows.js

popd > /dev/null

# compile test files for client too
pushd ../../test/common > /dev/null
../../bin/_node -lp -v -f -c .
mv eval-test.js flows-test.js stack-test.js futures-test.js callbacks
../../bin/_node --generators -v -f -c .
mv eval-test.js flows-test.js stack-test.js futures-test.js generators
popd > /dev/null
popd > /dev/null
