# Emerging Tasks

* [Excel](/dictionary/30.1/excel/emerging_tasks.html)
* [Text](/dictionary/30.1/text/emerging_tasks.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/emerging_tasks.html)
* [Oracle](/dictionary/30.1/oracle/emerging_tasks.html)

| **Purpose:** | Provide emerging task data associated with some O*NET-SOC occupations. |
| **Table Name:** | emerging_tasks |
| **Download:** | [26_emerging_tasks.sql](/dl_files/database/db_30_1_mysql/26_emerging_tasks.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| task | Character Varying(1000) | New or revised task associated with an occupation |
| category | Character Varying(8) | “New” or “Revision” |
| original_task_id | Decimal(8,0) | Task ID referencing original task *(see [*Task Statements*](task_statements.html "Task Statements"))* |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains new and revised task statements proposed for future data collection. Statements are developed by analysts from sources including feedback from surveyed job incumbents, research into emerging technologies, and information provided by professional associations. The file is displayed in six tab delimited fields with the columns named O*NET-SOC Code, Task, Category, Original Task ID, Date, and Domain Source. The six fields are represented by one row. There are a total of 328 rows of data in this file.

For more information, see:
* [Identification of Emerging Tasks in the O*NET System: A Revised Approach](https://www.onetcenter.org/reports/EmergingTasks_RevisedApproach.html)
* [Adding Drone-Specific Tasks to the O*NET Database: Initial Identification of Emerging Tasks using ChatGPT](https://www.onetcenter.org/reports/Drone_Tasks.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 20.1 | Added as a new file |
| 20.2 - 28.3 | No structure changes |
| 29.0 | Write-in Total column removed |
| 29.1 - 30.1 | No structure changes |

### Data Example - emerging_tasks:

| onetsoc_code | task | category | original_task_id | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- |
| 39-9031.00 | Adjust workout programs and provide variations to address injuries or muscle soreness. | New | NULL | 2025-08-01 | Occupational Expert |
| 29-2011.00 | Conduct blood typing and antibody screening. | New | NULL | 2025-08-01 | Incumbent |