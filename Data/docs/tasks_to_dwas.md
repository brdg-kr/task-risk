# Tasks to DWAs

* [Excel](/dictionary/30.1/excel/tasks_to_dwas.html)
* [Text](/dictionary/30.1/text/tasks_to_dwas.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/tasks_to_dwas.html)
* [Oracle](/dictionary/30.1/oracle/tasks_to_dwas.html)

| **Purpose:** | Provide a mapping of task statements to Detailed Work Activities. |
| **Table Name:** | tasks_to_dwas |
| **Download:** | [25_tasks_to_dwas.sql](/dl_files/database/db_30_1_mysql/25_tasks_to_dwas.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| task_id | Decimal(8,0) | Identifies each task *(see [*Task Statements*](task_statements.html "Task Statements"))* |
| dwa_id | Character Varying(20) | Identifies each Detailed Work Activity *(see [*DWA Reference*](dwa_reference.html "DWA Reference"))* |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file maps each Detailed Work Activity (DWA) to the task statements, and consequently to the O*NET-SOC occupations, requiring that activity. Each DWA is mapped to multiple task statements, and each referenced task statement is mapped to one or more DWAs.

The file is displayed in five tab delimited fields with the columns named O*NET-SOC Code, Task ID, DWA ID, Date, and Domain Source. The five fields are represented by one row. There are a total of 23,850 rows of data in this file.

For more information, see:
* [O*NET Work Activities Project Technical Report](https://www.onetcenter.org/reports/DWA_2014.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 18.1 | Added as a new file |
| 19.0 - 30.1 | No structure changes |

### Data Example - tasks_to_dwas:

| onetsoc_code | task_id | dwa_id | date_updated | domain_source |
| --- | --- | --- | --- | --- |
| 25-3011.00 | 6824 | 4.A.3.b.6.I12.D04 | 2014-03-01 | Analyst |
| 25-3011.00 | 6825 | 4.A.1.a.2.I06.D03 | 2014-03-01 | Analyst |
| 25-3011.00 | 6825 | 4.A.2.a.1.I03.D04 | 2014-03-01 | Analyst |
| 25-3011.00 | 6826 | 4.A.2.b.2.I15.D06 | 2014-03-01 | Analyst |
| 25-3011.00 | 6827 | 4.A.4.b.3.I02.D06 | 2014-03-01 | Analyst |