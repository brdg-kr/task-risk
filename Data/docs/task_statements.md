# Task Statements

* [Excel](/dictionary/30.1/excel/task_statements.html)
* [Text](/dictionary/30.1/text/task_statements.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/task_statements.html)
* [Oracle](/dictionary/30.1/oracle/task_statements.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to tasks associated with the occupation. |
| **Table Name:** | task_statements |
| **Download:** | [17_task_statements.sql](/dl_files/database/db_30_1_mysql/17_task_statements.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| task_id | Decimal(8,0) | Identifies each task |
| task | Character Varying(1000) | Task statement associated with an occupation |
| task_type | Character Varying(12) | “Core” or “Supplemental” |
| incumbents_responding | Decimal(4,0) | Number of incumbents providing task information |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the tasks associated with each O*NET-SOC occupation. The “Task Type” column identifies two categories of tasks:
* **Core** — tasks that are critical to the occupation. The criteria for these tasks are (a) relevance ≥ 67% and (b) a mean importance rating of ≥ 3.0.
* **Supplemental** — tasks that are less relevant and/or important to the occupation. Two sets of tasks are included in this category: (a) tasks rated ≥ 67% on relevance but < 3.0 on importance, and (b) tasks rated < 67% on relevance, regardless of mean importance.

The file is displayed in seven tab delimited fields with the columns named O*NET-SOC Code, Task ID, Task, Task Type, Incumbents Responding, Date, and Domain Source. The seven fields are represented by one row. There are a total of 18,796 rows of data in this file.

For more information, see:
* [Summary of Procedures for O*NET Task Updating and New Task Generation](https://www.onetcenter.org/reports/TaskUpdating.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 13.0 | Added as a new file |
| 14.0 - 30.1 | No structure changes |

### Data Example - task_statements:

| onetsoc_code | task_id | task | task_type | incumbents_responding | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- |
| 29-1212.00 | 22689 | Administer emergency cardiac care for life-threatening heart problems, such as cardiac arrest and heart attack. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22690 | Advise patients and community members concerning diet, activity, hygiene, or disease prevention. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22691 | Answer questions that patients have about their health and well-being. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22692 | Calculate valve areas from blood flow velocity measurements. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22693 | Compare measurements of heart wall thickness and chamber sizes to standards to identify abnormalities, using the results of an echocardiogram. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22694 | Conduct electrocardiogram (EKG), phonocardiogram, echocardiogram, or other cardiovascular tests to record patients' cardiac activity, using specialized electronic test equipment, recording devices, or laboratory instruments. | NULL | NULL | 2025-12-01 | Analyst |
| 29-1212.00 | 22695 | Conduct exercise electrocardiogram tests to monitor cardiovascular activity under stress. | NULL | NULL | 2025-12-01 | Analyst |