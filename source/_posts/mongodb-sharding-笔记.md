title: mongodb sharding 笔记
date: 2015-03-04 17:57:34
tags: [mongo,sharding]
---



笔记：MongoDB - The Definitive Guide

<http://docs.mongodb.org/manual/sharding>

### When to Shard

* You’ve run out of disk space on your current machine.
* You want to write data faster than a single mongod can handle.
* Youwanttokeepalargerproportionofdatainmemorytoimproveperformance.

<!--more-->

### The Key to Sharding: Shard Keys

When you set up sharding, you choose a key from a collection and use that key’s values to split up the data. This key is called a shard key.

Let’s look at an example to see how this works: suppose we had a collection of documents representing people. If we chose "name" as our shard key, one shard could hold documents where the "name" started with A–F, the next shard could hold names from G–P, and the final shard would hold names from Q–Z. As you added (or removed) shards, MongoDB would rebalance this data so that each shard was getting a balanced amount of traffic and a sensible amount of data (e.g., if a shard is getting a lot of traffic, it might have less data than a shard with data that is less “hot”).

If we choose to shard on something like "timestamp", where the value is probably going to increase and not jump around a lot, we’ll be sending all of the inserts to one shard (the one with the [June 27, 2003, ∞] chunk). Notice that, if we add a new shard and it splits the data again, we’ll still be inserting on just one server. If we add a new shard, MongoDB might split [June 27, 2003, ∞] into [June 27, 2003, December 12, 2010) and [December 12, 2010, ∞]. We’ll always have a chunk that will be “some date through infinity,” which is where our inserts will be going. This isn’t good for a very high write load, but it will make queries on the shard key very efficient.


### Setting Up Sharding

Sharding basically involves three different components working together:

###### shard
A shard is a container that holds a subset of a collection’s data. A shard is either a single mongod server (for development/testing) or a replica set (for production). Thus, even if there are many servers in a shard, there is only one master, and all of the servers contain the same data.

###### mongos
This is the router process and comes with all MongoDB distributions. It basically just routes requests and aggregates responses. It doesn’t store any data or configuration information. (Although it does cache information from the config servers.)

######config server
Config servers store the configuration of the cluster: which data is on which shard. Because mongos doesn’t store anything permanently, it needs somewhere to get the shard configuration. It syncs this data from the config servers.

If you are working with MongoDB already, you probably have a shard ready to go. (Your current mongod can become your first shard.) The following section shows how to create a new shard from scratch, but feel free to use your existing database instead.

### Starting the Servers
First we need to start up our config server and mongos. The config server needs to be started first, because mongos uses it to get its configuration. The config server can be started like any other mongod process:

```
mkdir -p ~/dbs/config
mongod --dbpath ~/dbs/config --port 20000
```
Now you need a mongos process for your application to connect to. Routing servers don’t even need a data directory, but they need to know where the config server is:

```
mongos --port 30000 --configdb localhost:20000
```

###### Adding a shard

A shard is just a normal mongod instance (or replica set):
```
mkdir -p ~/dbs/shard1
mongod --dbpath ~/dbs/shard1 --port 10000
```

Now we’ll connect to the mongos process we started and add the shard to the cluster.
Start up a shell connected to your mongos:

```
mongo localhost:30000/admin
```

Make sure you’re connected to mongos, not a mongod. Now you can add this shard with
the addshard database command:

```
db.runCommand({addshard : "localhost:10000", allowLocal : true})
```


### Sharding Data

Let’s look at an example: we’ll shard the bar collection in the foo database on the "_id" key. First, we enable sharding for foo:


```
db.runCommand({"enablesharding" : "foo"})
db.runCommand({"shardcollection" : "foo.bar", "key" : {"_id" : 1}})
```


### Production Configuration

The example in the previous section is fine for trying sharding or for development. However, when you move an application into production, you’ll want a more robust setup. To set up sharding with no points of failure, you’ll need the following:

* Multiple config servers • Multiplemongosservers
* Replica sets for each shard
* w set correctly (see the previous chapter for information on w and replication)

###### A Robust Config

Setting up multiple config servers is simple. As of this writing, you can have one config server (for development) or three config servers (for production).

Setting up multiple config servers is the same as setting up one; you just do it three times:

```
mkdir -p ~/dbs/config1 ~/dbs/config2 ~/dbs/config3
mongod --dbpath ~/dbs/config1 --port 20001
mongod --dbpath ~/dbs/config2 --port 20002
mongod --dbpath ~/dbs/config3 --port 20003
```

Then, when you start a mongos, you should connect it to all three config servers:
```
mongos --configdb localhost:20001,localhost:20002,localhost:20003
```

Config servers use two-phase commit, not the normal MongoDB asynchronous repli- cation, to maintain separate copies of the cluster’s configuration. This ensures that they always have a consistent view of the cluster’s state. It also means that if a single config server is down, the cluster’s configuration information will go read-only. Clients are still able to do both reads and writes, but no rebalancing will happen until all of the config servers are back up.


###### Many mongos

You can also run as many mongos processes as you want. One recommended setup is to run a mongos process for every application server. That way, each application server can talk to mongos locally, and if the server goes down, no one will be trying to talk to a mongos that isn’t there.

###### A Sturdy Shard
In production, each shard should be a replica set. That way, an individual server can fail without bringing down the whole shard. To add a replica set as a shard, pass its name and a seed to the addshard command.
For example, say we have a replica set named "foo" containing a server at prod.example.com:27017 (among other servers). We could add this set to the cluster with the following:
```
db.runCommand({"addshard" : "foo/prod.example.com:27017"})
```
If prod.example.com goes down, mongos will know that it is connected to a replica set
and use the new primary for that set.

###### Physical Servers
This may seem like an overwhelming number of machines: three config servers, at least two mongods per shard, and as many mongos processes as you want. However, not ev- erything has to have its own machine. The main thing to avoid is putting an entire component on one machine. For example, avoid putting all three config servers, all of your mongos processes, or an entire replica set on one machine. However, a config server and mongos processes can happily share a box with a member of a replica set.
