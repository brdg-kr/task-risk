# Abilities to Work Context

* [Excel](/dictionary/30.1/excel/abilities_to_work_context.html)
* [Text](/dictionary/30.1/text/abilities_to_work_context.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/abilities_to_work_context.html)
* [Oracle](/dictionary/30.1/oracle/abilities_to_work_context.html)

| **Purpose:** | Provide linkages between abilities and relevant work context. |
| **Table Name:** | abilities_to_work_context |
| **Download:** | [34_abilities_to_work_context.sql](/dl_files/database/db_30_1_mysql/34_abilities_to_work_context.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| abilities_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| work_context_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |

This file contains linkages between abilities and relevant work context. Occupation-specific ratings for the listed elements may be found in the [*Abilities*](abilities.html "Abilities") and [*Work Context*](work_context.html "Work Context") files. Linkages were developed by a panel of experienced industrial/organizational psychologists, and are used in the development of analyst occupational abilities ratings.

The file is displayed in two tab delimited fields with the columns named Abilities Element ID and Work Context Element ID. The two fields are represented by one row. There are a total of 139 rows of data in this file.

For more information, see:
* [O*NET Analyst Occupational Abilities Ratings: Procedures Update](https://www.onetcenter.org/reports/AnalystProcUpdate.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 24.2 | Added as a new file |
| 24.3 - 30.1 | No structure changes |

### Data Example - abilities_to_work_context:

| abilities_element_id | work_context_element_id |
| --- | --- |
| 1.A.1.a.1 | 4.C.1.a.2.c |
| 1.A.1.a.1 | 4.C.1.a.2.f |
| 1.A.1.a.1 | 4.C.1.a.2.l |
| 1.A.1.a.1 | 4.C.1.a.4 |
| 1.A.1.a.1 | 4.C.1.b.1.e |