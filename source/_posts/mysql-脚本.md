---
title: mysql 脚本
date: 2018-08-30 23:18:35
tags: [mysql, script]
---

<http://www.ntu.edu.sg/home/ehchua/programming/sql/MySQL_Intermediate.html>

<!--more-->

### Running Script in Batch Mode

To run a script in batch (non-interactive) mode, start a mysql client and redirect the script as the input, as follows:

```bash
mysql -u username -p < path_to_scriptName.sql
```

The input redirection operator '<' re-directs the input from the file, instead of the default standard input (i.e., keyboard). You may provide an absolute or relative path of the filename. You may need to double quote the filename if it contains special characters such as blank (strongly discouraged!).

### Identifiers and Backquotes

Identifiers (such as database names, table names and column names) must be back-quoted if they contain blanks and special characters; or are reserved word, e.g., `date`, `order`, `desc` (reserved words), `Customer Name` (containing space).

### String Literals

A string literal (or string value) is enclosed by a pair of single quotes (e.g., 'a string') (recommended); or a pair of double quotes (e.g., "a string").

### Variables

There are various types of variables in MySQL: System variables (system-wide), user-defined variables (within a connection) and local variables (within a stored function/procedure).

User-Defined Variables: A user-defined variable begins with a '@' sign, e.g., @myCount, @customerCreditLimit. A user-defined variable is connection-specific, and is available within a connection. A variable defined in one client session is not visible by another client session. You may use a user-defined variable to pass a value among SQL statements within the same connection.

In MySQL, you can define a user variables via:

```sql
SET @varname = value or (SET @varname := value)
SELECT @varname := value ...
SELECT columnName INTO @varname ...
```

For examples

```sql
mysql> SET @today = CURDATE();    -- can use = or :=
mysql> SELECT name FROM patients WHERE nextVisitDate = @today;  -- can use the variable within the session
 
mysql> SET @v1 = 1, @v2 = 2, @v3 = 3;
mysql> SELECT @v1, @v2, @v3, @v4 := @v1 + @v2;  -- Use := in SELECT, because = is for comparison
 
mysql> SELECT @ali_dob := dateOfBirth FROM patients WHERE name = 'Ali';
mysql> SELECT dateOfBirth INTO @kumar_dob FROM patients WHERE name = 'kumar';
mysql> SELECT name WHERE dateOfBirth BETWEEN @ali_dob AND @kumar_dob;
```

### Prepared Statement

A prepared statement (or parameterized statement) contains placeholders for input parameters. You can reuse the same prepared statement many times, with different inputs. Prepared statements are often pre-compiled, which are more efficient than the normal statements.

1. Allocate a prepared statement, with placeholders indicated as ?.
2. Set the inputs.
3. Execute the prepared statement with the inputs (for the placeholders).
4. Repeat Step 2 and 3 for another execution.
5. Deallocate the prepared statement.

Example

```sql
PREPARE pstmt FROM 'SELECT * FROM products WHERE productCode = ? AND quantity <= ?';
SET @productCode = 'PEC';                    -- Set variables
SET @quantity = 200;
EXECUTE pstmt USING @productCode, @quantity;
    -- list the variables in the same order as the ?'s
 
-- Another invocation with different inputs
SET @quantity = 500;
EXECUTE pstmt USING @productCode, @quantity;
 
DEALLOCATE PREPARE pstmt;
```

Example

```sql
SET @query = 'INSERT INTO products VALUES (?, ?, ?, ?, ?)';
PREPARE pstmt FROM @query;
SET @productID = NULL;
SET @productCode = 'PEC';
SET @name = 'Pencil HB';
SET @quantity = 500;
SET @price = 0.49;
EXECUTE pstmt USING @productID, @productCode, @name, @quantity, @price;  
    -- list the variables in the same order as the ?'s
DEALLOCATE PREPARE pstmt;
```

### Compound Statement

A compound statement comprises multiple statements, treated as a unit. A compound statement is enclosed within BEGIN ... END. Each of the statements is terminated with ';' (called statement delimiter). As the "statement delimiter" crashes with the "end-of-statement" delimiter of the mysql client (which signals the client to send the statement to the server for processing), we need to use DELIMITER command to temporarily change the "end-of-statement" delimiter for the mysql client. For example,

```sql
-- Change the "end-of-statement" delimiter from ';' to '//'
DELIMITER //
   
CREATE PROCEDURE procedureName (parameters)
BEGIN
   -- Declaring local variables having scope within BEGIN ... END.
   DECLARE variableName1 [, variablesName2 ...] type [DEFAULT value];
   statement1;
   ....
   statementN;
END//   -- end-of-statement for CREATE PROCEDURE

-- Restore the "end-of-statement" delimiter to default of ';'
DELIMITER ;
```

#### Local Variables

Within a compound statement enclosed by BEGIN ... END, we can declare local variables using DECLARE statement, specifying its name, type and optional default value. The scope of the local variables is within the BEGIN ... END. We can use the SET command to assign value to the local variables.

We can also use "SELECT ... INTO variableName1 [, variableName2 ...]" to assign a value to local variable(s) from a query. The "SELECT ... INTO" should return a single row. You may use "LIMIT 1" to limit the output of SELECT to a single row with proper selection criteria and ordering.



### Stored Procedures

You can use parameters to pass data into and receive data from a stored procedure by declaring the direction of the parameters as IN, OUT, or INOUT. The received data are often placed in user-defined variables.

You can use a compound statement, consisting of multiple statements, as the body of the CREATE PROCEDURE. A compound statement is enclosed between BEGIN and END. As each of the statements is terminated by semi-colon, which crashes with MySQL statement terminator, we have to use DELIMITER to change the MySQL's delimiter.

### User-Defined Functions

A function returns a scalar value, via the statement RETURN. All parameters are IN parameters.
