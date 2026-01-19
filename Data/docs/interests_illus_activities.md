# Interests Illustrative Activities

* [Excel](/dictionary/30.1/excel/interests_illus_activities.html)
* [Text](/dictionary/30.1/text/interests_illus_activities.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/interests_illus_activities.html)
* [Oracle](/dictionary/30.1/oracle/interests_illus_activities.html)

| **Purpose:** | Provide illustrative work activities related to the general and basic occupational interests. |
| **Table Name:** | interests_illus_activities |
| **Download:** | [39_interests_illus_activities.sql](/dl_files/database/db_30_1_mysql/39_interests_illus_activities.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| interest_type | Character Varying(20) | “General” or “Basic” |
| activity | Character Varying(150) | Illustrative work activity |

This file contains illustrative work activities related to the general and basic occupational interests. The file is displayed in three tab delimited fields with the columns named Element ID, Interest Type, and Activity. The three fields are represented by one row. There are a total of 188 rows of data in this file.

For more information, see:
* [Updating Vocational Interests Information for the O*NET Content Model](https://www.onetcenter.org/reports/Voc_Interests.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 27.2 | Added as a new file |
| 27.3 - 30.1 | No structure changes |

### Data Example - interests_illus_activities:

| element_id | interest_type | activity |
| --- | --- | --- |
| 1.B.1.a | General | Build kitchen cabinets. |
| 1.B.1.a | General | Drive a truck to deliver packages to offices and homes. |
| 1.B.1.a | General | Put out forest fires. |
| 1.B.1.a | General | Repair household appliances. |
| 1.B.1.b | General | Develop a new medicine. |