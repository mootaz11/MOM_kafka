const program = require("commander");
const publish = require("./producer");


program
    .version('0.0.1')
    .usage('[options] <message>')
    .option('-t, --topic [topic]', 'Kafka topic', 'test')
    .parse(process.argv);

const message = program.args.join(' ');
console.log('Topic:',program.topic);
console.log('message : ',message);

publish(program.topic,message);
