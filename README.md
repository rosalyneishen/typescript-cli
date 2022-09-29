# HELLO,

Thanks for taking a look. 

I added an extra argument to the command that runs the code in the terminal. You can provide an additional boolean value after your charitiesPath and profilePath values. The extra boolean parameter is for customTailoring (part II of the given assignment). If you want to use the custom tailoring to filter the results based off profile.hasPets then pass in 'true'

## To run locally:

install dependencies based off package.json
```bash
npm install
```

```bash
node index.js data/charities.csv data/example-profile.csv true
```

OR for no customTailoring:

```bash
node index.js data/charities.csv data/example-profile.csv
```

IF for whatever reason the vanilla javascript files are not showing up then run this command to compile the Typescript to Javascript:

```bash
tsc index.ts
```