# Education, Training, and Experience Categories

* [Excel](/dictionary/30.1/excel/ete_categories.html)
* [Text](/dictionary/30.1/text/ete_categories.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/ete_categories.html)
* [Oracle](/dictionary/30.1/oracle/ete_categories.html)

| **Purpose:** | Provide descriptions of the Education, Training, and Experience percent frequency categories. |
| **Table Name:** | ete_categories |
| **Download:** | [05_ete_categories.sql](/dl_files/database/db_30_1_mysql/05_ete_categories.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Category value associated with element |
| category_description | Character Varying(1000) | Detail description of category associated with element |

This file contains the categories associated with the Education, Training, and Experience content area. Categories for the following scales are included: Required Level of Education (RL), Related Work Experience (RW), On-Site or In-Plant Training (PT), and On-The-Job Training (OJ). The file is displayed in four tab delimited fields with the columns named Element ID, Scale ID, Category, and Category Description. The four fields are represented by one row. There are a total of 41 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 9.0 | Added as a new file |
| 10.0 - 30.1 | No structure changes |

### Data Example - ete_categories:

| element_id | scale_id | category | category_description |
| --- | --- | --- | --- |
| 3.A.1 | RW | 1 | None |
| 3.A.1 | RW | 2 | Up to and including 1 month |
| 3.A.1 | RW | 3 | Over 1 month, up to and including 3 months |
| 3.A.1 | RW | 4 | Over 3 months, up to and including 6 months |
| 3.A.1 | RW | 5 | Over 6 months, up to and including 1 year |
| 3.A.1 | RW | 6 | Over 1 year, up to and including 2 years |
| 3.A.1 | RW | 7 | Over 2 years, up to and including 4 years |
| 3.A.1 | RW | 8 | Over 4 years, up to and including 6 years |
| 3.A.1 | RW | 9 | Over 6 years, up to and including 8 years |
| 3.A.1 | RW | 10 | Over 8 years, up to and including 10 years |
| 3.A.1 | RW | 11 | Over 10 years |