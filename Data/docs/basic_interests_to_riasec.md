# Basic Interests to RIASEC

* [Excel](/dictionary/30.1/excel/basic_interests_to_riasec.html)
* [Text](/dictionary/30.1/text/basic_interests_to_riasec.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/basic_interests_to_riasec.html)
* [Oracle](/dictionary/30.1/oracle/basic_interests_to_riasec.html)

| **Purpose:** | Provide linkages between each basic occupational interest to relevant general occupational interests. |
| **Table Name:** | basic_interests_to_riasec |
| **Download:** | [38_basic_interests_to_riasec.sql](/dl_files/database/db_30_1_mysql/38_basic_interests_to_riasec.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| basic_interests_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| riasec_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |

This file contains linkages between each basic occupational interest to relevant general occupational interests. The file is displayed in two tab delimited fields with the columns named Basic Interests Element ID and RIASEC Element ID. The two fields are represented by one row. There are a total of 53 rows of data in this file.

For more information, see:
* [Updating Vocational Interests Information for the O*NET Content Model](https://www.onetcenter.org/reports/Voc_Interests.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 27.2 | Added as a new file |
| 27.3 - 30.1 | No structure changes |

### Data Example - basic_interests_to_riasec:

| basic_interests_element_id | riasec_element_id |
| --- | --- |
| 1.B.3.a | 1.B.1.a |
| 1.B.3.b | 1.B.1.a |
| 1.B.3.c | 1.B.1.a |
| 1.B.3.d | 1.B.1.a |
| 1.B.3.e | 1.B.1.a |