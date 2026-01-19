# Work Context Categories

* [Excel](/dictionary/30.1/excel/work_context_categories.html)
* [Text](/dictionary/30.1/text/work_context_categories.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/work_context_categories.html)
* [Oracle](/dictionary/30.1/oracle/work_context_categories.html)

| **Purpose:** | Provide description of Work Context categories. |
| **Table Name:** | work_context_categories |
| **Download:** | [10_work_context_categories.sql](/dl_files/database/db_30_1_mysql/10_work_context_categories.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Category value associated with element |
| category_description | Character Varying(1000) | Detail description of category associated with element |

This file contains the categories associated with the Work Context content area. Categories for the following scales are included: Context (CXP) and Context Category (CTP). The file includes categories utilized in the data collection survey where the category descriptions are variable and item specific. The file is displayed in four tab delimited fields with the columns named Element ID, Scale ID, Category, and Category Description. The four fields are represented by one row. There are a total of 281 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 9.0 | Added as a new file |
| 10.0 - 30.1 | No structure changes |

### Data Example - work_context_categories:

| element_id | scale_id | category | category_description |
| --- | --- | --- | --- |
| 4.C.1.a.2.l | CXP | 1 | Never |
| 4.C.1.a.2.l | CXP | 2 | Once a year or more but not every month |
| 4.C.1.a.2.l | CXP | 3 | Once a month or more but not every week |
| 4.C.1.a.2.l | CXP | 4 | Once a week or more but not every day |
| 4.C.1.a.2.l | CXP | 5 | Every day |
| 4.C.1.a.4 | CXP | 1 | No contact with others |
| 4.C.1.a.4 | CXP | 2 | Occasional contact with others |
| 4.C.1.a.4 | CXP | 3 | Contact with others about half the time |
| 4.C.1.a.4 | CXP | 4 | Contact with others most of the time |
| 4.C.1.a.4 | CXP | 5 | Constant contact with others |