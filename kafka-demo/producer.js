const kafka_node = require("kafka-node");
const kafkahost = 'localhost:9092';

function  publish (topic,message)
{
    const client = new kafka_node.KafkaClient({kafkahost});
    const producer = new kafka_node.Producer(client);
    producer.on('ready',()=>{
        client.refreshMetadata([topic],(err)=>{
            if(err)
            {
                throw err;
            }
            console.log(`sending message to ${topic} : ${message}`);
            producer.send([{topic,messages:[message]}],
                (err,result)=>{
                    if(err){
                        throw err
                    }
                    else {
                        console.log(result);
                    }   
                    process.exit();
                })
        })
    });
    producer.on('error',(err)=>{
        console.log('error',err);
    })

}

module.exports=publish;
