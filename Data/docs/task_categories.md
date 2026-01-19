# Task Categories

* [Excel](/dictionary/30.1/excel/task_categories.html)
* [Text](/dictionary/30.1/text/task_categories.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/task_categories.html)
* [Oracle](/dictionary/30.1/oracle/task_categories.html)

| **Purpose:** | Provide description of Task categories. |
| **Table Name:** | task_categories |
| **Download:** | [09_task_categories.sql](/dl_files/database/db_30_1_mysql/09_task_categories.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Category value associated with Scale ID |
| category_description | Character Varying(1000) | Detail description of category associated with Scale ID |

This file contains the categories associated with the Task content area. Categories for the scale Frequency of Task (FT) are included. The file is displayed in three tab delimited fields with the columns named Scale ID, Category, and Category Description. The three fields are represented by one row. There are a total of 7 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 13.0 | Added as a new file |
| 14.0 - 30.1 | No structure changes |

### Data Example - task_categories:

| scale_id | category | category_description |
| --- | --- | --- |
| FT | 1 | Yearly or less |
| FT | 2 | More than yearly |
| FT | 3 | More than monthly |
| FT | 4 | More than weekly |
| FT | 5 | Daily |
| FT | 6 | Several times daily |
| FT | 7 | Hourly or more |