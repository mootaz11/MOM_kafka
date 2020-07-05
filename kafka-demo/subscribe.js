const node_kafka = require("kafka-node");
const kafka_port = "localhost:9092";


function subscribe (topic,callback){

    const client = new node_kafka.KafkaClient({kafka_port});
    const  topics  = [{ topic: topic, partition: 0 }];
    const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
    const consumer = new node_kafka.Consumer(client,topics,options);
    consumer.on('error',(err)=>{
        if(err) 
        {
            throw err ;
        }
            });
    client.refreshMetadata([topic],(err)=>{
        if(err){
            throw err ;
        }
        const offset = new node_kafka.Offset(client);

        consumer.on('message',message=>{
        callback(message);
        });

        consumer.on('offsetOutOfRange',topic=>{
            offset.fetch([topic],(err,offsets)=>{
                if(err)
                {
                    throw err ; 
                }
                const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
                consumer.setOffset(topic.topic, topic.partition, min);

            });
        });
    });

  

}


module.exports = subscribe;