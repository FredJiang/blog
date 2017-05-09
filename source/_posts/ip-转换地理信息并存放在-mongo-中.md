---
title: ip 转换地理信息并存放在 mongo 中
date: 2017-05-03 15:27:14
tags: [ip, GeoLite, maxmind]
---


首先下载 ip 和国家的对应数据

下载页面

<http://dev.maxmind.com/geoip/legacy/geolite/>


我这只用国家信息

`wget "http://geolite.maxmind.com/download/geoip/database/GeoIPCountryCSV.zip"`


<!--more-->

解压 

unzip GeoIPCountryCSV.zip

数据分析

<http://dev.maxmind.com/geoip/legacy/csv/>


`head GeoIPCountryWhois.csv`

```
"1.0.0.0","1.0.0.255","16777216","16777471","AU","Australia"
"1.0.1.0","1.0.3.255","16777472","16778239","CN","China"
"1.0.4.0","1.0.7.255","16778240","16779263","AU","Australia"
"1.0.8.0","1.0.15.255","16779264","16781311","CN","China"
"1.0.16.0","1.0.31.255","16781312","16785407","JP","Japan"
"1.0.32.0","1.0.63.255","16785408","16793599","CN","China"
"1.0.64.0","1.0.127.255","16793600","16809983","JP","Japan"
"1.0.128.0","1.0.255.255","16809984","16842751","TH","Thailand"
"1.1.0.0","1.1.0.255","16842752","16843007","CN","China"
"1.1.1.0","1.1.1.255","16843008","16843263","AU","Australia"
```


ip 地址和 10 进制的转换规则如下

```
address = '174.36.207.186'
 
( o1, o2, o3, o4 ) = address.split('.')
 
integer_ip =   ( 16777216 * o1 )
             + (    65536 * o2 )
             + (      256 * o3 )
             +              o4
```


```
integer_ip = 2921648058
 
o1 = int ( ipnum / 16777216 ) % 256;
o2 = int ( ipnum / 65536    ) % 256;
o3 = int ( ipnum / 256      ) % 256;
o4 = int ( ipnum            ) % 256;
 
address = ( o1, o2, o3, o4 ).join('.')
```

处理刚下载的数据，用于 mongo 的 `mongoimport` 命令

添加一行头

`(echo "ip_start,ip_end,ip_decimal_start,ip_decimal_end,country,country_name" && cat GeoIPCountryWhois.csv) > GeoIPCountryWhoisHead.csv`

去掉引号

`sed 's/\"//8; s/\"//7; s/\"//6; s/\"//5;' GeoIPCountryWhoisHead.csv > GeoIPCountryWhoisHeadQuote.csv`


得到如下数据

`head GeoIPCountryWhoisHeadQuote.csv`

```
ip_start,ip_end,ip_decimal_start,ip_decimal_end,country,country_name
"1.0.0.0","1.0.0.255",16777216,16777471,"AU","Australia"
"1.0.1.0","1.0.3.255",16777472,16778239,"CN","China"
"1.0.4.0","1.0.7.255",16778240,16779263,"AU","Australia"
"1.0.8.0","1.0.15.255",16779264,16781311,"CN","China"
"1.0.16.0","1.0.31.255",16781312,16785407,"JP","Japan"
"1.0.32.0","1.0.63.255",16785408,16793599,"CN","China"
"1.0.64.0","1.0.127.255",16793600,16809983,"JP","Japan"
"1.0.128.0","1.0.255.255",16809984,16842751,"TH","Thailand"
"1.1.0.0","1.1.0.255",16842752,16843007,"CN","China"
```

导入数据库

```
mongoimport \
--host 127.0.0.1 \
--port 27017 \
--db geo \
--collection geoipcountries \
--drop \
--type csv \
--headerline \
--file GeoIPCountryWhoisHeadQuote.csv
```



下面把货币和国家对上

<https://github.com/mambaz/country-js/blob/master/countries.json>

生成 mongo 命令

```
'use strict';

let countries = [{
  "code": "AF",
  "name": "AFGHANISTAN",
  "currency": {
    "currencyName": "AFGHANISTAN AFGHANI",
    "currencyCode": "AFN",
    "currencySymbol": "؋"
  },
  "geo": {
    "latitude": 33.93911,
    "longitude": 67.709953
  },
  "capital": "KABUL",
  "phone": "93"
}, {
  "code": "AL",
  "name": "ALBANIA",
  "currency": {
    "currencyName": "ALBANIAN LEK",
    "currencyCode": "ALL",
    "currencySymbol": "lekë"
  },
  "geo": {
    "latitude": 41.153332,
    "longitude": 20.168331
  },
  "capital": "TIRANA",
  "phone": "355"
}]

console.log('use geo')
console.log('')

for (let country of countries) {
  console.log(`db.geoipcountries.update({ country: "${country.code}" }, { $set: { currencyCode: "${country.currency.currencyCode}" } }, { multi: true })`)
}

console.log('db.geoipcountries.find({ $exists: false })')
```


执行 mongo 命令

mongo < updateCurrencyCode.js

```
use geo

db.geoipcountries.update({ country: "AF" }, { $set: { currencyCode: "AFN" } }, { multi: true })
db.geoipcountries.update({ country: "AL" }, { $set: { currencyCode: "ALL" } }, { multi: true })
db.geoipcountries.update({ country: "DZ" }, { $set: { currencyCode: "DZD" } }, { multi: true })
db.geoipcountries.update({ country: "AS" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "AD" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "AO" }, { $set: { currencyCode: "AOA" } }, { multi: true })
db.geoipcountries.update({ country: "AI" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "AQ" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "AG" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "AR" }, { $set: { currencyCode: "ARS" } }, { multi: true })
db.geoipcountries.update({ country: "AM" }, { $set: { currencyCode: "AMD" } }, { multi: true })
db.geoipcountries.update({ country: "AW" }, { $set: { currencyCode: "AWG" } }, { multi: true })
db.geoipcountries.update({ country: "AU" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "AT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "AZ" }, { $set: { currencyCode: "AZN" } }, { multi: true })
db.geoipcountries.update({ country: "BS" }, { $set: { currencyCode: "BSD" } }, { multi: true })
db.geoipcountries.update({ country: "BH" }, { $set: { currencyCode: "BHD" } }, { multi: true })
db.geoipcountries.update({ country: "BD" }, { $set: { currencyCode: "BDT" } }, { multi: true })
db.geoipcountries.update({ country: "BB" }, { $set: { currencyCode: "BBD" } }, { multi: true })
db.geoipcountries.update({ country: "BY" }, { $set: { currencyCode: "BYR" } }, { multi: true })
db.geoipcountries.update({ country: "BE" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "BZ" }, { $set: { currencyCode: "BZD" } }, { multi: true })
db.geoipcountries.update({ country: "BJ" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "BM" }, { $set: { currencyCode: "BMD" } }, { multi: true })
db.geoipcountries.update({ country: "BT" }, { $set: { currencyCode: "BTN" } }, { multi: true })
db.geoipcountries.update({ country: "BO" }, { $set: { currencyCode: "BOB" } }, { multi: true })
db.geoipcountries.update({ country: "BA" }, { $set: { currencyCode: "BAM" } }, { multi: true })
db.geoipcountries.update({ country: "BW" }, { $set: { currencyCode: "BWP" } }, { multi: true })
db.geoipcountries.update({ country: "BV" }, { $set: { currencyCode: "NOK" } }, { multi: true })
db.geoipcountries.update({ country: "BR" }, { $set: { currencyCode: "BRL" } }, { multi: true })
db.geoipcountries.update({ country: "IO" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "BN" }, { $set: { currencyCode: "BND" } }, { multi: true })
db.geoipcountries.update({ country: "BG" }, { $set: { currencyCode: "BGN" } }, { multi: true })
db.geoipcountries.update({ country: "BF" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "BI" }, { $set: { currencyCode: "BIF" } }, { multi: true })
db.geoipcountries.update({ country: "KH" }, { $set: { currencyCode: "KHR" } }, { multi: true })
db.geoipcountries.update({ country: "CM" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "CA" }, { $set: { currencyCode: "CAD" } }, { multi: true })
db.geoipcountries.update({ country: "CV" }, { $set: { currencyCode: "CVE" } }, { multi: true })
db.geoipcountries.update({ country: "KY" }, { $set: { currencyCode: "KYD" } }, { multi: true })
db.geoipcountries.update({ country: "CF" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "TD" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "CL" }, { $set: { currencyCode: "CLP" } }, { multi: true })
db.geoipcountries.update({ country: "CN" }, { $set: { currencyCode: "CNY" } }, { multi: true })
db.geoipcountries.update({ country: "CX" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "CC" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "CO" }, { $set: { currencyCode: "COP" } }, { multi: true })
db.geoipcountries.update({ country: "KM" }, { $set: { currencyCode: "KMF" } }, { multi: true })
db.geoipcountries.update({ country: "CG" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "CD" }, { $set: { currencyCode: "CDF" } }, { multi: true })
db.geoipcountries.update({ country: "CK" }, { $set: { currencyCode: "NZD" } }, { multi: true })
db.geoipcountries.update({ country: "CR" }, { $set: { currencyCode: "CRC" } }, { multi: true })
db.geoipcountries.update({ country: "HR" }, { $set: { currencyCode: "HRK" } }, { multi: true })
db.geoipcountries.update({ country: "CU" }, { $set: { currencyCode: "CUP" } }, { multi: true })
db.geoipcountries.update({ country: "CY" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "CZ" }, { $set: { currencyCode: "CZK" } }, { multi: true })
db.geoipcountries.update({ country: "DK" }, { $set: { currencyCode: "DKK" } }, { multi: true })
db.geoipcountries.update({ country: "DJ" }, { $set: { currencyCode: "DJF" } }, { multi: true })
db.geoipcountries.update({ country: "DM" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "DO" }, { $set: { currencyCode: "DOP" } }, { multi: true })
db.geoipcountries.update({ country: "EC" }, { $set: { currencyCode: "ECS" } }, { multi: true })
db.geoipcountries.update({ country: "EG" }, { $set: { currencyCode: "EGP" } }, { multi: true })
db.geoipcountries.update({ country: "SV" }, { $set: { currencyCode: "SVC" } }, { multi: true })
db.geoipcountries.update({ country: "GQ" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "ER" }, { $set: { currencyCode: "ERN" } }, { multi: true })
db.geoipcountries.update({ country: "EE" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "ET" }, { $set: { currencyCode: "ETB" } }, { multi: true })
db.geoipcountries.update({ country: "EU.INT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "FK" }, { $set: { currencyCode: "FKP" } }, { multi: true })
db.geoipcountries.update({ country: "FO" }, { $set: { currencyCode: "DKK" } }, { multi: true })
db.geoipcountries.update({ country: "FJ" }, { $set: { currencyCode: "FJD" } }, { multi: true })
db.geoipcountries.update({ country: "FI" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "FR" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "GF" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "TF" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "GA" }, { $set: { currencyCode: "XAF" } }, { multi: true })
db.geoipcountries.update({ country: "GM" }, { $set: { currencyCode: "GMD" } }, { multi: true })
db.geoipcountries.update({ country: "GE" }, { $set: { currencyCode: "GEL" } }, { multi: true })
db.geoipcountries.update({ country: "DE" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "GH" }, { $set: { currencyCode: "GHS" } }, { multi: true })
db.geoipcountries.update({ country: "GI" }, { $set: { currencyCode: "GIP" } }, { multi: true })
db.geoipcountries.update({ country: "GB" }, { $set: { currencyCode: "GBP" } }, { multi: true })
db.geoipcountries.update({ country: "GR" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "GL" }, { $set: { currencyCode: "DKK" } }, { multi: true })
db.geoipcountries.update({ country: "GD" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "GP" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "GU" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "GT" }, { $set: { currencyCode: "QTQ" } }, { multi: true })
db.geoipcountries.update({ country: "GG" }, { $set: { currencyCode: "GGP" } }, { multi: true })
db.geoipcountries.update({ country: "GN" }, { $set: { currencyCode: "GNF" } }, { multi: true })
db.geoipcountries.update({ country: "GW" }, { $set: { currencyCode: "GWP" } }, { multi: true })
db.geoipcountries.update({ country: "GY" }, { $set: { currencyCode: "GYD" } }, { multi: true })
db.geoipcountries.update({ country: "HT" }, { $set: { currencyCode: "HTG" } }, { multi: true })
db.geoipcountries.update({ country: "HM" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "HN" }, { $set: { currencyCode: "HNL" } }, { multi: true })
db.geoipcountries.update({ country: "HK" }, { $set: { currencyCode: "HKD" } }, { multi: true })
db.geoipcountries.update({ country: "HU" }, { $set: { currencyCode: "HUF" } }, { multi: true })
db.geoipcountries.update({ country: "IS" }, { $set: { currencyCode: "ISK" } }, { multi: true })
db.geoipcountries.update({ country: "IN" }, { $set: { currencyCode: "INR" } }, { multi: true })
db.geoipcountries.update({ country: "ID" }, { $set: { currencyCode: "IDR" } }, { multi: true })
db.geoipcountries.update({ country: "IR" }, { $set: { currencyCode: "IRR" } }, { multi: true })
db.geoipcountries.update({ country: "IQ" }, { $set: { currencyCode: "IQD" } }, { multi: true })
db.geoipcountries.update({ country: "IE" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "IM" }, { $set: { currencyCode: "GBP" } }, { multi: true })
db.geoipcountries.update({ country: "IL" }, { $set: { currencyCode: "ILS" } }, { multi: true })
db.geoipcountries.update({ country: "IT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "CI" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "JM" }, { $set: { currencyCode: "JMD" } }, { multi: true })
db.geoipcountries.update({ country: "JP" }, { $set: { currencyCode: "JPY" } }, { multi: true })
db.geoipcountries.update({ country: "JE" }, { $set: { currencyCode: "GBP" } }, { multi: true })
db.geoipcountries.update({ country: "JO" }, { $set: { currencyCode: "JOD" } }, { multi: true })
db.geoipcountries.update({ country: "KZ" }, { $set: { currencyCode: "KZT" } }, { multi: true })
db.geoipcountries.update({ country: "KE" }, { $set: { currencyCode: "KES" } }, { multi: true })
db.geoipcountries.update({ country: "KI" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "KP" }, { $set: { currencyCode: "KPW" } }, { multi: true })
db.geoipcountries.update({ country: "KR" }, { $set: { currencyCode: "KRW" } }, { multi: true })
db.geoipcountries.update({ country: "KW" }, { $set: { currencyCode: "KWD" } }, { multi: true })
db.geoipcountries.update({ country: "KG" }, { $set: { currencyCode: "KGS" } }, { multi: true })
db.geoipcountries.update({ country: "LA" }, { $set: { currencyCode: "LAK" } }, { multi: true })
db.geoipcountries.update({ country: "LV" }, { $set: { currencyCode: "LVL" } }, { multi: true })
db.geoipcountries.update({ country: "LB" }, { $set: { currencyCode: "LBP" } }, { multi: true })
db.geoipcountries.update({ country: "LS" }, { $set: { currencyCode: "LSL" } }, { multi: true })
db.geoipcountries.update({ country: "LR" }, { $set: { currencyCode: "LRD" } }, { multi: true })
db.geoipcountries.update({ country: "LY" }, { $set: { currencyCode: "LYD" } }, { multi: true })
db.geoipcountries.update({ country: "LI" }, { $set: { currencyCode: "CHF" } }, { multi: true })
db.geoipcountries.update({ country: "LT" }, { $set: { currencyCode: "LTL" } }, { multi: true })
db.geoipcountries.update({ country: "LU" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MO" }, { $set: { currencyCode: "MOP" } }, { multi: true })
db.geoipcountries.update({ country: "MK" }, { $set: { currencyCode: "MKD" } }, { multi: true })
db.geoipcountries.update({ country: "MG" }, { $set: { currencyCode: "MGF" } }, { multi: true })
db.geoipcountries.update({ country: "MW" }, { $set: { currencyCode: "MWK" } }, { multi: true })
db.geoipcountries.update({ country: "MY" }, { $set: { currencyCode: "MYR" } }, { multi: true })
db.geoipcountries.update({ country: "MV" }, { $set: { currencyCode: "MVR" } }, { multi: true })
db.geoipcountries.update({ country: "ML" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "MT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MH" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "MQ" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MR" }, { $set: { currencyCode: "MRO" } }, { multi: true })
db.geoipcountries.update({ country: "MU" }, { $set: { currencyCode: "MUR" } }, { multi: true })
db.geoipcountries.update({ country: "YT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MX" }, { $set: { currencyCode: "MXN" } }, { multi: true })
db.geoipcountries.update({ country: "FM" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "MD" }, { $set: { currencyCode: "MDL" } }, { multi: true })
db.geoipcountries.update({ country: "MC" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MN" }, { $set: { currencyCode: "MNT" } }, { multi: true })
db.geoipcountries.update({ country: "ME" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "MS" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "MA" }, { $set: { currencyCode: "MAD" } }, { multi: true })
db.geoipcountries.update({ country: "MZ" }, { $set: { currencyCode: "MZN" } }, { multi: true })
db.geoipcountries.update({ country: "MM" }, { $set: { currencyCode: "MMK" } }, { multi: true })
db.geoipcountries.update({ country: "NA" }, { $set: { currencyCode: "NAD" } }, { multi: true })
db.geoipcountries.update({ country: "NR" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "NP" }, { $set: { currencyCode: "NPR" } }, { multi: true })
db.geoipcountries.update({ country: "NL" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "AN" }, { $set: { currencyCode: "ANG" } }, { multi: true })
db.geoipcountries.update({ country: "NC" }, { $set: { currencyCode: "XPF" } }, { multi: true })
db.geoipcountries.update({ country: "NZ" }, { $set: { currencyCode: "NZD" } }, { multi: true })
db.geoipcountries.update({ country: "NI" }, { $set: { currencyCode: "NIO" } }, { multi: true })
db.geoipcountries.update({ country: "NE" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "NG" }, { $set: { currencyCode: "NGN" } }, { multi: true })
db.geoipcountries.update({ country: "NU" }, { $set: { currencyCode: "NZD" } }, { multi: true })
db.geoipcountries.update({ country: "NF" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "MP" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "NO" }, { $set: { currencyCode: "NOK" } }, { multi: true })
db.geoipcountries.update({ country: "OM" }, { $set: { currencyCode: "OMR" } }, { multi: true })
db.geoipcountries.update({ country: "PK" }, { $set: { currencyCode: "PKR" } }, { multi: true })
db.geoipcountries.update({ country: "PW" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "PA" }, { $set: { currencyCode: "PAB" } }, { multi: true })
db.geoipcountries.update({ country: "PG" }, { $set: { currencyCode: "PGK" } }, { multi: true })
db.geoipcountries.update({ country: "PY" }, { $set: { currencyCode: "PYG" } }, { multi: true })
db.geoipcountries.update({ country: "PE" }, { $set: { currencyCode: "PEN" } }, { multi: true })
db.geoipcountries.update({ country: "PH" }, { $set: { currencyCode: "PHP" } }, { multi: true })
db.geoipcountries.update({ country: "PN" }, { $set: { currencyCode: "NZD" } }, { multi: true })
db.geoipcountries.update({ country: "PL" }, { $set: { currencyCode: "PLN" } }, { multi: true })
db.geoipcountries.update({ country: "PF" }, { $set: { currencyCode: "XPF" } }, { multi: true })
db.geoipcountries.update({ country: "PT" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "PR" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "QA" }, { $set: { currencyCode: "QAR" } }, { multi: true })
db.geoipcountries.update({ country: "RE" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "RO" }, { $set: { currencyCode: "RON" } }, { multi: true })
db.geoipcountries.update({ country: "RU" }, { $set: { currencyCode: "RUB" } }, { multi: true })
db.geoipcountries.update({ country: "RW" }, { $set: { currencyCode: "RWF" } }, { multi: true })
db.geoipcountries.update({ country: "SH" }, { $set: { currencyCode: "SHP" } }, { multi: true })
db.geoipcountries.update({ country: "KN" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "LC" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "PM" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "VC" }, { $set: { currencyCode: "XCD" } }, { multi: true })
db.geoipcountries.update({ country: "WS" }, { $set: { currencyCode: "WST" } }, { multi: true })
db.geoipcountries.update({ country: "SM" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "ST" }, { $set: { currencyCode: "STD" } }, { multi: true })
db.geoipcountries.update({ country: "SA" }, { $set: { currencyCode: "SAR" } }, { multi: true })
db.geoipcountries.update({ country: "SN" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "RS" }, { $set: { currencyCode: "RSD" } }, { multi: true })
db.geoipcountries.update({ country: "SC" }, { $set: { currencyCode: "SCR" } }, { multi: true })
db.geoipcountries.update({ country: "SL" }, { $set: { currencyCode: "SLL" } }, { multi: true })
db.geoipcountries.update({ country: "SG" }, { $set: { currencyCode: "SGD" } }, { multi: true })
db.geoipcountries.update({ country: "SK" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "SI" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "SB" }, { $set: { currencyCode: "SBD" } }, { multi: true })
db.geoipcountries.update({ country: "SO" }, { $set: { currencyCode: "SOS" } }, { multi: true })
db.geoipcountries.update({ country: "ZA" }, { $set: { currencyCode: "ZAR" } }, { multi: true })
db.geoipcountries.update({ country: "GS" }, { $set: { currencyCode: "GBP" } }, { multi: true })
db.geoipcountries.update({ country: "SS" }, { $set: { currencyCode: "SSP" } }, { multi: true })
db.geoipcountries.update({ country: "ES" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "LK" }, { $set: { currencyCode: "LKR" } }, { multi: true })
db.geoipcountries.update({ country: "SD" }, { $set: { currencyCode: "SDG" } }, { multi: true })
db.geoipcountries.update({ country: "SR" }, { $set: { currencyCode: "SRD" } }, { multi: true })
db.geoipcountries.update({ country: "SJ" }, { $set: { currencyCode: "NOK" } }, { multi: true })
db.geoipcountries.update({ country: "SZ" }, { $set: { currencyCode: "SZL" } }, { multi: true })
db.geoipcountries.update({ country: "SE" }, { $set: { currencyCode: "SEK" } }, { multi: true })
db.geoipcountries.update({ country: "CH" }, { $set: { currencyCode: "CHF" } }, { multi: true })
db.geoipcountries.update({ country: "SY" }, { $set: { currencyCode: "SYP" } }, { multi: true })
db.geoipcountries.update({ country: "TW" }, { $set: { currencyCode: "TWD" } }, { multi: true })
db.geoipcountries.update({ country: "TJ" }, { $set: { currencyCode: "TJS" } }, { multi: true })
db.geoipcountries.update({ country: "TZ" }, { $set: { currencyCode: "TZS" } }, { multi: true })
db.geoipcountries.update({ country: "TH" }, { $set: { currencyCode: "THB" } }, { multi: true })
db.geoipcountries.update({ country: "TG" }, { $set: { currencyCode: "XOF" } }, { multi: true })
db.geoipcountries.update({ country: "TK" }, { $set: { currencyCode: "NZD" } }, { multi: true })
db.geoipcountries.update({ country: "TO" }, { $set: { currencyCode: "TOP" } }, { multi: true })
db.geoipcountries.update({ country: "TT" }, { $set: { currencyCode: "TTD" } }, { multi: true })
db.geoipcountries.update({ country: "TN" }, { $set: { currencyCode: "TND" } }, { multi: true })
db.geoipcountries.update({ country: "TR" }, { $set: { currencyCode: "TRY" } }, { multi: true })
db.geoipcountries.update({ country: "TM" }, { $set: { currencyCode: "TMT" } }, { multi: true })
db.geoipcountries.update({ country: "TC" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "TV" }, { $set: { currencyCode: "AUD" } }, { multi: true })
db.geoipcountries.update({ country: "UK" }, { $set: { currencyCode: "GBP" } }, { multi: true })
db.geoipcountries.update({ country: "US" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "UM" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "UG" }, { $set: { currencyCode: "UGX" } }, { multi: true })
db.geoipcountries.update({ country: "UA" }, { $set: { currencyCode: "UAH" } }, { multi: true })
db.geoipcountries.update({ country: "AE" }, { $set: { currencyCode: "AED" } }, { multi: true })
db.geoipcountries.update({ country: "UY" }, { $set: { currencyCode: "UYU" } }, { multi: true })
db.geoipcountries.update({ country: "UZ" }, { $set: { currencyCode: "UZS" } }, { multi: true })
db.geoipcountries.update({ country: "VU" }, { $set: { currencyCode: "VUV" } }, { multi: true })
db.geoipcountries.update({ country: "VA" }, { $set: { currencyCode: "EUR" } }, { multi: true })
db.geoipcountries.update({ country: "VE" }, { $set: { currencyCode: "VEF" } }, { multi: true })
db.geoipcountries.update({ country: "VN" }, { $set: { currencyCode: "VND" } }, { multi: true })
db.geoipcountries.update({ country: "VG" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "VI" }, { $set: { currencyCode: "USD" } }, { multi: true })
db.geoipcountries.update({ country: "WF" }, { $set: { currencyCode: "XPF" } }, { multi: true })
db.geoipcountries.update({ country: "EH" }, { $set: { currencyCode: "MAD" } }, { multi: true })
db.geoipcountries.update({ country: "YE" }, { $set: { currencyCode: "YER" } }, { multi: true })
db.geoipcountries.update({ country: "ZM" }, { $set: { currencyCode: "ZMW" } }, { multi: true })
db.geoipcountries.update({ country: "ZW" }, { $set: { currencyCode: "ZWD" } }, { multi: true })
db.geoipcountries.aggregate([{$match: {currencyCode: { $exists: false } } }, {$group: {_id: {country: "$country", }, count: { $sum: 1 } } }, {$sort: { count: 1 } }])
```



参考

* <https://github.com/JuanCrg90/mongo-worldcitiespop/blob/master/mongoimport-worldcities.sh>