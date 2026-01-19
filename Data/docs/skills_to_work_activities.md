# Skills to Work Activities

* [Excel](/dictionary/30.1/excel/skills_to_work_activities.html)
* [Text](/dictionary/30.1/text/skills_to_work_activities.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/skills_to_work_activities.html)
* [Oracle](/dictionary/30.1/oracle/skills_to_work_activities.html)

| **Purpose:** | Provide linkages between skills and relevant work activities. |
| **Table Name:** | skills_to_work_activities |
| **Download:** | [35_skills_to_work_activities.sql](/dl_files/database/db_30_1_mysql/35_skills_to_work_activities.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| skills_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| work_activities_element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |

This file contains linkages between skills and relevant work activities. Occupation-specific ratings for the listed elements may be found in the [*Skills*](skills.html "Skills") and [*Work Activities*](work_activities.html "Work Activities") files. Linkages were developed by a panel of experienced industrial/organizational psychologists, and are used in the development of analyst occupational skills ratings.

The file is displayed in two tab delimited fields with the columns named Skills Element ID and Work Activities Element ID. The two fields are represented by one row. There are a total of 232 rows of data in this file.

For more information, see:
* [O*NET Analyst Occupational Skills Ratings: Procedures Update](https://www.onetcenter.org/reports/AOSkills_ProcUpdate.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 24.2 | Added as a new file |
| 24.3 - 30.1 | No structure changes |

### Data Example - skills_to_work_activities:

| skills_element_id | work_activities_element_id |
| --- | --- |
| 2.A.1.a | 4.A.1.a.1 |
| 2.A.1.a | 4.A.1.a.2 |
| 2.A.1.a | 4.A.1.b.1 |
| 2.A.1.a | 4.A.2.a.1 |
| 2.A.1.a | 4.A.2.a.2 |