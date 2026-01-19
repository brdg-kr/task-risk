# RIASEC Keywords

* [Excel](/dictionary/30.1/excel/riasec_keywords.html)
* [Text](/dictionary/30.1/text/riasec_keywords.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/riasec_keywords.html)
* [Oracle](/dictionary/30.1/oracle/riasec_keywords.html)

| **Purpose:** | Provide action and object keywords for each general occupational interest. |
| **Table Name:** | riasec_keywords |
| **Download:** | [37_riasec_keywords.sql](/dl_files/database/db_30_1_mysql/37_riasec_keywords.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| keyword | Character Varying(150) | Relevant interest keyword |
| keyword_type | Character Varying(20) | “Action” or “Object” |

This file contains action and object keywords for each general occupational interest. The file is displayed in three tab delimited fields with the columns named Element ID, Keyword, and Keyword Type. The three fields are represented by one row. There are a total of 75 rows of data in this file.

For more information, see:
* [Updating Vocational Interests Information for the O*NET Content Model](https://www.onetcenter.org/reports/Voc_Interests.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 27.2 | Added as a new file |
| 27.3 - 30.1 | No structure changes |

### Data Example - riasec_keywords:

| element_id | keyword | keyword_type |
| --- | --- | --- |
| 1.B.1.a | Build | Action |
| 1.B.1.a | Drive | Action |
| 1.B.1.a | Install | Action |
| 1.B.1.a | Maintain | Action |
| 1.B.1.a | Repair | Action |