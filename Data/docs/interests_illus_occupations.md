# Interests Illustrative Occupations

* [Excel](/dictionary/30.1/excel/interests_illus_occupations.html)
* [Text](/dictionary/30.1/text/interests_illus_occupations.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/interests_illus_occupations.html)
* [Oracle](/dictionary/30.1/oracle/interests_illus_occupations.html)

| **Purpose:** | Provide illustrative occupations linked to the general and basic occupational interests. |
| **Table Name:** | interests_illus_occupations |
| **Download:** | [40_interests_illus_occupations.sql](/dl_files/database/db_30_1_mysql/40_interests_illus_occupations.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| interest_type | Character Varying(20) | “General” or “Basic” |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |

This file contains illustrative occupations linked to the general and basic occupational interests. For occupation-specific ratings for RIASEC elements, see the Interests file.

The file is displayed in three tab delimited fields with the columns named Element ID, Interest Type, and O*NET-SOC Code. The three fields are represented by one row. There are a total of 186 rows of data in this file.

For more information, see:
* [Updating Vocational Interests Information for the O*NET Content Model](https://www.onetcenter.org/reports/Voc_Interests.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 27.2 | Added as a new file |
| 27.3 - 30.1 | No structure changes |

### Data Example - interests_illus_occupations:

| element_id | interest_type | onetsoc_code |
| --- | --- | --- |
| 1.B.1.a | General | 17-3024.01 |
| 1.B.1.a | General | 45-2091.00 |
| 1.B.1.a | General | 47-2031.00 |
| 1.B.1.a | General | 53-3052.00 |
| 1.B.1.b | General | 19-1029.04 |