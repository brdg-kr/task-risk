# Task Ratings

* [Excel](/dictionary/30.1/excel/task_ratings.html)
* [Text](/dictionary/30.1/text/task_ratings.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/task_ratings.html)
* [Oracle](/dictionary/30.1/oracle/task_ratings.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to the ratings for tasks associated with the occupation. |
| **Table Name:** | task_ratings |
| **Download:** | [18_task_ratings.sql](/dl_files/database/db_30_1_mysql/18_task_ratings.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| task_id | Decimal(8,0) | Identifies each task *(see [*Task Statements*](task_statements.html "Task Statements"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Percent frequency category *(see [*Task Categories*](task_categories.html "Task Categories"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| n | Decimal(4,0) | Sample size |
| standard_error | Decimal(7,4) | Standard Error |
| lower_ci_bound | Decimal(7,4) | Lower 95% confidence interval bound |
| upper_ci_bound | Decimal(7,4) | Upper 95% confidence interval bound |
| recommend_suppress | Character(1) | Low precision indicator (Y=yes, N=no) |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the task ratings associated with each O*NET-SOC occupation. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, date_updated, and domain_source. Refer to **[Appendix 2, *Item Rating Level Statistics - Incumbent*](appendix_incumbent.html "Appendix 2. Item Rating Level Statistics - Incumbent")** for additional information on these items. The 12 fields are represented by one row. There are a total of 161,559 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 13.0 | Added as a new file |
| 14.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - task_ratings:

| onetsoc_code | task_id | scale_id | category | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 53-3053.00 | 23756 | FT | 1 | 0.00 | 61 | 0.0000 | NULL | NULL | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 2 | 0.24 | 61 | 0.1717 | 0.0546 | 1.0082 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 3 | 4.25 | 61 | 2.8703 | 1.0727 | 15.3926 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 4 | 4.89 | 61 | 3.7881 | 0.9999 | 20.7683 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 5 | 83.26 | 61 | 11.2185 | 49.8527 | 96.1377 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 6 | 0.34 | 61 | 0.2578 | 0.0721 | 1.5488 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | FT | 7 | 7.02 | 61 | 7.1452 | 0.8384 | 40.2745 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | IM | NULL | 4.84 | 62 | 0.0722 | 4.6956 | 4.9844 | N | 2025-08-01 | Incumbent |
| 53-3053.00 | 23756 | RT | NULL | 100.00 | 66 | 0.0000 | NULL | NULL | N | 2025-08-01 | Incumbent |