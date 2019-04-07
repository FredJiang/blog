---
title: Database Commands 笔记
date: 2015-02-25 11:21:39
tags: [mongo, command, note]
---

笔记：MongoDB - The Definitive Guide

One example of a database command that you are probably familiar with is drop: to drop a collection from the shell, we run db.test.drop(). Under the hood, this function is actually running the drop command—we can perform the exact same operation using runCommand:

<!--more-->

```
> db.runCommand({"drop" : "test"});
{
"nIndexesWas" : 1,
"msg" : "indexes dropped for collection", "ns" : "test.test",
"ok" : true
}
```

The document we get as a result is the command response, which contains information about whether the command was successful, as well as any other information that the command might provide. The command response will always contain the key "ok". If "ok" is true, the command was successful, and if it is false, the command failed for some reason.

If "ok" is false, then an additional key will be present, "errmsg". The value of "errmsg" is a string explaining why the command failed. As an example, let’s try running the drop command again, on the collection that we just dropped:

```
> db.runCommand({"drop" : "test"});
{ "errmsg" : "ns not found", "ok" : false }
```

Commands in MongoDB are actually implemented as a special type of query that gets performed on the $cmd collection. runCommand just takes a command document and performs the equivalent query, so our drop call becomes the following:

```
db.$cmd.findOne({"drop" : "test"});
```

When the MongoDB server gets a query on the $cmd collection, it handles it using special logic, rather than the normal code for handling queries. Almost all MongoDB drivers provide a helper method like runCommand for running commands, but commands can always be run using a simple query if necessary.

Some commands require administrator access and must be run on the admin database. If such a command is run on any other database, it will return an “access denied” error.