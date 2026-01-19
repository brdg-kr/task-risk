# Scales Reference

* [Excel](/dictionary/30.1/excel/scales_reference.html)
* [Text](/dictionary/30.1/text/scales_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/scales_reference.html)
* [Oracle](/dictionary/30.1/oracle/scales_reference.html)

| **Purpose:** | Provide a reference to the scale names and values. |
| **Table Name:** | scales_reference |
| **Download:** | [04_scales_reference.sql](/dl_files/database/db_30_1_mysql/04_scales_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| scale_id | Character Varying(3) | Scale ID |
| scale_name | Character Varying(50) | Scale Name |
| minimum | Decimal(1,0) | Scale Minimum |
| maximum | Decimal(3,0) | Scale Maximum |

This file contains the Scale information by which the raw values are measured. The file is displayed in four tab delimited fields with the columns named Scale ID, Scale Name, Minimum, and Maximum. The four fields are represented by one row. There are a total of 31 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 - 30.1 | No structure changes |

### Data Example - scales_reference:

| scale_id | scale_name | minimum | maximum |
| --- | --- | --- | --- |
| CT | Context | 1 | 3 |
| CTP | Context (Categories 1-3) | 0 | 100 |
| CX | Context | 1 | 5 |
| CXP | Context (Categories 1-5) | 0 | 100 |
| IM | Importance | 1 | 5 |
| LV | Level | 0 | 7 |
| OJ | On-The-Job Training (Categories 1-9) | 0 | 100 |
| PT | On-Site Or In-Plant Training (Categories 1-9) | 0 | 100 |
| RL | Required Level Of Education (Categories 1-12) | 0 | 100 |
| RW | Related Work Experience (Categories 1-11) | 0 | 100 |